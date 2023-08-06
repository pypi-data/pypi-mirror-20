WishBone
========

What?
-----

A small and simple framework to measure and compare the execution speed of
different methods in a class.

Example
-------

.. code-block:: python

    #!/usr/bin/python

    from testlap import TestLap
    from random import randint

    class Conditional_vs_Exception():
        '''
        Compare if then against try: except.
        '''

        def __init__(self):
            pass

        def test_1_if_then_else(self):
            '''Evaluate a value using if then else.'''

            number = randint(0,1)
            if number == 1:
                pass
            else:
                pass

        def test_2_try_except(self):
            '''Evaluate a value using try: except.'''

            number = randint(0,1)
            try:
                number == 1
            except:
                pass
            else:
                pass

    if __name__ == '__main__':

        test_lap=TestLap(instance=Conditional_vs_Exception(), iterations=10000000)
        test_lap.go()



.. code-block:: text

    Running test_1_if_then_else
    OK
    Running test_2_try_except
    OK
    3.6.0 (default, Feb 12 2017, 22:33:51)
    [GCC 6.3.1 20161221 (Red Hat 6.3.1-1)]
    Linux-4.9.10-100.fc24.x86_64-x86_64-with-fedora-24-Twenty_Four

        Compare if then against try: except.

    +---------------------+--------------------------------------+--------+---------+--------------+
    | Function            | Description                          | Result | Seconds | Iterations/s |
    +---------------------+--------------------------------------+--------+---------+--------------+
    | test_1_if_then_else | Evaluate a value using if then else. | OK     |  13.586 |   736049.706 |
    | test_2_try_except   | Evaluate a value using try: except.  | OK     |  13.898 |   719536.763 |
    +---------------------+--------------------------------------+--------+---------+--------------+
