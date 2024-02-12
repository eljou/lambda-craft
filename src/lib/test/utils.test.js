import { it, describe } from 'node:test'
import assert from 'node:assert/strict'
import { flow, idFn, pipe } from '../utils.mjs'

describe('Library utilities', () => {
	it('should be able to pipe', () => {
		assert.equal(
			4,
			pipe(
				1,
				x => x + 1,
				x => x * 2,
			),
		)
	})

	it('should be able to flow', () => {
		assert.equal(
			4,
			flow(
				x => x + 1,
				x => x * 2,
			)(1),
		)
	})

	it('shoudl return the same with idFn', () => {
		assert.equal(1, idFn(1))
	})
})
