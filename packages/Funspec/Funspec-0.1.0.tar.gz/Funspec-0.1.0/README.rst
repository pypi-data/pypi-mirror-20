Funspec
=======

Funspec is an specification for grading programming questions based on the
behavior of functions rather than the simple evaluation of a program IO. This
module was created in the context of an online judge to be used in programming
classes. Funspec is built on top of `Funspec`__ and tries to be as language
agnostic as possible.

.. _Funspec: https://github.com/fabiommendes/funspec/

In funspec, we define the functions that will be used as the answer key to
produce the correct input/output pairs using the @answer_key decorator::

    @answer_key
    def double(x: int) -> int:
        return x + x

One can specify generic input values using type hints. In the above example,
the funspec tester will create a series of integer examples for ``x`` and
compare will the results from the ``double`` function defined by the student
with the results produced by the answer key. The student code can be written
in Python or in any other language that support the input/output values (since
this function uses only integers, we don't expect problems with any mainstream
language).

Often, a simple type specification can be too broad: the test function should
handle just a subset of the integers, or maybe only strings of some specific
type. In many cases, these extra restrictions can be easily represented by
Iospec commands, which funspec gladly accepts::

    @answer_key
    def double(x: '$int(0, 1000)') -> int:
        return x + x

Now the function will be tested only with random integers in the 0-1000
interval.

Running code
------------

To run the tests and collect results, use::

    from funspec import run_tests

    source  = '...'   # The input source code
    funspec = '...'   # Source code for the funspec module
    result = run_tests(source, funspec, lang='python')
    if result.is_correct():
        print('Congratulations!')


Multi-langauge support
----------------------

At the current stage of development, Funspec only evaluates Python code (the
module definition is always in Python, but we expect to support other
languages for student code submitted for evaluation).

We plan to implement support for C in the future and we welcome contributions
for any other language. Unfortunately, the developers do not have time to
to implement support to every programming language. Rather, we just concentrate
on those few languages that we actively use and care about.
