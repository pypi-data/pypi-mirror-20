# coding: utf-8
"""
edofx is a library and a DSL to manipulate (mainly read) OFX files.
"""

#
# OFX file structure reminder
#
# ofx
#    statement_list[]
#        Statement
#            type = (CHECKING, CREDIT_CARD, INVESTMENT)
#            account_number
#            start_date
#            end_date
#            transaction_list[]
#                StatementTransaction
#            balance
#            balance_date
#

import logging
import random
from datetime import date


__version__ = '0.3.9'


_logger = logging.getLogger('OFXNode')


class OFXNode(object):
    '''
    Used to represent OFX Trees
    '''
    TYPE_UNDEFINED = 0
    TYPE_OPENING = 1
    TYPE_CLOSING = 2
    TYPE_SELFCLOSING = 3
    TYPE_ERROR = 9

    def __init__(self, type=TYPE_UNDEFINED, name='', value='', encoding=None):
        self.type = type
        self.name = name
        self.value = value
        self.children = []
        self.parent = None
        self.__iter_src__ = []
        self.encoding = encoding

    def _get_nodes_chain(self):
        if self.parent is None:
            return self.name
        return self.parent._get_nodes_chain()+'.'+self.name

    def __getattr__(self, name):
        _logger.debug("%s.__getattr__(%s)", self._get_nodes_chain(), name)
        for c in self.children:
            if c.name == name:
                c.parent = self
                return c
        raise AttributeError("%s has no '%s' child node." % (self._get_nodes_chain(), name,))

    def __delattr__(self, name):
        _logger.debug("%s.__delattr__(%s)", self._get_nodes_chain(), name)
        delete_list = []
        for c in self.children:
            if c.name == name:
                delete_list.append(c)
        if delete_list:
            while delete_list:
                self.children.__delitem__(self.children.index(delete_list[0]))
                delete_list.__delitem__(0)
            return
        raise AttributeError("%s has no '%s' child node." % (self._get_nodes_chain(), name,))

    def _build_iter_source(self):
        if self.parent is None:
            return []

        for elem in self.parent.children:
            if elem.name == self.name:
                self.__iter_src__.append(elem)
        return self.__iter_src__

    def __iter__(self):
        _logger.debug("%s.__iter__", self._get_nodes_chain())
        if self.__iter_src__:
            return iter(self.__iter_src__)
        return iter(self._build_iter_source())

    def __getitem__(self, index):
        _logger.debug("%s.__getitem__(%i)", self._get_nodes_chain(), index)
        if type(index) == int:
            if self.__iter_src__:
                return self.__iter_src__[index]
            return self._build_iter_source()[index]
        raise TypeError("list indices must be integers")

    def __len__(self):
        _logger.debug("%s.__len__()", self._get_nodes_chain())
        if self.__iter_src__:
            return len(self.__iter_src__)
        return len(self._build_iter_source())

    def __repr__(self, show_parent=False, xml_style=False):
        if self.value:
            if show_parent:
                return '<%s parent="%s">%s' % (self.name, self.parent.name, self.value,)
            if xml_style:
                return '<%s>%s</%s>' % (self.name, self.value, self.name)
            return '<%s>%s' % (self.name, self.value,)
        return '<%s>...</%s>' % (self.name, self.name,)

    def _val(self):
        if self.name[:2] == 'DT':
            return date(int(self.value[:4]), int(self.value[4:6]), int(self.value[6:8]))
        elif self.name[-3:] == 'AMT':
            return float(self.value.replace(',', '.'))
        return self.value.decode(self.encoding) if self.encoding else self.value
    val = property(_val)

    def ofx_repr(self, repr=''):
        if self.value:
            # this is a self closing tag
            return self.__repr__()+'\n'

        repr += "<%s>\n" % self.name
        for c in self.children:
            repr += c.ofx_repr()
        repr += "</%s>\n" % self.name
        return repr

    def _obfuscate_value(self):
        result = ''
        for c in self.value:
            if c.isalpha():
                result += chr(random.randint(65, 89))
            elif c.isdigit():
                result += random.choice('0123456789')
            else:
                result += c
        return '<%s>%s' % (self.name, result,)

    def obfuscated_ofx_repr(self, repr=''):
        """
        obfuscates output but OFXNode is left unmodified

        Nodes 'ACCTTYPE', 'CODE', 'STATUS', 'SEVERITY', 'LANGUAGE',
        'CURDEF', 'TRNTYPE' are not obfuscated.
        """
        # TODO: implement a delegate
        if self.value:
            if self.name[:2] == "DT" or self.name in ('ACCTTYPE', 'CODE', 'STATUS', 'SEVERITY',
                                                      'LANGUAGE', 'CURDEF', 'TRNTYPE',):
                return self.__repr__()+'\n'
            elif self.name[-3:] == 'AMT':
                # TODO: we must return a random float value with the same sign and in a coherent range
                tmp_val = random.random()*1000
                if self.val < 0:
                    tmp_val = tmp_val * -1
                return '<%s>%.2f\n' % (self.name, tmp_val)

            return self._obfuscate_value() + '\n'

        repr += "<%s>\n" % self.name
        for c in self.children:
            repr += c.obfuscated_ofx_repr()
        repr += "</%s>\n" % self.name
        return repr

    def xml_repr(self, indent='', repr=''):
        if self.value:
            # this is a self closing tag
            return indent + self.__repr__(xml_style=True) + '\n'

        repr += indent + "<%s>\n" % self.name
        for c in self.children:
            repr += c.xml_repr(indent + '    ')
        repr += indent + "</%s>\n" % self.name
        return repr

    def find_children_by_name(self, search_name):
        """
        returns a list of all subnodes named after search_name
        """
        if self.name == search_name:
            return [self]
        found_list = []
        for n in self.children:
            found_list.extend(n.find_children_by_name(search_name))
        return found_list

    def get_type_name(self):
        """
        Used for parser tuning
        """
        if self.type == self.TYPE_UNDEFINED:
            return 'TYPE_UNDEFINED'
        elif self.type == self.TYPE_OPENING:
            return 'TYPE_OPENING'
        elif self.type == self.TYPE_CLOSING:
            return 'TYPE_CLOSING'
        elif self.type == self.TYPE_SELFCLOSING:
            return 'TYPE_SELFCLOSING'
        elif self.type == self.TYPE_ERROR:
            return 'TYPE_ERROR'


