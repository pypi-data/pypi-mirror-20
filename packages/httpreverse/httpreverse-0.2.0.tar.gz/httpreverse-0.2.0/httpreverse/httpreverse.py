# -*- coding: utf-8 -*-

import re
from collections import ChainMap
import yaml
import jinja2

# parameter name extraction regexp
prm_xpr = re.compile('(\\$([a-zA-Z0-9_])+)+')


def expand_jinja(apispecstr, context):
   "process any Jinja templating found in the API spec"

   return jinja2.Template(apispecstr).render(context)


def apply_template(opspec, templates):
   "apply the request/response template"

   try:
      template = templates[opspec["template"]]
   except:
      raise Exception("template not specified or found!")

   # workaround for the case when one dict shadows another's subelements in ChainMap;
   # in this case, this may happen with request params
   params =  ChainMap(opspec["request"].get("params", {}), template["request"].get("params", {}))
   opspec["request"]["params"] = params

   opspec["request"] = ChainMap(opspec["request"], template["request"])
   opspec["response"] = ChainMap(opspec.get("response", {}), template.get("response", {}))

   return opspec


def _parametrize_mapping(mapping, context):
   for k, v in mapping.items():
      paramsfound = [g[0] for g in re.findall(prm_xpr, str(v) or "")]
      paramnames = [n.lstrip('$') for n in paramsfound]
      for param, name in zip(paramsfound, paramnames):
         try:
            mapping[k] = str(v).replace(param, str(context[name]))
            #print("replaced '%s' with '%s'" % (v, v.replace(param, context[name])))
         except AttributeError:
            raise Exception("parameter %s not found in given context!" % name)

         try:
            mapping[k] = eval(mapping[k])
         except:
            pass

   return mapping


def parametrize(opspec, context={}, implicit=False):
   "assign parameter values, optionally implicitly using parameter names"

   # request parameters
   rparams = opspec["request"].get("params")
   if rparams:

      if implicit:
         for k, v in context.items():
            if k in rparams:
               rparams[k] = v

      _parametrize_mapping(rparams, context)

   # request body
   rbody = opspec["request"].get("body")
   if rbody:
      _parametrize_mapping(rbody, context)

   return opspec

