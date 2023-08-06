# This file is part of pydd package.

# pydd is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.

# pydd is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.

# You should have received a copy of the GNU General Public License
# along with pyddlib. If not, see <http://www.gnu.org/licenses/>.

from numbers import Number

import sys

class DD(object):
	""" Decision Diagram abstract base class. """

	def __iter__(self):
		"""
		Initialize and return an iterator for pyddlib.DD objects.

		:rtype: pyddlib.DD
		"""
		self.__traversed = set()
		self.__fringe = [self]
		return self

	def __next__(self):
		"""
		Implement a graph-based traversal algorithm for pyddlib.DD objects.
		Each vertex is visited exactly once. Low child is visited before
		high child. Return the next vertex in the sequence.

		:rtype: pyddlib.DD
		"""
		if not self.__fringe:
			raise StopIteration()
		vertex = self.__fringe.pop()
		if not vertex.is_terminal():
			low  = vertex._low
			high = vertex._high
			if id(high) not in self.__traversed:
				self.__fringe.append(high)
				self.__traversed.add(id(high))
			if id(low) not in self.__traversed:
				self.__fringe.append(low)
				self.__traversed.add(id(low))
		return vertex

	def reduce(self):
		"""
		Reduce in place a pyddlib.DD object rooted in `self` by
		removing duplicate nodes and redundant sub-trees.
		Return the canonical representation of the pyddlib.DD object.

		:rtype: pyddlib.DD
		"""
		if self.is_terminal():
			return self

		vlist = {}
		subgraph = {}
		for vertex in self:
			index = vertex._index
			vlist[index] = vlist.get(index, [])
			vlist[index].append(vertex)

		nextid = 0

		index_lst = [-1] + sorted(list(vlist), reverse=True)[:-1]
		for i in index_lst:
			Q = []
			for u in vlist[i]:
				if u.is_terminal():
					Q.append((u._value, u))
				elif u._low._id == u._high._id:
					u._id = u._low._id
				else:
					Q.append(((u._low._id, u._high._id), u))

			oldkey = None
			for key, u in sorted(Q, key=lambda x: x[0]):
				same = False
				if isinstance(key, Number) and isinstance(oldkey, Number):
					same = (abs(key - oldkey) <= 1e-6)
				else:
					same = (key == oldkey)

				if same:
					u._id = nextid
				else:
					nextid += 1
					u._id = nextid
					subgraph[nextid] = u
					if not u.is_terminal():
						u._low = subgraph[u._low._id]
						u._high = subgraph[u._high._id]
					oldkey = key

		return subgraph[self._id]

	@classmethod
	def apply(cls, v1, v2, op):
		"""
		Return a new canonical representation of the
		pyddlib.DD object for the result of `v1` `op` `v2`.

		:param v1: root vertex of left operand
		:type v1: pyddlib.DD
		:param v2: root vertex of right operand
		:type v2: pyddlib.DD
		:param op: a binary operator
		:type op: callable object or function
		:rtype: pyddlib.DD
		"""
		T = {}
		return cls.__apply_step(v1, v2, op, T).reduce()

	@classmethod
	def __apply_step(cls, v1, v2, op, T):
		"""
		Recursively computes `v1` `op` `v2`. If the result was
		already computed as an intermediate result, it returns
		the cached result stored in `T`.

		:param v1: root vertex of left operand
		:type v1: pyddlib.DD
		:param v2: root vertex of right operand
		:type v2: pyddlib.DD
		:param op: a binary operator
		:type op: callable object or function
		:param T: cached intermediate results
		:type T: dict( (int,int), pyddlib.DD )
		:rtype: pyddlib.DD
		"""
		u = T.get((v1._id, v2._id))
		if u is not None:
			return u

		if v1.is_terminal() and v2.is_terminal():
			result = v1.__class__.terminal(op(v1._value, v2._value))
		else:
			v1index = v2index = sys.maxsize
			if not v1.is_terminal():
				v1index = v1._index
			if not v2.is_terminal():
				v2index = v2._index
			index_min = min(v1index, v2index)

			if v1._index == index_min:
				vlow1  = v1._low
				vhigh1 = v1._high
			else:
				vlow1 = vhigh1 = v1

			if v2._index == index_min:
				vlow2  = v2._low
				vhigh2 = v2._high
			else:
				vlow2 = vhigh2 = v2

			low  = cls.__apply_step(vlow1, vlow2, op, T)
			high = cls.__apply_step(vhigh1, vhigh2, op, T)
			result = v1.__class__(index_min, low, high, None)

		T[(v1._id, v2._id)] = result
		return result

	def restrict(self, valuation):
		"""
		Return a new reduced ADD with variables in `valuation`.keys()
		restricted to `valuation`.values().

		:param valuation: mapping from variable index to boolean value
		:type valuation: dict(int,bool)
		:rtype: pyddlib.ADD
		"""
		return self.__restrict_step(valuation).reduce()

	def __restrict_step(self, valuation):
		"""
		Return a new ADD with variables in `valuation`.keys()
		restricted to `valuation`.values().

		:param valuation: mapping from variable index to boolean value
		:type valuation: dict(int,bool)
		:rtype: pyddlib.ADD
		"""
		if self.is_terminal():
			return self

		val = valuation.get(self._index, None)
		if val is None:
			low  = self._low.__restrict_step(valuation)
			high = self._high.__restrict_step(valuation)
			return self.__class__(self._index, low, high, None)
		else:
			if val:
				return self._high.__restrict_step(valuation)
			else:
				return self._low.__restrict_step(valuation)
