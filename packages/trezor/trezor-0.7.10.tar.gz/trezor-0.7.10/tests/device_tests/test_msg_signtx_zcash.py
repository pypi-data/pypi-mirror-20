# This file is part of the TREZOR project.
#
# Copyright (C) 2012-2016 Marek Palatinus <slush@satoshilabs.com>
# Copyright (C) 2012-2016 Pavol Rusnak <stick@satoshilabs.com>
#
# This library is free software: you can redistribute it and/or modify
# it under the terms of the GNU Lesser General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This library is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Lesser General Public License for more details.
#
# You should have received a copy of the GNU Lesser General Public License
# along with this library.  If not, see <http://www.gnu.org/licenses/>.

import unittest
import common
import binascii

import trezorlib.messages_pb2 as proto
import trezorlib.types_pb2 as proto_types
from trezorlib.client import CallException
from trezorlib.tx_api import TxApiZcashTestnet

class TestMsgSigntx(common.TrezorTest):

    def test_one_one_fee(self):
        self.setup_mnemonic_allallall()

        # tx: 93373e63cc626c4a7d049ad775d6511bb5eba985f142db660c9b9f955c722f5c
        # input 0: 1.234567 TAZ

        inp1 = proto_types.TxInputType(address_n=[2147483692, 2147483649, 2147483648, 0, 0],  # tmQoJ3PTXgQLaRRZZYT6xk8XtjRbr2kCqwu
                             # amount=123456700,
                             prev_hash=binascii.unhexlify(b'93373e63cc626c4a7d049ad775d6511bb5eba985f142db660c9b9f955c722f5c'),
                             prev_index=0,
                             )

        out1 = proto_types.TxOutputType(address='tmJ1xYxP8XNTtCoDgvdmQPSrxh5qZJgy65Z',
                              amount=123456700 - 1940,
                              script_type=proto_types.PAYTOADDRESS,
                              )

        with self.client:
            self.client.set_tx_api(TxApiZcashTestnet)
            self.client.set_expected_responses([
                proto.TxRequest(request_type=proto_types.TXINPUT, details=proto_types.TxRequestDetailsType(request_index=0)),
                proto.TxRequest(request_type=proto_types.TXMETA, details=proto_types.TxRequestDetailsType(tx_hash=binascii.unhexlify(b"93373e63cc626c4a7d049ad775d6511bb5eba985f142db660c9b9f955c722f5c"))),
                proto.TxRequest(request_type=proto_types.TXOUTPUT, details=proto_types.TxRequestDetailsType(request_index=0, tx_hash=binascii.unhexlify(b"93373e63cc626c4a7d049ad775d6511bb5eba985f142db660c9b9f955c722f5c"))),
                proto.TxRequest(request_type=proto_types.TXEXTRADATA, details=proto_types.TxRequestDetailsType(tx_hash=binascii.unhexlify(b"93373e63cc626c4a7d049ad775d6511bb5eba985f142db660c9b9f955c722f5c"),extra_data_offset=0, extra_data_len=1024)),
                proto.TxRequest(request_type=proto_types.TXEXTRADATA, details=proto_types.TxRequestDetailsType(tx_hash=binascii.unhexlify(b"93373e63cc626c4a7d049ad775d6511bb5eba985f142db660c9b9f955c722f5c"),extra_data_offset=1024, extra_data_len=1024)),
                proto.TxRequest(request_type=proto_types.TXEXTRADATA, details=proto_types.TxRequestDetailsType(tx_hash=binascii.unhexlify(b"93373e63cc626c4a7d049ad775d6511bb5eba985f142db660c9b9f955c722f5c"),extra_data_offset=2048, extra_data_len=1024)),
                proto.TxRequest(request_type=proto_types.TXEXTRADATA, details=proto_types.TxRequestDetailsType(tx_hash=binascii.unhexlify(b"93373e63cc626c4a7d049ad775d6511bb5eba985f142db660c9b9f955c722f5c"),extra_data_offset=3072, extra_data_len=629)),
                proto.TxRequest(request_type=proto_types.TXOUTPUT, details=proto_types.TxRequestDetailsType(request_index=0)),
                proto.ButtonRequest(code=proto_types.ButtonRequest_ConfirmOutput),
                proto.ButtonRequest(code=proto_types.ButtonRequest_SignTx),
                proto.TxRequest(request_type=proto_types.TXINPUT, details=proto_types.TxRequestDetailsType(request_index=0)),
                proto.TxRequest(request_type=proto_types.TXOUTPUT, details=proto_types.TxRequestDetailsType(request_index=0)),
                proto.TxRequest(request_type=proto_types.TXOUTPUT, details=proto_types.TxRequestDetailsType(request_index=0)),
                proto.TxRequest(request_type=proto_types.TXFINISHED),
            ])

            (signatures, serialized_tx) = self.client.sign_tx('Zcash Testnet', [inp1, ], [out1, ])

        # Accepted by network: tx dcc2a10894e0e8a785c2afd4de2d958207329b9acc2b987fd768a09c5efc4547
        self.assertEqual(binascii.hexlify(serialized_tx), b'01000000015c2f725c959f9b0c66db42f185a9ebb51b51d675d79a047d4a6c62cc633e3793000000006a4730440220670b2b63d749a7038f9aea6ddf0302fe63bdcad93dafa4a89a1f0e7300ae2484022002c50af43fd867490cea0c527273c5828ff1b9a5115678f155a1830737cf29390121030e669acac1f280d1ddf441cd2ba5e97417bf2689e4bbec86df4f831bf9f7ffd0ffffffff0128c55b07000000001976a9145b157a678a10021243307e4bb58f36375aa80e1088ac00000000')

if __name__ == '__main__':
    unittest.main()
