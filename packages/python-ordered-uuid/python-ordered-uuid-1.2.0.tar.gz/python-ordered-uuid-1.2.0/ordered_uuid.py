import sys
from uuid import UUID

int_ = int      # The built-in int type
bytes_ = bytes  # The built-in bytes type

if sys.version_info[0] > 2:
    def from_bytes(bytes):
        return int_.from_bytes(bytes, byteorder='big')
else:
    def from_bytes(bytes):
        return long(('%02x'*16) % tuple(map(ord, bytes)), 16)


class OrderedUUID(UUID):
    """ Slightly changed version of the standard library UUID that implements
    a UUID optimized for database storage, described by this blog post:
        https://www.percona.com/blog/2014/12/19/store-uuid-optimized-way/
    """

    def __init__(self, hex=None, bytes=None, bytes_le=None, fields=None,
                       int=None, version=None):
        if [hex, bytes, bytes_le, fields, int].count(None) != 4:
            raise TypeError('one of the hex, bytes, bytes_le, fields, '
                            'or int arguments must be given')
        if hex is not None:
            hex = hex.replace('urn:', '').replace('uuid:', '')
            hex = hex.strip('{}').replace('-', '')
            if len(hex) != 32:
                raise ValueError('badly formed hexadecimal UUID string')

            # reorder hex to form ordered uuid
            hex = hex[8:16] + hex[4:8] + hex[:4] + hex[16:]

            int = int_(hex, 16)
        if bytes_le is not None:
            if len(bytes_le) != 16:
                raise ValueError('bytes_le is not a 16-char string')
            bytes = (bytes_le[4-1::-1] + bytes_le[6-1:4-1:-1] +
                     bytes_le[8-1:6-1:-1] + bytes_le[8:])
        if bytes is not None:
            if len(bytes) != 16:
                raise ValueError('bytes is not a 16-char string')
            assert isinstance(bytes, bytes_), repr(bytes)

            # reorder bytes to form ordered uuid
            bytes = bytes[4:8] + bytes[2:4] + bytes[:2] + bytes[8:]

            int = from_bytes(bytes)
        if fields is not None:
            raise NotImplementedError
        if int is not None:
            if not 0 <= int < 1<<128:
                raise ValueError('int is out of range (need a 128-bit value)')
        if version is not None:
            if not 1 <= version <= 5:
                raise ValueError('illegal version number')
            # Set the variant to RFC 4122.
            int &= ~(0xc000 << 48)
            int |= 0x8000 << 48
            # Set the version number.
            int &= ~(0xf000 << 64)
            int |= version << 76
        self.__dict__['int'] = int


if __name__ == "__main__":
    result = OrderedUUID('cdef89ab012345670123456789abcdef')
    assert str(result) == '01234567-89ab-cdef-0123-456789abcdef'

    result = OrderedUUID(bytes=b'\xcd\xef\x89\xab\x01\x23\x45\x67\x01\x23\x45\x67\x89\xab\xcd\xef')
    assert str(result) == '01234567-89ab-cdef-0123-456789abcdef'

    result = OrderedUUID(bytes_le=b'\x78\x56\x34\x12\x34\x12\x78\x56' +
                                  b'\x12\x34\x56\x78\x12\x34\x56\x78')
    assert str(result) == '12345678-5678-1234-1234-567812345678'
