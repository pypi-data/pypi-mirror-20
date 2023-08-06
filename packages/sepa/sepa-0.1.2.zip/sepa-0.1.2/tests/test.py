import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import unittest
from lxml import etree
from sepa import builder, parser
from util import xml_compare

data_object = {
    'group_header': {
        'message_id': '1234567890',
        'creation_date_time': '2017-03-05 13:45',
        'authorisation': {
            'code': 'test123'
        }
    },
    'mandate': [{
        'id': '78904536',
        'request_id': '9823701',
        'authentication': [{
            'date': '2017-03-05',
            'channel': {
                'code': 'ABC'
            }
        }]
    }]
}

data_xml = ('<MndtInitnReq>'
    '<Mndt>'
        '<MndtId>78904536</MndtId>'
        '<Authntcn>'
            '<Dt>2017-03-05</Dt>'
            '<Chanl>'
                '<Cd>ABC</Cd>'
            '</Chanl>'
        '</Authntcn>'
        '<MndtReqId>9823701</MndtReqId>'
    '</Mndt>'
    '<GrpHdr>'
        '<CreDtTm>2017-03-05 13:45</CreDtTm>'
        '<Authstn>'
            '<Cd>test123</Cd>'
        '</Authstn>'
        '<MsgId>1234567890</MsgId>'
    '</GrpHdr>'
'</MndtInitnReq>')

class TestSuite(unittest.TestSuite):
    def test_builder(self):
        data_out = builder.build(builder.mandate_initation_request, data_object)
        assert xml_compare(data_out, etree.fromstring(data_xml))

    def test_parser(self):
        data_out = parser.parse(parser.mandate_initation_request, etree.fromstring(data_xml))
        assert data_out == data_object

if __name__ == '__main__':
    unittest.main()