class OFXParser(object):
    """
    Parses an OFX source string and returns corresponding OFXNode tree
    """
    def __init__(self, source, encoding=None):
        """
        setup parser and define parsing parameters.
        """
        if len(source) < 3:
            raise Exception("Invalid source string")
            self.ready = False
            self.src = ""

        self.ready = True
        self.source = source
        self.source_idx = 0
        self.source_len = len(source)
        self.__EOF = False
        self.current_char = None
        self.current_line_number = 1
        self.OFX_tree = None
        self.OFX_headers = None
        self.source_encoding=encoding

    def _read_char(self):
        """
        Consume one char from source.
        Sets __EOF when end of file has been reached.
        Returns '' on EOF.
        """
        if self.__EOF:
            return ''

        self.current_char = self.source[self.source_idx]

        if self.source_idx + 1 < self.source_len:
            self.next_char = self.source[self.source_idx]
        else:
            self.next_char = ''

        self.source_idx += 1

        if self.current_char == '\r' and self.next_char == '\n':
            self._read_char()

        if self.current_char == '\n':
            self.current_line_number += 1

        if self.source_idx == self.source_len:
            self.__EOF = True

        return self.current_char

    def _reject_char(self):
        """
        Rewind one char from source and return it.
        """
        self.source_idx -= 1
        self.__EOF = False
        self.next_char = self.current_char
        self.current_char = self.source[self.source_idx]
        return self.current_char

    def _read_tag_name(self, first_char=''):
        """
        Read an OFX tag name (Uppercase and Letters string)
        """
        c = self._read_char()
        tmp_name = first_char
        while c != '' and c != '>':
            tmp_name += c
            c = self._read_char()

        if c == '':
            # we should not have encountered eof in a tag name
            return ''

        if not tmp_name.isalpha() and not tmp_name.isupper():
            return ''

        return tmp_name

    def _read_tag_value(self, first_char=''):
        """ Reads an OFX tag value
            Tag value starts after the tag until beginning of next tag
            Tag value can't spawn several lines
        """
        c = self._read_char()
        tmp_name = first_char
        while c != '<':
            tmp_name += c
            c = self._read_char()

        if c == '<':
            return tmp_name  # may be we should not accept a selfclosing tag alone

        if c == '\r':
            # if we have \n after it's ok ; this is a PC generated file
            # else this is a file error
            c = self._read_char()
            if c == '\n':
                return tmp_name
            else:
                # log: malformed end of line
                return None

        if c == '\n':
            # only \n after a tag is ok ; this is a Unix generated file
            return tmp_name

        return None  # should never pass here

    def _read_tag(self):
        """ Parses current file and return one tag.
        Returns:
            None when EOF is reached
            Tag with type = TYPE_ERROR if line is malformed
        """
        current_tag = OFXNode(encoding=self.source_encoding)

        c = self._read_char()
        while c and c != '<':
            c = self._read_char()
        if not c:
            return None
        
        if c == '<':
            c = self._read_char()
            if c == '':
                current_tag.type = OFXNode.TYPE_ERROR
                return current_tag

            if c == '/':    # CLOSING TAG
                current_tag.type = OFXNode.TYPE_CLOSING
                current_tag.name = self._read_tag_name()
            else:           # OPENING or SELF_CLOSING TAG
                current_tag.name = self._read_tag_name(c)
            # Note: read_tag_name consumes trailing '>'

            if current_tag.name == '':
                current_tag.type = OFXNode.TYPE_ERROR
                return current_tag

            tmp_value = ''
            value = False
            c = self._read_char()
            while c not in ('<', '\r', '\n', ''):
                tmp_value += c
                if c not in ('\r', '\n', '\t',):
                    value = True
                c = self._read_char()

            # we reject the '<' we've just read
            self._reject_char()

            # type ==  TYPE_CLOSING and value = False     => TYPE_CLOSING
            # type ==  TYPE_CLOSING and value             => TYPE_ERROR
            # type <>  TYPE_CLOSING and value == False    => TYPE_OPENING      mais incohérent avec le EOF
            # type <>  TYPE_CLOSING and value == True     => TYPE_SELFCLOSING  mais incohérent avec le EOF

            if current_tag.type == OFXNode.TYPE_CLOSING:
                if value:
                    current_tag.type = OFXNode.TYPE_ERROR
                return current_tag

            if value:
                current_tag.type = OFXNode.TYPE_SELFCLOSING
                if tmp_value[-1] == '\n' and tmp_value[-2] == '\r':  # Windows style end of line
                    current_tag.value = tmp_value[:-2]
                elif tmp_value[-1] == '\n':                    # Unix style end of line
                    current_tag.value = tmp_value[:-1]
                else:
                    current_tag.value = tmp_value
            else:
                current_tag.type = OFXNode.TYPE_OPENING

            return current_tag

    def _read_header_line(self):
        """
        Parse current line and return a tuple if it's a header

        returns:
            None when EOF is reached
            ( header, header_value) if line is a header
        """

        c = self._read_char()
        if c == '<':  # headers can't start with <, this is a tag
            self._reject_char()
            return None

        line = ''
        while c != '\n':
            line += c
            c = self._read_char()

        # Quick and dirty hack to remove Windows EOL in headers
        if line and line[-1] == '\r':
            line = line[:-1]
        header = line and line.split(':') or None
        return header

    def _parse_headers(self):
        """ Parse headers and returns them as a dict """
        headers_dict = {}
        h = self._read_header_line()
        while h:
            headers_dict[h[0]] = h[1]
            h = self._read_header_line()
            if h and h[0] == 'CHARSET':
                self.source_encoding = h[1]
        return headers_dict

    def _parse_content(self):
        tag = self._read_tag()
        if tag is None:
            pass

        if tag.type == tag.TYPE_CLOSING:
            return None

        if tag.type == tag.TYPE_SELFCLOSING:
            return tag

        child = self._parse_content()
        while child is not None:
            tag.children.append(child)
            child = self._parse_content()

        _logger.debug(tag)
        return tag

    def parse_headers(self):
        """
        Parse headers only and set parser ready to parse content.
        This is useful if you want to check header before reopening the file
        with another encoding for example.

        returns a dict of headers or None if the file contains no headers or parser is not ready.
        """
        if not self.ready:
            return None

        if self.OFX_headers is None:
            self.OFX_headers = self._parse_headers()

        return self.OFX_headers

    def parse(self):
        """
        Parse OFX source and returns an OFXNode tree

        returns None if source is undefined.
        """
        if not self.ready:
            return None

        if self.OFX_headers is None:
            self.OFX_headers = self._parse_headers()

        if self.OFX_tree is not None:
            return self.OFX_tree

        self.OFX_tree = self._parse_content()

        return self.OFX_tree


