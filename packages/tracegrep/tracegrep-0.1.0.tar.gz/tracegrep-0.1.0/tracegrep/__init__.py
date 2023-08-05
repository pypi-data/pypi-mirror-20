import re
try:
    import cStringIO
    StringIO = cStringIO
except ImportError:
    import StringIO


__version__ = "0.1.0"


def _get_trace_and_errortype(tracestack):
    last_line = tracestack[-1]
    errortype_end_idx = last_line.find(":")
    errortype = last_line[:errortype_end_idx]
    return ("\n".join(tracestack), errortype)


def grep(txt):
    ret = []

    tracestack, in_trace = [], False
    for line in StringIO.StringIO(txt):
        if line.startswith("Traceback"):
            tracestack.append(line)
            in_trace = True
        elif in_trace:
            tracestack.append(line)
            if re.match(r'( {2})+\w', line) is None:
                in_trace = False
                ret.append(_get_trace_and_errortype(tracestack))
                tracestack = []
    if tracestack:
        ret.append(_get_trace_and_errortype(tracestack))

    return ret
