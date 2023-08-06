import traceback


class ExecutionErrorBase(Exception):
    """
    Base class for BuildError and ExecutionError.
    """

    _default_message = 'runtime error'

    @classmethod
    def from_exception(cls, ex, msg=None, tb=None, sources=None,
                       skip=1):
        """
        Raise a BuildError using a formatted traceback.

        The source code for the file in which the exception occurred.
        """

        msg = cls._default_message if msg is None else msg
        sources = dict(sources or {})
        sources = {name: src.splitlines() for name, src in sources.items()}
        tb = tb or ex.__traceback__
        if tb is None:
            raise ValueError(
                'you must either provide an exception with a __traceback__ (an '
                'exception caught directly inside an except clause), or you '
                'must provide an explicit traceback via the tb attribute.'
            )

        # Now we extract traceback info and manually construct the traceback
        # string
        info = traceback.extract_tb(tb)[skip:]
        msgs = ['Traceback (most recent call last):\n']
        for tb_info in info:
            filename = tb_info.filename
            lineno = tb_info.lineno
            line = tb_info.line
            name = tb_info.name
            msg = '  File "%s", line %s, in %s\n' % (filename, lineno, name)
            if not line and filename in sources:
                src = sources[filename]
                line = src[lineno - 1]
            if line:
                msg += '    %s\n' % line.rstrip()
            msgs.append(msg)

        # Add the error message at the end
        msgs.extend(traceback.format_exception_only(type(ex), ex))

        ex_msg = ''.join(msgs)
        error = cls(''.join([
            msg, '\n', '-' * 50, '\nCaptured exception:\n', ex_msg
        ]))
        error.message = ex_msg
        error.exception = ex
        return error


class BuildError(ExecutionErrorBase):
    """
    Error occurring during the build phase of a program execution.
    """

    _default_message = 'build error'


class ExecutionError(ExecutionErrorBase):
    """
    Error raised during execution of user code.
    """