class OFXObfuscator(object):
    """
    Obfuscates OFX source strings

    Problem with OFXObfuscator is that it's so basic, it breaks date.
    So when parsing an obfuscated file you can't use .val on date attribute
    an must rely on .value.
    """
    def __init__(self, source):
        """
        Setup parser and define parsing parameters.
        """

        if len(source) < 10:
            _logger.error("Supplied source string is too short to be an OFX")
            self.ready = False
            self.source = ""

        self.ready = True
        self.source = source
        self.source_idx = 0
        self.source_len = len(source)
        self.result = ''

    def __read_tag_name(self):
        """
        Read an OFX tag name (Uppercase and Letters string)
        """
        # on entry idx is on '<'
        # on exit idx is on '>'
        while self.source_idx < self.source_len and self.source[self.source_idx] != '>':
            self.result += self.source[self.source_idx]
            self.source_idx += 1

        if self.source_idx < self.source_len:
            self.result += self.source[self.source_idx]

    def obfuscate(self):
        if not self.ready:
            raise Exception("NotReady")  # TODO: Setup a specific catchable Exception

        while self.source_idx < self.source_len:
            current_char = self.source[self.source_idx]

            if current_char == '<':
                self.result += '<'
                self.source_idx += 1
                self.__read_tag_name()

            elif current_char.isdigit():
                self.result += '9'

            elif current_char.isalpha():
                self.result += 'A'

            else:
                self.result += current_char

            self.source_idx += 1

        return self.result
