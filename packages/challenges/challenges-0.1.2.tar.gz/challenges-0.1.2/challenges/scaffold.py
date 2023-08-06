import os
import sys


class Scaffold:
    def __init__(self, conf):
        self.conf = conf

    def scaffold(self):
        directory = self.conf.get_challenge_dir()
        if os.path.exists(directory):
            sys.exit('Directory ' + directory + ' already exists.')
        else:
            try:
                os.makedirs(directory)
            except OSError:
                sys.exit('Sorry, could not create ' + directory + '.')
        file = self.conf.get_challenge_file()
        if os.path.exists(file):
            sys.exit('File ' + file + ' already exists.')
        else:
            try:
                with open(file, 'w') as handle:
                    handle.write(self.get_class_content())
            except OSError:
                sys.exit('Sorry, could not write ' + file + '.')
        file = self.conf.get_unittest_file()
        if os.path.exists(file):
            sys.exit('File ' + file + ' already exists.')
        else:
            try:
                with open(file, 'w') as handle:
                    handle.write(self.get_unittest_content())
            except OSError:
                sys.exit('Sorry, could not write ' + file + '.')

    def get_class_content(self):
        text = '''
from challenges.challenge import Challenge

class {}(Challenge):

    sample = '43'

    def build(self):
        self.model.number = self.lineToIntegers(0)[0]

    def calc(self):
        self.result = self.model.number
'''
        return text.strip().format(self.conf.get_challenge_class())

    def get_unittest_content(self):
        text = '''
import unittest
from {}.{} import {}

class {}TestCase(unittest.TestCase):

    def setUp(self):
        self.challenge = {}()

    def test__init__(self):
        self.assertIsInstance(self.challenge, {})

'''
        c = self.conf.get_challenge_class()
        return text.strip().format(c, c, c, c, c, c)
