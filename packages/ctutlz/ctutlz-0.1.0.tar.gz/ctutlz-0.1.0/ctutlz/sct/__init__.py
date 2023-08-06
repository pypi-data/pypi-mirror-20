# -*- coding: utf-8 -*-
import struct
from functools import reduce

from utlz import flo, namedtuple, StructContext
from ctutlz.utils import encode_to_pem, to_hex


'''Access data of an SCT in DER format by field names.'''
_Sct = namedtuple(
    typename='Sct',
    field_names=[
        'der',  # "raw" SCT data structure; type: bytes

        # "raw" SCT fields; each of type: bytes
        'version',
        'log_id',
        'timestamp',
        'extensions_len',
        'extensions',
        'signature_alg_hash',
        'signature_alg_sign',
        'signature_len',
        'signature',
    ],
    lazy_vals={
        'log_id_pem': lambda self: encode_to_pem(self.log_id),  # type: str
        'version_hex': lambda self: to_hex(self.version),
        'timestamp_hex': lambda self: to_hex(self.timestamp),
        'extensions_len_hex': lambda self: to_hex(self.extensions_len),
        'signature_alg_hash_hex': lambda self: to_hex(self.signature_alg_hash),
        'signature_alg_sign_hex': lambda self: to_hex(self.signature_alg_sign),
    }
)


def Sct(sct_der):
    # cf. https://tools.ietf.org/html/rfc6962#section-3.2
    with StructContext(sct_der) as struct:
        data_dict = {
            'der': sct_der,
            'version':            struct.read('!B'),
            'log_id':             struct.read('!32s'),
            'timestamp':          struct.read('!Q'),
            'extensions_len':     struct.read('!H'),
            'extensions': None,
            'signature_alg_hash': struct.read('!B'),
            'signature_alg_sign': struct.read('!B'),
        }
        signature_len = struct.read('!H')
        signature = struct.read(flo('!{signature_len}s'))
        return _Sct(signature_len=signature_len,
                    signature=signature,
                    **data_dict)


EndEntityCert = namedtuple(
    typename='EndEntityCert',
    field_names=[
        'der',
    ],
    lazy_vals={
        'len':  lambda self: len(self.der),
        'lens': lambda self: struct.unpack('!4B', struct.pack('!I', self.len)),
        'len1': lambda self: self.lens[1],
        'len2': lambda self: self.lens[2],
        'len3': lambda self: self.lens[3],
    }
)


def create_signature_input(ee_cert, sct):
    # cf. https://tools.ietf.org/html/rfc6962#section-3.2

    signature_type = 0
    entry_type = 0  # 0: ASN.1Cert, 1: PreCert

    initializer = ('!', ())

    def reduce_func(accum_value, current):
        fmt = accum_value[0] + current[0]
        values = accum_value[1] + (current[1], )
        return fmt, values

    fmt, values = reduce(reduce_func, [
        ('B', sct.version),
        ('B', signature_type),
        ('Q', sct.timestamp),
        ('h', entry_type),

        # signed_entry
        ('B', ee_cert.len1),
        ('B', ee_cert.len2),
        ('B', ee_cert.len3),
        (flo('{ee_cert.len}s'), ee_cert.der),

        ('h', sct.extensions_len),
    ], initializer)
    return struct.pack(fmt, *values)
