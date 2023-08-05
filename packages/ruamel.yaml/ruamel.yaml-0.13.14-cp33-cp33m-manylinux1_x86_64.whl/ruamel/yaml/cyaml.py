# coding: utf-8

from __future__ import absolute_import

from _ruamel_yaml import CParser, CEmitter   # type: ignore

from ruamel.yaml.constructor import Constructor, BaseConstructor, SafeConstructor
from ruamel.yaml.serializer import Serializer
from ruamel.yaml.representer import Representer, SafeRepresenter, BaseRepresenter
from ruamel.yaml.resolver import Resolver, BaseResolver

__all__ = ['CBaseLoader', 'CSafeLoader', 'CLoader',
           'CBaseDumper', 'CSafeDumper', 'CDumper']


class CBaseLoader(CParser, BaseConstructor, BaseResolver):
    def __init__(self, stream, version=None, preserve_quotes=None):
        CParser.__init__(self, stream)
        BaseConstructor.__init__(self)
        BaseResolver.__init__(self)


class CSafeLoader(CParser, SafeConstructor, Resolver):
    def __init__(self, stream, version=None, preserve_quotes=None):
        CParser.__init__(self, stream)
        SafeConstructor.__init__(self)
        Resolver.__init__(self)


class CLoader(CParser, Constructor, Resolver):
    def __init__(self, stream, version=None, preserve_quotes=None):
        CParser.__init__(self, stream)
        Constructor.__init__(self)
        Resolver.__init__(self)


class CBaseDumper(CEmitter, BaseRepresenter, BaseResolver):
    def __init__(self, stream,
                 default_style=None, default_flow_style=None,
                 canonical=None, indent=None, width=None,
                 allow_unicode=None, line_break=None,
                 encoding=None, explicit_start=None, explicit_end=None,
                 version=None, tags=None, block_seq_indent=None,
                 top_level_colon_align=None, prefix_colon=None):
        CEmitter.__init__(self, stream, canonical=canonical,
                          indent=indent, width=width, encoding=encoding,
                          allow_unicode=allow_unicode, line_break=line_break,
                          explicit_start=explicit_start,
                          explicit_end=explicit_end,
                          version=version, tags=tags)
        Representer.__init__(self, default_style=default_style,
                             default_flow_style=default_flow_style)
        Resolver.__init__(self)


class CSafeDumper(CEmitter, SafeRepresenter, Resolver):
    def __init__(self, stream,
                 default_style=None, default_flow_style=None,
                 canonical=None, indent=None, width=None,
                 allow_unicode=None, line_break=None,
                 encoding=None, explicit_start=None, explicit_end=None,
                 version=None, tags=None, block_seq_indent=None,
                 top_level_colon_align=None, prefix_colon=None):
        CEmitter.__init__(self, stream, canonical=canonical,
                          indent=indent, width=width, encoding=encoding,
                          allow_unicode=allow_unicode, line_break=line_break,
                          explicit_start=explicit_start,
                          explicit_end=explicit_end,
                          version=version, tags=tags)
        SafeRepresenter.__init__(self, default_style=default_style,
                                 default_flow_style=default_flow_style)
        Resolver.__init__(self)


class CDumper(CEmitter, Serializer, Representer, Resolver):
    def __init__(self, stream,
                 default_style=None, default_flow_style=None,
                 canonical=None, indent=None, width=None,
                 allow_unicode=None, line_break=None,
                 encoding=None, explicit_start=None, explicit_end=None,
                 version=None, tags=None, block_seq_indent=None,
                 top_level_colon_align=None, prefix_colon=None):
        CEmitter.__init__(self, stream, canonical=canonical,
                          indent=indent, width=width, encoding=encoding,
                          allow_unicode=allow_unicode, line_break=line_break,
                          explicit_start=explicit_start,
                          explicit_end=explicit_end,
                          version=version, tags=tags)
        Representer.__init__(self, default_style=default_style,
                             default_flow_style=default_flow_style)
        Resolver.__init__(self)
