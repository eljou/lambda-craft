import { it, describe } from 'node:test'
import assert from 'node:assert/strict'

import { id, pipe } from '../utils.mjs'
import { Arr } from '../arr.mjs'
import { Maybe } from '../maybe.mjs'
// import { Either } from '../either.js'

describe('Array utilities', () => {
	describe('creation functions of, make, makeWithIndex', () => {
		it('should be able to create with "of"', () => {
			assert.deepEqual(Arr.of(1, 2, 3), [1, 2, 3])
		})

		it('should be able to create with "make"', () => {
			assert.deepEqual(Arr.make(3, 1), [1, 1, 1])
		})

		it('should be able to create with "makeWithIndex"', () => {
			assert.deepEqual(Arr.makeWithIndex(3, id), [0, 1, 2])
		})
	})

	it('should return proper size', () => {
		assert.equal(Arr.size(Arr.make(3, 1)), 3)
		assert.equal(Arr.of().length, 0)
	})

	it('should validate if its empty', () => {
		assert.ok(Arr.isEmpty(Arr.of()))
		assert.ok(!Arr.isEmpty(Arr.of(1)))
	})

	describe('head', () => {
		it('should get a maybe just', () => {
			const h = pipe(Arr.of(1, 2, 3, 4), Arr.head)
			assert.ok(Maybe.isJust(h))
			assert.equal(Maybe.getOrEx(h), 1)
		})

		it('should get a maybe nothing', () => {
			const h = pipe(Arr.of(), Arr.head)
			assert.ok(Maybe.isNothing(h))
		})
	})

	describe('headOrNull', () => {
		it('should get a head', () => {
			const h = pipe(Arr.of(1, 2, 3, 4), Arr.headOrNull)
			assert.equal(h, 1)
		})
		it('should get null', () => {
			assert.ok(null == Arr.headOrNull(Arr.of()))
		})
	})

	it('should get tail of an array', () => {
		assert.equal(3, Arr.tail(Arr.of(1, 2, 3, 4)).length)
		assert.equal(0, Arr.tail(Arr.of(1)).length)
	})

	describe('all', () => {
		const arr = Arr.of(2, 3, 4, 5)

		it('should be ok on curried version', () => {
			pipe(
				arr,
				Arr.all(n => n > 1),
				assert.ok,
			)
		})
		it('should fail on uncurried version', () => {
			pipe(
				arr,
				xs => Arr.all(xs, n => n < 3),
				r => assert.ok(!r),
			)
		})
	})

	describe('any', () => {
		const arr = Arr.of(2, 3, 4, 5)

		it('should be ok on curried version', () => {
			pipe(
				arr,
				Arr.any(n => n > 3),
				assert.ok,
			)
		})
		it('should fail on uncurried version', () => {
			pipe(
				arr,
				xs => Arr.any(xs, n => n < 1),
				r => assert.ok(!r),
			)
		})
	})

	describe('some', () => {
		const arr = Arr.of(1, 2, 3, 4)
		it('should be ok on curried version', () => {
			pipe(
				arr,
				Arr.some(n => n == 4),
				assert.ok,
			)
		})
		it('should fail on uncurried version', () => {
			pipe(
				arr,
				xs => Arr.some(xs, n => n == 6),
				r => assert.ok(!r),
			)
		})
	})

	describe('find', () => {
		const arr = Arr.of(1, 2, 3, 4)

		it('should be ok on curried version', () => {
			pipe(
				arr,
				Arr.find(n => n == 4),
				Maybe.getOrEx,
				n => assert.equal(n, 4),
			)
		})
		it('should fail on uncurried version', () => {
			pipe(arr, xs => Arr.find(xs, n => n == 6), Maybe.isNothing, assert.ok)
		})
	})

	describe('findOrNull', () => {
		const arr = Arr.of(1, 2, 3, 4)
		it('should be ok on curried version', () => {
			pipe(
				arr,
				Arr.findOrNull(n => n == 4),
				n => assert.equal(n, 4),
			)
		})
		it('should fail on uncurried version', () => {
			pipe(
				arr,
				xs => Arr.findOrNull(xs, n => n == 6),
				r => assert.ok(r == null),
			)
		})
	})

	describe('at', () => {
		const arr = Arr.of(1, 2, 3, 4)
		it('should be ok on curried version', () => {
			pipe(arr, Arr.at(2), Maybe.getOrEx, n => assert.equal(n, 3))
		})
		it('should fail on uncurried version', () => {
			pipe(arr, Arr.at(6), Maybe.isNothing, assert.ok)
		})
	})

	describe('atOrNull', () => {
		const arr = Arr.of(1, 2, 3, 4)
		it('should be ok on curried version', () => {
			pipe(arr, Arr.atOrNull(2), n => assert.equal(n, 3))
		})
		it('should fail on uncurried version', () => {
			pipe(arr, Arr.atOrNull(6), n => assert.equal(n, null))
		})
	})

	describe('removeAt', () => {
		const arr = Arr.of(1, 2, 3, 4)
		it('should be ok on curried version', () => {
			pipe(arr, Arr.removeAt(2), xs => {
				assert.equal(xs.length, 3)
				assert.equal(
					null,
					Arr.findOrNull(xs, n => n == 3),
				)
			})
		})
		it('should fail on uncurried version', () => {
			pipe(
				arr,
				xs => Arr.removeAt(xs, 6),
				xs => {
					assert.equal(xs.length, 4)
					assert.equal(
						3,
						Arr.findOrNull(xs, n => n == 3),
					)
				},
			)
		})
	})

	describe('take', () => {
		const testArr = Arr.of(1, 2, 3, 4, 5)
		const n = 2

		it('should be ok on curried version', () => {
			pipe(testArr, Arr.take(n), xs => assert.equal(xs.length, n))
		})
		it('should get 0 on uncurried version and taking negative value', () => {
			pipe(
				testArr,
				xs => Arr.take(xs, -1),
				xs => assert.equal(xs.length, 0),
			)
		})
	})

	describe('reverse', () => {
		it('should work', () => {
			const testArr = Arr.of(1, 2, 3, 4, 5)
			pipe(testArr, Arr.reverse, xs => {
				assert.equal(xs.at(0), testArr.at(testArr.length - 1))
				assert.equal(xs.at(xs.length - 1), testArr.at(0))
			})
		})
	})

	describe('cons', () => {
		const arr = Arr.of(1, 2, 3)
		it('should be ok on curried version', () => {
			pipe(arr, Arr.cons(4), xs => {
				assert.equal(xs.length, 4)
				assert.equal(xs.pop(), 4)
			})
		})
		it('should be ok uncurried version', () => {
			pipe(
				arr,
				xs => Arr.cons(xs, 4),
				xs => {
					assert.equal(xs.length, 4)
					assert.equal(xs.pop(), 4)
				},
			)
		})
	})

	describe('snoc', () => {
		const arr = Arr.of(1, 2, 3)
		it('should be ok on curried version', () => {
			pipe(arr, Arr.snoc(4), xs => {
				assert.equal(xs.length, 4)
				assert.equal(xs.at(0), 4)
			})
		})
		it('should be ok uncurried version', () => {
			pipe(
				arr,
				xs => Arr.snoc(xs, 4),
				xs => {
					assert.equal(xs.length, 4)
					assert.equal(xs.at(0), 4)
				},
			)
		})
	})

	describe('concat', () => {
		const arr = Arr.of(1, 2, 3)
		const arr2 = Arr.of(4, 5, 6)

		it('should be ok on curried version', () => {
			pipe(arr, Arr.concat(arr2), xs => {
				assert.equal(xs.length, 6)
				assert.equal(xs.pop(), 6)
			})
		})

		it('should be ok uncurried version', () => {
			pipe(
				arr,
				xs => Arr.concat(xs, arr2),
				xs => {
					assert.equal(xs.length, 6)
					assert.equal(xs.pop(), 6)
				},
			)
		})
	})

	describe('groupBy', () => {
		const arr = Arr.of({ name: 'hon', size: 'M' }, { name: 'dina', size: 'M' }, { name: 'cuca', size: 'S' })

		it('should be ok on curried version', () => {
			pipe(
				arr,
				Arr.groupBy(obj => obj.size),
				xs => {
					assert.equal(xs['M'].length, 2)
					assert.equal(xs['S'].length, 1)
				},
			)
		})
		it('should be ok on uncurried version', () => {
			pipe(
				arr,
				xs => Arr.groupBy(xs, obj => obj.size),
				xs => {
					assert.equal(xs['M'].length, 2)
					assert.equal(xs['S'].length, 1)
				},
			)
		})
	})
})
