Generates
=========

Generates is a micro library providing ``generates`` decorator.

The ``generates`` decorator can be used to easily create a function that
returns a container like list or dict, but using generator syntax in the
function body.  For example::

  @generates(list)
  def get_numbers(n):
      for i in range(n):
          yield i

  assert get_numbers(5) == [0, 1, 2, 3, 4]

  @generates(dict)
  def get_map():
      yield ('key1', 'value1')
      yield ('key2', 'value2')

  assert get_map() == {'key1': 'value1', 'key2': 'value2'}


