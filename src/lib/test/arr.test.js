import { it, describe } from 'node:test'
import assert from 'node:assert/strict'

import { idFn, pipe } from '../utils.mjs'
import { Arr } from '../arr.mjs'
import { Maybe } from '../maybe.mjs'
import { Either } from '../either.mjs'
import { Task } from '../task.mjs'

describe('Array utilities', () => {
	describe('creation functions of, make, makeWithIndex', () => {
		it('should be able to create with "of"', () => {
			assert.deepEqual(Arr.of(1, 2, 3), [1, 2, 3])
		})

		it('should be able to create with "make"', () => {
			assert.deepEqual(Arr.make(3, 1), [1, 1, 1])
		})

		it('should be able to create with "makeWithIndex"', () => {
			assert.deepEqual(Arr.makeWithIndex(3, idFn), [0, 1, 2])
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

	describe('forEach', () => {
		const arr = Arr.of(1, 2, 3, 4, 5)

		it('should be ok on curried version', () => {
			let n = ''
			pipe(
				arr,
				Arr.forEach(el => {
					n += el
				}),
			)

			assert.equal('12345', n)
		})
		it('should be ok on uncurried version', () => {
			let n = ''
			pipe(arr, xs =>
				Arr.forEach(xs, el => {
					n += el
				}),
			)

			assert.equal('12345', n)
		})
	})

	describe('forEachIndexed', () => {
		const arr = Arr.of(1, 2, 3, 4, 5)

		it('should be ok on curried version', () => {
			pipe(
				arr,
				Arr.forEachIndexed((el, index) => assert.equal(el, index + 1)),
			)
		})
		it('should be ok on uncurried version', () => {
			pipe(arr, xs => Arr.forEachIndexed(xs, (el, index) => assert.equal(el, index + 1)))
		})
	})

	describe('map', () => {
		const arr = Arr.of(1, 2, 3, 4, 5)

		it('should be ok on curried version', () => {
			const res = pipe(
				arr,
				Arr.map(el => el.toString()),
			)
			assert.equal(res[0], '1')
			assert.equal(res[4], '5')
		})
		it('should be ok on uncurried version', () => {
			const res = pipe(arr, xs => Arr.map(xs, el => el.toString()))
			assert.equal(res[0], '1')
			assert.equal(res[4], '5')
		})
	})

	describe('mapIndexed', () => {
		const arr = Arr.of(1, 2, 3, 4, 5)

		it('should be ok on curried version', () => {
			const res = pipe(
				arr,
				Arr.mapIndexed((el, idx) => el + idx),
			)
			assert.equal(res[0], 1)
			assert.equal(res[4], 9)
		})
		it('should be ok on uncurried version', () => {
			const res = pipe(arr, xs => Arr.mapIndexed(xs, (el, idx) => el + idx))
			assert.equal(res[0], 1)
			assert.equal(res[4], 9)
		})
	})

	describe('filter', () => {
		const arr = Arr.of(1, 2, 3, 4, 5)

		it('should be ok on curried version', () => {
			pipe(
				arr,
				Arr.filter(el => el == 3),
				xs => {
					assert.equal(xs.length, 1)
					assert.equal(xs[0], 3)
				},
			)
		})
		it('should be ok on uncurried version', () => {
			pipe(
				arr,
				xs => Arr.filter(xs, el => el == 3),
				xs => {
					assert.equal(xs.length, 1)
					assert.equal(xs[0], 3)
				},
			)
		})
	})

	describe('filterIndexed', () => {
		const arr = Arr.of(1, 2, 3, 4, 5)

		it('should be ok on curried version', () => {
			pipe(
				arr,
				Arr.filterIndexed((_, id) => id == 3),
				xs => {
					assert.equal(xs.length, 1)
					assert.equal(xs[0], 4)
				},
			)
		})
		it('should be ok on uncurried version', () => {
			pipe(
				arr,
				xs => Arr.filterIndexed(xs, (_, id) => id == 3),
				xs => {
					assert.equal(xs.length, 1)
					assert.equal(xs[0], 4)
				},
			)
		})
	})

	describe('chain', () => {
		const arr = Arr.of(1, 2, 3, 4, 5)

		it('should be ok on curried version', () => {
			pipe(
				arr,
				Arr.chain(el => [el * 2]),
				xs => {
					assert.equal(xs.length, 5)
					assert.equal(xs[0], 2)
					assert.equal(xs[xs.length - 1], 10)
				},
			)
		})
		it('should be ok on uncurried version', () => {
			pipe(
				arr,
				xs => Arr.chain(xs, el => [el * 2]),
				xs => {
					assert.equal(xs.length, 5)
					assert.equal(xs[0], 2)
					assert.equal(xs[xs.length - 1], 10)
				},
			)
		})
	})

	describe('chainIndexed', () => {
		const arr = Arr.of(1, 2, 3, 4, 5)

		it('should be ok on curried version', () => {
			pipe(
				arr,
				Arr.chainIndexed((el, id) => [el * id]),
				xs => {
					assert.equal(xs.length, 5)
					assert.equal(xs[0], 0)
					assert.equal(xs[xs.length - 1], 20)
				},
			)
		})
		it('should be ok on uncurried version', () => {
			pipe(
				arr,
				xs => Arr.chainIndexed(xs, (el, id) => [el * id]),
				xs => {
					assert.equal(xs.length, 5)
					assert.equal(xs[0], 0)
					assert.equal(xs[xs.length - 1], 20)
				},
			)
		})
	})

	describe('fold', () => {
		const arr = Arr.of(1, 2, 3, 4, 5)

		it('should be ok on curried version', () => {
			pipe(
				arr,
				Arr.fold((acc, el) => acc + el, 0),
				xs => assert.equal(xs, 15),
			)
		})
		it('should be ok on uncurried version', () => {
			pipe(
				arr,
				xs => Arr.fold(xs, (acc, el) => acc + el, 0),
				xs => assert.equal(xs, 15),
			)
		})
	})

	describe('foldIndexed', () => {
		const arr = Arr.of(1, 2, 3, 4, 5)

		it('should be ok on curried version', () => {
			pipe(
				arr,
				Arr.foldIndexed((acc, el, id) => acc + el + id, 0),
				xs => assert.equal(xs, 25),
			)
		})
		it('should be ok on uncurried version', () => {
			pipe(
				arr,
				xs => Arr.foldIndexed(xs, (acc, el, id) => acc + el + id, 0),
				xs => assert.equal(xs, 25),
			)
		})
	})

	describe('ap', () => {
		const arr = Arr.of(c => s => c + '-' + s)

		it('should be ok on curried version', () => {
			pipe(arr, Arr.ap(Arr.of('small', 'big')), Arr.ap(Arr.of('red', 'blue')), xs => {
				assert.equal(xs[0], 'small-red')
				assert.equal(xs[1], 'small-blue')
				assert.equal(xs[2], 'big-red')
				assert.equal(xs[3], 'big-blue')
			})
		})
		it('should be ok on uncurried version', () => {
			pipe(
				arr,
				xs => Arr.ap(xs, Arr.of('small', 'big')),
				xs => Arr.ap(xs, Arr.of('red', 'blue')),
				xs => {
					assert.equal(xs[0], 'small-red')
					assert.equal(xs[1], 'small-blue')
					assert.equal(xs[2], 'big-red')
					assert.equal(xs[3], 'big-blue')
				},
			)
		})
	})

	describe('sequenceMaybe', () => {
		it('should get the list when all members are just', () => {
			pipe(Arr.of(1, 2, 3), Arr.map(Maybe.of), Arr.sequenceMaybe, Maybe.getOrDefault([]), xs => {
				assert.equal(xs.length, 3)
				assert.equal(xs[2], 3)
			})
		})
		it('should get the none when some members are none', () => {
			pipe(
				Arr.of(1, 2, 3),
				Arr.map(el => (el % 2 ? Maybe.of(el) : Maybe.nothing())),
				Arr.sequenceMaybe,
				Maybe.getOrDefault([]),
				xs => {
					assert.equal(xs.length, 0)
				},
			)
		})
	})

	describe('traverseMaybe', () => {
		it('should get the list when all members are just, curried version', () => {
			pipe(Arr.of(1, 2, 3), Arr.traverseMaybe(Maybe.of), Maybe.getOrDefault([]), xs => {
				assert.equal(xs.length, 3)
				assert.equal(xs[2], 3)
			})
		})
		it('should get the none when some members are none, uncurried version', () => {
			pipe(
				Arr.of(1, 2, 3),
				xs => Arr.traverseMaybe(xs, el => (el % 2 ? Maybe.of(el) : Maybe.nothing())),
				Maybe.getOrDefault([]),
				xs => {
					assert.equal(xs.length, 0)
				},
			)
		})
	})

	describe('sequenceEither', () => {
		it('should get the list when all members are right', () => {
			pipe(Arr.of(1, 2, 3), Arr.map(Either.of), Arr.sequenceEither, Either.toNullable, xs => {
				assert.equal(xs.length, 3)
				assert.equal(xs[2], 3)
			})
		})
		it('should get the none when some members are left', () => {
			pipe(
				Arr.of(1, 2, 3),
				Arr.map(el => (el % 2 ? Either.of(el) : Either.left('bad'))),
				Arr.sequenceEither,
				Either.toNullable,
				xs => assert.equal(xs, null),
			)
		})
	})

	describe('traverseEither', () => {
		it('should get the list when all members are right, curried version', () => {
			pipe(Arr.of(1, 2, 3), Arr.traverseEither(Either.of), Either.toNullable, xs => {
				assert.equal(xs.length, 3)
				assert.equal(xs[2], 3)
			})
		})
		it('should get the none when some members are left, uncurried version', () => {
			pipe(
				Arr.of(1, 2, 3),
				xs => Arr.traverseEither(xs, el => (el % 2 ? Either.of(el) : Either.left('bad'))),
				Either.toNullable,
				xs => assert.equal(xs, null),
			)
		})
	})

	describe('sequenceTask', () => {
		it('should get the list when all members are resolved', () => {
			pipe(
				Arr.of(1, 2, 3),
				Arr.map(Task.of),
				Arr.sequenceTask,
				Task.fork(
					err => assert.equal(err, 'should not happend'),
					xs => {
						assert.equal(xs.length, 3)
						assert.equal(xs[2], 3)
					},
				),
			)
		})

		it('should get the none when some members are rejected', () => {
			pipe(
				Arr.of(1, 2, 3),
				Arr.map(el => (el % 2 ? Task.of(el) : Task.rejected('bad'))),
				Arr.sequenceTask,
				Task.fork(
					err => assert.equal(err, 'bad'),
					xs => assert.equal(xs, 'should not happend'),
				),
			)
		})
	})

	describe('traverseTaskM', () => {
		it('should get the list when all members are resolved', () => {
			pipe(
				Arr.of(1, 2, 3),
				Arr.traverseTaskM(Task.of),
				Task.fork(
					err => assert.equal(err, 'should not happend'),
					xs => {
						assert.equal(xs.length, 3)
						assert.equal(xs[2], 3)
					},
				),
			)
		})

		it('should get the none when some members are rejected', () => {
			pipe(
				Arr.of(1, 2, 3),
				Arr.traverseTaskM(el => (el % 2 ? Task.of(el) : Task.rejected('bad'))),
				Task.fork(
					err => assert.equal(err, 'bad'),
					xs => assert.equal(xs, 'should not happend'),
				),
			)
		})
	})

	describe('traverseTaskA', () => {
		it('should get the list when all members are resolved', () => {
			pipe(
				Arr.of(1, 2, 3),
				Arr.traverseTaskA(Task.of),
				Task.fork(
					err => assert.equal(err, 'should not happend'),
					xs => {
						assert.equal(xs.length, 3)
						assert.equal(xs[2], 3)
					},
				),
			)
		})

		it('should get the none when some members are rejected', () => {
			pipe(
				Arr.of(1, 2, 3),
				Arr.traverseTaskA(el => (el % 2 ? Task.of(el) : Task.rejected('bad'))),
				Task.fork(
					err => assert.equal(err, 'bad'),
					xs => assert.equal(xs, 'should not happend'),
				),
			)
		})
	})
})
