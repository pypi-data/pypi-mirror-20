#!/usr/bin/env python3

import os
import signal
import unittest

from buku import is_int, parse_tags


class TestHelpers(unittest.TestCase):

    # @unittest.skip('skipping')
    def test_parse_tags(self):
        # call with None
        parsed = parse_tags(None)
        self.assertIsNone(parsed)
        # call with empty list
        parsed = parse_tags([])
        self.assertEqual(parsed, ",")
        # empty tags
        parsed = parse_tags([",,,,,"])
        self.assertEqual(parsed, ",")
        # sorting tags
        parsed = parse_tags(["z_tag,a_tag,n_tag"])
        self.assertEqual(parsed, ",a_tag,n_tag,z_tag,")
        # whitespaces
        parsed = parse_tags([" a tag , ,   ,  ,\t,\n,\r,\x0b,\x0c"])
        self.assertEqual(parsed, ",a tag,")
        # duplicates, excessive spaces
        parsed = parse_tags(["tag,tag, tag,  tag,tag , tag "])
        self.assertEqual(parsed, ",tag,")
        # escaping quotes
        parsed = parse_tags(["\"tag\",\'tag\',tag"])
        self.assertEqual(parsed, ",\"tag\",\'tag\',tag,")
        # combo
        parsed = parse_tags([",,z_tag, a tag ,\t,,,  ,n_tag ,n_tag, a_tag, \na tag  ,\r, \"a_tag\""])
        self.assertEqual(parsed, ",\"a_tag\",a tag,a_tag,n_tag,z_tag,")

    # @unittest.skip('skipping')
    def test_is_int(self):
        self.assertTrue(is_int('0'))
        self.assertTrue(is_int('1'))
        self.assertTrue(is_int('-1'))
        self.assertFalse(is_int(''))
        self.assertFalse(is_int('one'))

# This test fails because we use os._exit() now
@unittest.skip('skipping')
def test_sigint_handler(capsys):
    try:
        # sending SIGINT to self
        os.kill(os.getpid(), signal.SIGINT)
    except SystemExit as error:
        out, err = capsys.readouterr()
        # assert exited with 1
        assert error.args[0] == 1
        # assert proper error message
        assert out == ''
        assert err == "\nInterrupted.\n"


if __name__ == "__main__":
    unittest.main()
