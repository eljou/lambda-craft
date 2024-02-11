import { it, describe } from 'node:test'
import assert from 'node:assert/strict'

import { Maybe } from '../maybe.mjs'
import { Dict } from '../dict.mjs'
import { pipe } from '../utils.mjs'

describe('Dict utilities', () => {
	it('should be able to create a dict from pairs', () => {
		const obj = Dict.fromPairs([
			['name', 'dog'],
			['age', 22],
		])

		assert.equal(obj.age, 22)
		assert.equal(obj.name, 'dog')
	})

	it('should check if an object is empty', () => {
		assert.equal(Dict.isEmpty({}), true)
		assert.equal(Dict.isEmpty({ age: 22 }), false)
	})

	it('should get an object keys', () => {
		const r = pipe({ name: 'jhon', age: 12 }, Dict.keys)
		assert.equal(r.length, 2)
		assert.equal(r[0], 'name')
		assert.equal(r[1], 'age')
	})

	describe('prop', () => {
		const obj = { name: 'dog', age: 22 }
		it('should work with curried version', () => {
			assert.equal(pipe(obj, Dict.prop('age')), 22)
		})

		it('should work with non curried version', () => {
			assert.equal(Dict.prop(obj, 'age'), 22)
		})
	})

	describe('deleteKey', () => {
		const obj = { name: 'dog', age: 22 }

		it('should work with curried version', () => {
			assert.equal(
				pipe(obj, Dict.deleteKey('age'), x => Object.keys(x).some(k => k === 'age')),
				false,
			)
		})

		it('should work with non curried version', () => {
			assert.equal(
				pipe(
					obj,
					x => Dict.deleteKey(x, 'age'),
					x => Object.keys(x).some(k => k === 'age'),
				),
				false,
			)
		})
	})

	describe('deleteKeys', () => {
		const obj = { name: 'dog', age: 22, isMan: true }
		it('should work with curried version', () => {
			assert.equal(
				pipe(obj, Dict.deleteKeys(['age', 'isMan']), x => Object.keys(x).length),
				1,
			)
		})

		it('should work with non curried version', () => {
			assert.equal(
				pipe(
					obj,
					x => Dict.deleteKeys(x, ['age', 'isMan']),
					x => Object.keys(x).length,
				),
				1,
			)
		})
	})

	describe('get', () => {
		const obj = { name: 'dog', age: 22 }
		it('should work with curried version', () => {
			assert.equal(pipe(obj, Dict.get('age'), Maybe.getOrDefault(0)), 22)
		})

		it('should work with non curried version', () => {
			assert.equal(
				pipe(obj, x => Dict.get(x, 'age'), Maybe.getOrDefault(0)),
				22,
			)
		})
	})

	describe('merge', () => {
		const obj = { name: 'dog', age: 22 }

		it('should work with curried version', () => {
			const merged = pipe(obj, Dict.merge({ isMale: true }))
			assert.equal(Object.keys(merged).length, 3)
			assert.equal(merged.isMale, true)
		})

		it('should work with non curried version', () => {
			const merged = pipe(obj, x => Dict.merge(x, { isMale: true }))
			assert.equal(Object.keys(merged).length, 3)
			assert.equal(merged.isMale, true)
		})
	})

	describe('update', () => {
		const obj = { name: 'dog', age: 22 }
		it('should work with curried version', () => {
			const updated = pipe(
				obj,
				Dict.update('name', () => 'jhon'),
			)
			assert.equal(updated.name, 'jhon')
		})

		it('should work with non curried version', () => {
			const updated = pipe(obj, x => Dict.update(x, 'name', () => 'jhon'))
			assert.equal(updated.name, 'jhon')
		})
	})
})
