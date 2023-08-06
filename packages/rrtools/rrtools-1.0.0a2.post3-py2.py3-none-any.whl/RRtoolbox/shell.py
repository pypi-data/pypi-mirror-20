from __future__ import print_function
from __future__ import absolute_import

from past.builtins import basestring
from builtins import object


import getopt
from .lib.root import NoParserFound
import argparse
import sys
import re

# process_parameter_lines gets each parameter from reStructured doc
process_parameter_lines = re.compile(r'(?:parameter|:param).*?(?=:parameter|:return|:param|(\.\.)|$)',re.DOTALL)
# process_parameters process a match from process_parameter_lines
process_parameters = re.compile(r'\s*(?:parameter|:param)\s*(?P<param>[^\s{}]*)\s*:(?P<comment>.*)$', re.DOTALL)

def getDocParamLines(doc):
    """
    gets each parameter line from reStructured doc.

    :param doc: documentation
    :return: lines
    """
    return process_parameter_lines.findall(doc)

def getDocParameters(doc):
    """
    gets param and comment from reStructured doc.

    :param doc: documentation
    :return: list of (param,comment) items.
    """
    return [process_parameters.match(i.group(0)).groups() for i in process_parameter_lines.finditer(doc)]

flags = ''
longopts = ('feature=','nnn=')

def shell_processor_parser(syslist, flags=flags, longopts=longopts):
    opts, args = getopt.getopt(syslist, flags, longopts)  # convert command
    opts = dict(opts)
    return opts, args

def shell_processor(commands):
    parsed_commands = []
    for command in commands:
        parsed_commands.append(shell_processor_parser(command)) # opts, args

class Shell(object):

    def parser_fastplt(self):
        parser = argparse.ArgumentParser(description='fast plot of images.',argument_default=argparse.SUPPRESS)
        parser.add_argument('image', metavar='N', #action='append',
                            help='path to image or numpy string',nargs="+")
        parser.add_argument('-m','--cmap', dest='cmap', action='store',
                           help='map to use in matplotlib')
        parser.add_argument('-t','--title', dest='title', action='store',default="visualazor",
                           help='title of subplot')
        parser.add_argument('-w','--win', dest='win', action='store',
                           help='title of window')
        parser.add_argument('-n','--num', dest='num', action='store',type = int, default=0,
                           help='number of Figure')
        parser.add_argument('-f','--frames', dest='frames', action='store',type = int, default=None,
                           help='number of Figure')
        parser.add_argument('-b','--block', dest='block', action='store_true', default=False,
                           help='number of Figure')
        parser.add_argument('-d','--daemon', dest='daemon', action='store_true', default=False,
                           help='number of Figure')
        return parser

    def parser_loadFunc(self):
        parser = argparse.ArgumentParser(description='fast plot of images.')
        #flag = 0, dsize= None, dst=None, fx=None, fy=None, interpolation=None, mmode = None, mpath = None, throw = True
        return parser

    def getParser(self, func):
        if isinstance(func,basestring):
            name = func # it is the name
        else:
            name = func.__name__ # get name from object
        # TODO: use generateParser too
        getparser = getattr(self,"parser_"+name, None)
        if getparser is None:
            raise NoParserFound("No parser in shell for {}".format(name))
        return getparser()

    def parse(self, func, args=None, namespace=None):
        return self.getParser(func).parse_args(args, namespace)

    def generateParser(self, func):
        from .lib.inspector import funcData
        # eval won't be used to prevent security risks
        data = funcData(func)
        doc = data['doc']
        if doc is None:
            info,desc = None,None
        else:
            info = dict(getDocParameters(doc))
            desc = data["doc"][:data["doc"].find(":")]
        parser = argparse.ArgumentParser(prog=data["name"],description=desc)
        defaults = data['defaults']
        for arg in data['args']:
            kwargs = {}
            if info is not None and arg in info:
                kwargs["help"] = info[arg]
            if defaults is not None and arg in defaults:
                kwargs['default'] = defaults[arg]
                parser.add_argument("--"+arg,**kwargs)
            else:
                parser.add_argument(arg,**kwargs)
        # TODO data["varargs"] is not None
        # TODO data["keywords"] is not None
        # TODO data["imo_from"] add better control to were is the resource
        # data["imo_from"] and data["sourcefile"] can be used to add mor info to documentation
        # TODO data['defaults'] can be used to intuit variables type
        return parser


def tuple_creator(string):
    """
    Process string to get tuple.

    :param string: string parameters with "," (colon) as separator
            Ex: param1, param2, ..., paramN
    :return: tuple
    """
    tp = []
    func = string_interpreter()
    for i in string.split(","):
        try:
            tp.append(func(i))
        except:
            tp.append(i)
    return tuple(tp)


def string_interpreter(empty=None, commahandler=None, handle=None):
    """
    create a string interpreter
    :param empty: (None) variable to handle empty strings
    :param commahandler: (tuple_creator) function to handle comma separated strings
    :return: interpreter function
    """
    def interprete_string(string):
        if string == "": # in argparse this does not applies
            return empty
        if "," in string:
            if commahandler is None:
                return tuple_creator(string)
            else:
                return commahandler(string)
        if string.lower() == "none":
            return None
        if string.lower() == "true":
            return True
        if string.lower() == "false":
            return False
        if handle is None:
            try:
                return int(string)
            except:
                return string
        else:
            return handle(string)
    interprete_string.__doc__="""
        Interpret strings.

        :param string: string to interpret.
        :return: interpreted string. If empty string (i.e. '') it returns {}.
                If 'None' returns None. If 'True' returns True. If 'False' returns False.
                If comma separated it applies {} else applies {}.
        """.format(empty, commahandler, handle)
    return interprete_string

if __name__ == '__main__':

    from .lib.image import loadFunc
    s = Shell()
    p = s.generateParser(loadFunc)
    #getting commands from command pront
    opts, args = shell_processor_parser(sys.argv[1:])
    print(opts,args)
    #detector, matcher = init_feature(feature_name)