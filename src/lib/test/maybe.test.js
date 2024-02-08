import { it, beforeEach, describe, mock } from 'node:test'
import assert from 'node:assert/strict'

import { id, pipe } from '../utils.js'
import { Maybe } from '../maybe.js'
import { Either } from '../either.js'

describe.skip('Maybe type class', () => {
  describe('creation functions of, just, nothing', () => {
    it('should be able to create with "of"', () => {
      const mb = Maybe.of(1)
      assert.ok(mb)
      assert.equal(Maybe.getOrEx(mb), 1)
    })

    it('should be able to create with "just"', () => {
      const mb = Maybe.just(1)
      assert.ok(mb)
      assert.equal(Maybe.getOrEx(mb), 1)
    })

    it('should be able to create with "nothing"', () => {
      const empty = Maybe.nothing()
      assert.ok(!empty.value)
    })
  })

  describe('constructor "fromNullable"', () => {
    it('should get a Just when provided with value', () => {
      const mb = Maybe.fromNullable(1)
      assert.ok(mb)
      assert.equal(Maybe.getOrEx(mb), 1)
    })

    it('should get a Nothing when provided with undefined', () => {
      const mb = Maybe.fromNullable(void 0)
      assert.ok(!mb.value)
      assert.throws(() => Maybe.getOrEx(mb))
    })
  })

  describe('constructor "fromTry"', () => {
    it('should get a Just when funtion returns a value', () => {
      const mb = Maybe.fromTry(() => 1)
      assert.ok(mb)
      assert.equal(Maybe.getOrEx(mb), 1)
    })

    it('should get a Nothing when funtion throws', () => {
      const mb = Maybe.fromTry(() => {
        throw new Error('bad')
      })
      assert.ok(!mb.value)
      assert.throws(() => Maybe.getOrEx(mb))
    })
  })

  describe('state validators "isJust, isNothing"', () => {
    it('should check if value is wrapped in Just or Nothing with isJust', () => {
      const just = Maybe.of(1)
      assert.ok(Maybe.isJust(just))

      const none = Maybe.nothing()
      assert.ok(!Maybe.isJust(none))
    })

    it('should check if value is wrapped in Just or Nothing with isNothing', () => {
      const just = Maybe.of(1)
      assert.ok(!Maybe.isNothing(just))

      const none = Maybe.nothing()
      assert.ok(Maybe.isNothing(none))
    })
  })

  describe('getters "getOrEx, toNullable, getOrDefault"', () => {
    it('should test getOrEx on Just and Nothing', () => {
      const value = 'a'
      assert.equal(pipe(Maybe.of(value), Maybe.getOrEx), value)
      assert.throws(() => pipe(Maybe.nothing(), Maybe.getOrEx))
    })

    it('should test toNullable on Just and Nothing', () => {
      const value = 'a'
      assert.equal(pipe(Maybe.of(value), Maybe.toNullable), value)
      assert.equal(pipe(Maybe.nothing(), Maybe.toNullable), null)
    })

    it('should test getOrDefault on Just and Nothing', () => {
      const value = 'a'
      assert.equal(pipe(Maybe.of(value), Maybe.getOrDefault('default')), value)
      assert.equal(pipe(Maybe.nothing(), Maybe.getOrDefault('default')), 'default')
    })
  })

  describe('match', () => {
    it('should validate non curried with nothing version', () => {
      assert.equal(
        pipe(Maybe.nothing(), mb => Maybe.match(mb, id, () => 'none')),
        'none',
      )
    })

    it('should validate curried with just version', () => {
      const value = 'a'
      assert.equal(
        pipe(
          Maybe.of(value),
          Maybe.match(id, () => 'none'),
        ),
        value,
      )
    })
  })

  describe('tap', () => {
    let spyFn
    beforeEach(() => {
      spyFn = mock.fn(() => {})
    })

    it('should validate non curried with nothing version', () => {
      const result = pipe(Maybe.nothing(), mb => Maybe.tap(mb, spyFn), Maybe.toNullable)

      assert.equal(result, null)
      assert.equal(spyFn.mock.callCount(), 0)
    })

    it('should validate curried with just version', () => {
      const value = 'a'
      const result = pipe(Maybe.of(value), Maybe.tap(spyFn), Maybe.toNullable)

      assert.equal(result, value)
      assert.equal(spyFn.mock.callCount(), 1)
    })
  })

  describe('map', () => {
    let spyMapper
    beforeEach(() => {
      spyMapper = mock.fn(str => str.length)
    })

    it('should validate non curried with nothing version', () => {
      const result = pipe(Maybe.nothing(), mb => Maybe.map(mb, spyMapper), Maybe.toNullable)

      assert.equal(result, null)
      assert.equal(spyMapper.mock.callCount(), 0)
    })

    it('should validate curried with just version', () => {
      assert.equal(pipe(Maybe.of('a'), Maybe.map(spyMapper), Maybe.toNullable), 1)
      assert.equal(spyMapper.mock.callCount(), 1)
    })
  })

  describe('chain', () => {
    let spyChainer
    beforeEach(() => {
      spyChainer = mock.fn(str => Maybe.of(str.length))
    })

    it('should validate non curried with nothing version', () => {
      const result = pipe(Maybe.nothing(), mb => Maybe.chain(mb, spyChainer), Maybe.toNullable)

      assert.equal(result, null)
      assert.equal(spyChainer.mock.callCount(), 0)
    })

    it('should validate curried with just version', () => {
      assert.equal(pipe(Maybe.of('a'), Maybe.chain(spyChainer), Maybe.toNullable), 1)
      assert.equal(spyChainer.mock.callCount(), 1)
    })
  })

  describe('ap', () => {
    let spyApFn
    beforeEach(() => {
      spyApFn = mock.fn(str => 'hello ' + str)
    })

    it('should validate non curried with nothing version', () => {
      const result = pipe(Maybe.ap(Maybe.of(spyApFn), Maybe.nothing()), Maybe.toNullable)

      assert.equal(result, null)
      assert.equal(spyApFn.mock.callCount(), 0)
    })

    it('should validate curried with just version', () => {
      assert.equal(pipe(Maybe.of(spyApFn), Maybe.ap(Maybe.of('a')), Maybe.toNullable), 'hello a')
      assert.equal(spyApFn.mock.callCount(), 1)
    })

    it('should fail when some of the arguments is nothing', () => {
      assert.equal(null, pipe(Maybe.of(spyApFn), Maybe.ap(Maybe.nothing()), Maybe.toNullable))
      assert.equal(null, pipe(Maybe.nothing(), Maybe.ap(Maybe.of('a')), Maybe.toNullable))

      assert.equal(spyApFn.mock.callCount(), 0)
    })
  })

  describe('filter', () => {
    let spyPredicate
    beforeEach(() => {
      spyPredicate = mock.fn(n => n > 5)
    })

    it('should validate non curried with nothing version', () => {
      const result = pipe(Maybe.nothing(), mb => Maybe.filter(mb, spyPredicate), Maybe.toNullable)

      assert.equal(result, null)
      assert.equal(spyPredicate.mock.callCount(), 0)
    })

    it('should validate curried with just version when predicate its true', () => {
      assert.equal(pipe(Maybe.of(7), Maybe.filter(spyPredicate), Maybe.toNullable), 7)
      assert.equal(spyPredicate.mock.callCount(), 1)
    })

    it('should validate curried with just version when predicate its false', () => {
      assert.equal(pipe(Maybe.of(1), Maybe.filter(spyPredicate), Maybe.toNullable), null)
      assert.equal(spyPredicate.mock.callCount(), 1)
    })
  })

  describe('toEither', () => {
    it('should validate non curried with nothing version', () => {
      const result = pipe(Maybe.nothing(), mb => Maybe.toEither(mb, 'error'))
      assert.ok(Either.isLeft(result))
      assert.equal('error', Either.match(result, id, id))
    })

    it('should validate curried with just version when predicate its true', () => {
      const result = pipe(Maybe.of('a'), mb => Maybe.toEither(mb, 'error'))
      assert.ok(Either.isRight(result))
      assert.equal('a', Either.match(result, id, id))
    })
  })
})
