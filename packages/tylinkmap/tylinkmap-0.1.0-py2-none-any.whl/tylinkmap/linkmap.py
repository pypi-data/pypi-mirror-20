import re
import os
from collections import defaultdict
import logging

BLOCK_PATH = 'Path'
BLOCK_ARCH = 'Arch'
BLOCK_OBJECT_FILES = 'Object files'
BLOCK_SESSION = 'Sections'
BLOCK_SYMBOLS = 'Symbols'
BLOCK_DEAD_STRIPPED_SYMBOLS = 'Dead Stripped Symbols'

BLOCKS = [BLOCK_PATH, BLOCK_ARCH, BLOCK_OBJECT_FILES, BLOCK_SESSION, BLOCK_SYMBOLS, BLOCK_DEAD_STRIPPED_SYMBOLS]


class FileObject(object):
    def __init__(self, module, number=0, filename=''):
        self.number = number
        self.filename = filename
        self.module = module

    def __str__(self):
        return "[%d] %s %s" % (self.number, self.filename, self.module)


class Section(object):
    def __init__(self, address, size, segment, section):
        self.address = address
        self.size = size
        self.segment = segment
        self.section = section

    def __str__(self):
        return "%s %s %s %s" % (self.address, self.size, self.segment, self.section)


class Symbol(object):
    def __init__(self, address, size, file_number, name):
        self.address = address
        self.size = size
        self.file_number = file_number
        self.name = name

    def __str__(self):
        return "%s %s [%d] %s" % (self.address, self.size, self.file_number, self.name)


class LinkMap(object):
    def __init__(self):
        self.path = ''
        self.arch = ''
        self.last_block = ''
        self.file_objs = []
        self.sections = []
        self.symbols = []
        self._block_compiler = re.compile(r"\s*#\s*(?P<block>[\w\s]*):?\s*(?P<value>.*)")
        self._obj_compiler = re.compile(r"\[\s*(?P<num>\d*)\]\s*(?P<content>.*)")
        self._obj_content_compiler = re.compile(r"(?P<path>.*)\((?P<filename>.*)\)")
        self._session_compiler = re.compile(r"\s*(?P<address>0x[0-9A-Za-z]*)\s+(?P<size>0x[0-9A-Za-z]*)\s+"
                                            r"(?P<segment>\w+)\s+(?P<section>\w+)")
        self._symbol_compiler = re.compile(r"\s*(?P<address>0x[0-9A-Za-z]*)\s+(?P<size>0x[0-9A-Za-z]*)\s+"
                                           r"\[\s*(?P<file>\d+)\s*\]\s+(?P<name>.+)")
        self.__module_map = {}

    @property
    def target_name(self):
        return os.path.basename(self.path)

    def paring(self, filename):
        self.__module_map = {}
        with open(filename, 'r') as f:
            for idx, l in enumerate(f):
                line = l.strip()
                if not line:
                    continue

                if self.__paring_block(line):
                    continue

                if self.last_block == BLOCK_OBJECT_FILES:
                    match = self._obj_compiler.match(line)
                    if not match:
                        logging.warning('can not match object file:[line %d] %s' % (idx, line))
                        continue

                    num = int(match.group('num'))
                    content = match.group('content')
                    # filename
                    content_match = self._obj_content_compiler.match(content)
                    if content_match:
                        filename = content_match.group('filename')
                        path = content_match.group('path')
                        module = os.path.basename(path)
                    else:
                        filename = os.path.basename(content)
                        if 'Xcode.app/Contents/Developer' in content:
                            module = 'System'
                        elif 'Carthage/Build' in content:
                            module = os.path.basename(content)
                        else:
                            module = self.target_name

                    self.file_objs.append(FileObject(module=module, number=num, filename=filename))
                    self.__module_map[num] = module
                elif self.last_block == BLOCK_SESSION:
                    match = self._session_compiler.match(line)
                    if not match:
                        logging.warning('can not match session:[line %d] %s' % (idx, line))
                        continue
                    section = Section(address=match.group('address'), size=match.group('size'),
                                      segment=match.group('segment'), section=match.group('section'))
                    self.sections.append(section)
                elif self.last_block == BLOCK_SYMBOLS:
                    match = self._symbol_compiler.match(line)
                    if not match:
                        logging.warning('can not match symbol:[line %d] %s' % (idx, line))
                        continue
                    symbol = Symbol(address=match.group('address'), size=int(match.group('size'), 16),
                                    file_number=int(match.group('file')), name=match.group('name'))
                    self.symbols.append(symbol)

    def __paring_block(self, line):
        match = self._block_compiler.match(line)
        if not match:
            return False

        block = match.group('block').strip()
        value = match.group('value').strip()
        for b in BLOCKS:
            if block != b:
                continue

            self.last_block = b
            if b == BLOCK_PATH:
                self.path = value
            elif b == BLOCK_ARCH:
                self.arch = value
            break

        return True

    def analyze(self):
        modules = defaultdict(int)

        for symbol in self.symbols:
            modules[self.__module_map[symbol.file_number]] += symbol.size
        return modules
