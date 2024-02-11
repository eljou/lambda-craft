import { it, beforeEach, describe, mock } from 'node:test'
import assert from 'node:assert/strict'

import { id, pipe } from '../utils.mjs'
import { Maybe } from '../maybe.mjs'
import { Either } from '../either.mjs'

describe('Either type class', () => {
	describe('creation functions of, left, right', () => {
		it('should be able to create with "of"', () => {
			const e = Either.of(1)
			assert.ok(Either.isRight(e))
			assert.equal(Either.match(e, id, id), 1)
		})

		it('should be able to create with "right"', () => {
			const e = Either.right(1)
			assert.ok(Either.isRight(e))
			assert.equal(Either.match(e, id, id), 1)
		})

		it('should be able to create with "left"', () => {
			const e = Either.left('bad')
			assert.ok(Either.isLeft(e))
			assert.equal(Either.match(e, id, id), 'bad')
		})
	})

	describe('constructor "fromTry"', () => {
		it('should get a right when provided function returns a value', () => {
			const e = Either.fromTry(() => 1)
			assert.ok(Either.isRight(e))
			assert.equal(Either.match(e, id, id), 1)
		})

		it('should get a left when provided function throws', () => {
			const e = Either.fromTry(() => {
				throw 'bad'
			})
			assert.ok(Either.isLeft(e))
			assert.equal(Either.match(e, id, id), 'bad')
		})
	})

	describe('flip', () => {
		it('sould flip value from left to right', () => {
			const right = pipe(Either.left('err'), Either.flip)

			assert.ok(Either.isRight(right))
			assert.equal('err', Either.match(right, id, id))
		})

		it('sould flip value from right to left', () => {
			const left = pipe(Either.right('good'), Either.flip)

			assert.ok(Either.isLeft(left))
			assert.equal('good', Either.match(left, id, id))
		})
	})

	describe('map', () => {
		let spyMapper
		beforeEach(() => {
			spyMapper = mock.fn(str => str.length)
		})

		it('should validate non curried version with left value', () => {
			const result = pipe(Either.left('bad'), e => Either.map(e, spyMapper), Either.match(id, id))
			assert.equal('bad', result)
			assert.equal(spyMapper.mock.callCount(), 0)
		})

		it('should validate curried version with right value', () => {
			const result = pipe(Either.of('a'), Either.map(spyMapper), Either.match(id, id))
			assert.equal(1, result)
			assert.equal(spyMapper.mock.callCount(), 1)
		})
	})

	describe('leftMap', () => {
		let spyMapper
		beforeEach(() => {
			spyMapper = mock.fn(str => str.length)
		})

		it('should validate non curried version with left value', () => {
			const result = pipe(Either.left('bad'), e => Either.leftMap(e, spyMapper), Either.match(id, id))
			assert.equal(3, result)
			assert.equal(spyMapper.mock.callCount(), 1)
		})

		it('should validate curried version with right value', () => {
			const result = pipe(Either.of('a'), Either.leftMap(spyMapper), Either.match(id, id))
			assert.equal('a', result)
			assert.equal(spyMapper.mock.callCount(), 0)
		})
	})

	describe('chain', () => {
		let spyChainer
		beforeEach(() => {
			spyChainer = mock.fn(str => Either.of(str.length))
		})

		it('should validate non curried version with left value', () => {
			const result = pipe(Either.left('bad'), e => Either.chain(e, spyChainer), Either.match(id, id))
			assert.equal('bad', result)
			assert.equal(spyChainer.mock.callCount(), 0)
		})

		it('should validate curried version with right value', () => {
			const result = pipe(Either.of('a'), Either.chain(spyChainer), Either.match(id, id))
			assert.equal(1, result)
			assert.equal(spyChainer.mock.callCount(), 1)
		})
	})

	describe('orElse', () => {
		let spyOrElse
		beforeEach(() => {
			spyOrElse = mock.fn(str => Either.left(str.length))
		})

		it('should validate non curried version with left value', () => {
			const result = pipe(Either.left('bad'), e => Either.orElse(e, spyOrElse), Either.match(id, id))
			assert.equal(3, result)
			assert.equal(spyOrElse.mock.callCount(), 1)
		})

		it('should validate curried version with right value', () => {
			const result = pipe(Either.of('a'), Either.orElse(spyOrElse), Either.match(id, id))
			assert.equal('a', result)
			assert.equal(spyOrElse.mock.callCount(), 0)
		})

		it('should switch from a left Either to a right by using orElse', () => {
			const result = pipe(
				Either.left('bad'),
				Either.orElse(() => Either.right('good')),
				Either.match(id, id),
			)
			assert.equal('good', result)
		})
	})

	describe('ap', () => {
		let spyApFn
		let eitherFn
		beforeEach(() => {
			spyApFn = mock.fn(str => 'hello ' + str)
			eitherFn = Either.of(spyApFn)
		})

		it('should validate non curried version with left value', () => {
			const result = pipe(Either.ap(eitherFn, Either.left('bad')))

			assert.ok(Either.isLeft(result))
			assert.equal(spyApFn.mock.callCount(), 0)
		})

		it('should validate curried version with right value', () => {
			const result = pipe(eitherFn, Either.ap(Either.right('a')))

			assert.ok(Either.isRight(result))
			assert.equal('hello a', Either.match(result, id, id))
			assert.equal(spyApFn.mock.callCount(), 1)
		})
	})

	describe('tap', () => {
		let spyFn
		beforeEach(() => {
			spyFn = mock.fn(() => {})
		})

		it('should validate non curried version with left value', () => {
			const result = pipe(Either.left('bad'), e => Either.tap(e, spyFn))

			assert.ok(Either.isLeft(result))
			assert.equal(spyFn.mock.callCount(), 0)
		})

		it('should validate curried version with right value', () => {
			const result = pipe(Either.right('a'), e => Either.tap(e, spyFn))

			assert.ok(Either.isRight(result))
			assert.equal(spyFn.mock.callCount(), 1)
		})
	})

	describe('leftTap', () => {
		let spyFn
		beforeEach(() => {
			spyFn = mock.fn(() => {})
		})

		it('should validate non curried version with left value', () => {
			const result = pipe(Either.left('bad'), e => Either.leftTap(e, spyFn))

			assert.ok(Either.isLeft(result))
			assert.equal(spyFn.mock.callCount(), 1)
		})

		it('should validate curried version with right value', () => {
			const result = pipe(Either.right('a'), e => Either.leftTap(e, spyFn))

			assert.ok(Either.isRight(result))
			assert.equal(spyFn.mock.callCount(), 0)
		})
	})

	describe('toNullable', () => {
		it('should get value when provided with right', () => {
			assert.equal(1, pipe(Either.right(1), Either.toNullable))
		})

		it('should get null when provided with left', () => {
			assert.equal(null, pipe(Either.left('bad'), Either.toNullable))
		})
	})

	describe('getOrEx', () => {
		it('should get value when provided with right', () => {
			assert.equal(1, pipe(Either.right(1), Either.getOrEx))
		})

		it('should get throw when provided with left', () => {
			assert.throws(() => pipe(Either.left('bad'), Either.getOrEx))
		})
	})

	describe('toMaybe', () => {
		it('should get a just when provided with right', () => {
			const mb = pipe(Either.right(1), Either.toMaybe)

			assert.ok(Maybe.isJust(mb))
			assert.equal(1, Maybe.toNullable(mb))
		})

		it('should get null when provided with left', () => {
			const mb = pipe(Either.left('bad'), Either.toMaybe)

			assert.ok(Maybe.isNothing(mb))
			assert.equal(null, Maybe.toNullable(mb))
		})
	})

	describe('toTask', () => {
		it('should get a resolved Task when provided with right', () => {
			const tsk = pipe(Either.right(1), Either.toTask)

			tsk.fork(assert.fail, n => assert.equal(n, 1))
		})

		it('should get a rejected Task when provided with left', () => {
			const tsk = pipe(Either.left('bad'), Either.toTask)

			tsk.fork(s => assert.equal(s, 'bad'), assert.fail)
		})
	})
})
