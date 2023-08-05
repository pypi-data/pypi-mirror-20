# Copyright (c) Twisted Matrix Laboratories.
# See LICENSE for details.

"""
Test cases for twisted.protocols.postfix module.
"""

from twisted.trial import unittest
from twisted.protocols import postfix
from twisted.test.proto_helpers import StringTransport


class PostfixTCPMapQuoteTests(unittest.TestCase):
    data = [
        # (raw, quoted, [aliasQuotedForms]),
        (b'foo', b'foo'),
        (b'foo bar', b'foo%20bar'),
        (b'foo\tbar', b'foo%09bar'),
        (b'foo\nbar', b'foo%0Abar', b'foo%0abar'),
        (b'foo\r\nbar', b'foo%0D%0Abar', b'foo%0D%0abar', b'foo%0d%0Abar', b'foo%0d%0abar'),
        (b'foo ', b'foo%20'),
        (b' foo', b'%20foo'),
        ]

    def testData(self):
        for entry in self.data:
            raw = entry[0]
            quoted = entry[1:]

            self.assertEqual(postfix.quote(raw), quoted[0])
            for q in quoted:
                self.assertEqual(postfix.unquote(q), raw)

class PostfixTCPMapServerTestCase(object):
    data = {
        # 'key': 'value',
        }

    chat = [
        # (input, expected_output),
        ]

    def test_chat(self):
        """
        Test that I{get} and I{put} commands are responded to correctly by
        L{postfix.PostfixTCPMapServer} when its factory is an instance of
        L{postifx.PostfixTCPMapDictServerFactory}.
        """
        factory = postfix.PostfixTCPMapDictServerFactory(self.data)
        transport = StringTransport()

        protocol = postfix.PostfixTCPMapServer()
        protocol.service = factory
        protocol.factory = factory
        protocol.makeConnection(transport)

        for input, expected_output in self.chat:
            protocol.lineReceived(input)
            self.assertEqual(
                transport.value(), expected_output,
                'For %r, expected %r but got %r' % (
                    input, expected_output, transport.value()))
            transport.clear()
        protocol.setTimeout(None)


    def test_deferredChat(self):
        """
        Test that I{get} and I{put} commands are responded to correctly by
        L{postfix.PostfixTCPMapServer} when its factory is an instance of
        L{postifx.PostfixTCPMapDeferringDictServerFactory}.
        """
        factory = postfix.PostfixTCPMapDeferringDictServerFactory(self.data)
        transport = StringTransport()

        protocol = postfix.PostfixTCPMapServer()
        protocol.service = factory
        protocol.factory = factory
        protocol.makeConnection(transport)

        for input, expected_output in self.chat:
            protocol.lineReceived(input)
            self.assertEqual(
                transport.value(), expected_output,
                'For %r, expected %r but got %r' % (
                    input, expected_output, transport.value()))
            transport.clear()
        protocol.setTimeout(None)



class ValidTests(PostfixTCPMapServerTestCase, unittest.TestCase):
    data = {
        b'foo': b'ThisIs Foo',
        b'bar': b' bar really is found\r\n',
        }
    chat = [
        (b'get', b"400 Command 'get' takes 1 parameters.\n"),
        (b'get foo bar', b"500 \n"),
        (b'put', b"400 Command 'put' takes 2 parameters.\n"),
        (b'put foo', b"400 Command 'put' takes 2 parameters.\n"),
        (b'put foo bar baz', b"500 put is not implemented yet.\n"),
        (b'put foo bar', b'500 put is not implemented yet.\n'),
        (b'get foo', b'200 ThisIs%20Foo\n'),
        (b'get bar', b'200 %20bar%20really%20is%20found%0D%0A\n'),
        (b'get baz', b'500 \n'),
        (b'foo', b'400 unknown command\n'),
        ]
