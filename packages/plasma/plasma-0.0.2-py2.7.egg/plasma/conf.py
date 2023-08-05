from plasma.conf_parser import parameters
import os
import errno

if os.path.exists('./conf.yaml'):
    conf = parameters('./conf.yaml')
elif os.path.exists(os.path.join(os.path.abspath(os.path.dirname(__file__)), 'conf.yaml')):
    conf = parameters(os.path.join(os.path.abspath(os.path.dirname(__file__)), 'conf.yaml'))
else:
    raise FileNotFoundError(errno.ENOENT, os.strerror(errno.ENOENT), 'conf.yaml')
