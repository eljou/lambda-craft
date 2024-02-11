import { it, beforeEach, describe, mock } from 'node:test'
import assert from 'node:assert/strict'

import { id, pipe } from '../utils.mjs'
import { Maybe } from '../maybe.mjs'
import { Either } from '../either.mjs'
import { Task } from '../task.mjs'

describe.skip('Task type class', () => {
	describe('creation functions create, of, rejected, fromTry, fromLazyPromise, fromEither, fromMaybe', () => {
		it('should be able to create with "create" and resolves', (_, done) =>
			Task.create((rej, res) => res('good')).fork(done, n => {
				assert.equal(n, 'good')
				done()
			}))
		it('should be able to create with "create" and rejects', (_, done) =>
			Task.create((rej, res) => rej('bad')).fork(err => {
				assert.equal(err, 'bad')
				done()
			}, done))

		it('should be able to create with "of"', (_, done) =>
			Task.of('good').fork(done, n => {
				assert.equal('good', n)
				done()
			}))
		it('should be able to create with "rejected"', (_, done) =>
			Task.rejected('bad').fork(err => {
				assert.equal('bad', err)
				done()
			}, done))

		it('should be able to create with "fromTry" and returns', (_, done) =>
			Task.fromTry(() => 'good').fork(done, s => {
				assert.equal(s, 'good')
				done()
			}))
		it('should be able to create with "fromTry" and throws', (_, done) =>
			Task.fromTry(() => {
				throw 'bad'
			}).fork(err => {
				assert.equal(err, 'bad')
				done()
			}, done))

		it('should be able to create with "fromLazyPromise" and resolves', (_, done) =>
			Task.fromLazyPromise(() => Promise.resolve('good')).fork(done, s => {
				assert.equal(s, 'good')
				done()
			}))
		it('should be able to create with "fromLazyPromise" and rejects', (_, done) =>
			Task.fromLazyPromise(() => Promise.reject('bad')).fork(err => {
				assert.equal(err, 'bad')
				done()
			}, done))

		it('should be able to create with "fromEither" and is right', (_, done) =>
			Task.fromEither(Either.of('good')).fork(done, s => {
				assert.equal(s, 'good')
				done()
			}))
		it('should be able to create with "fromEither" and is left', (_, done) =>
			Task.fromEither(Either.left('bad')).fork(err => {
				assert.equal(err, 'bad')
				done()
			}, done))

		it('should be able to create with "fromMaybe" and its none', (_, done) =>
			Task.fromMaybe(Maybe.nothing(), 'bad').fork(err => {
				assert.equal('bad', err)
				done()
			}, done))
		it('should be able to create with "fromMaybe" and its just', (_, done) =>
			pipe(Maybe.just('good'), Task.fromMaybe('bad')).fork(done, s => {
				assert.equal('good', s)
				done()
			}))
	})

	describe('flip', () => {
		it('should be able to "flip" when provided with resolved', (_, done) =>
			pipe(Task.of('good'), Task.flip).fork(err => {
				assert.equal('good', err)
				done()
			}, done))
		it('should be able to "flip" when provided with rejected', (_, done) =>
			pipe(Task.rejected('bad'), Task.flip).fork(done, s => {
				assert.equal('bad', s)
				done()
			}))
	})

	describe('map', () => {
		let spyMapper
		beforeEach(() => {
			spyMapper = mock.fn(str => str.length)
		})

		it('should validate non curried version with rejection', (_, done) =>
			pipe(Task.rejected('bad'), tsk => Task.map(tsk, spyMapper)).fork(err => {
				assert.equal('bad', err)
				assert.equal(spyMapper.mock.callCount(), 0)
				done()
			}, done))
		it('should validate non curried version with resolution', (_, done) =>
			pipe(Task.of('good'), Task.map(spyMapper)).fork(done, s => {
				assert.equal(4, s)
				assert.equal(spyMapper.mock.callCount(), 1)
				done()
			}))
	})

	describe('rejectMap', () => {
		let spyMapper
		beforeEach(() => {
			spyMapper = mock.fn(str => str.length)
		})

		it('should validate non curried version with rejection', (_, done) =>
			pipe(Task.rejected('bad'), tsk => Task.rejectMap(tsk, spyMapper)).fork(err => {
				assert.equal(3, err)
				assert.equal(spyMapper.mock.callCount(), 1)
				done()
			}, done))
		it('should validate non curried version with resolution', (_, done) =>
			pipe(Task.of('good'), Task.rejectMap(spyMapper)).fork(done, s => {
				assert.equal('good', s)
				assert.equal(spyMapper.mock.callCount(), 0)
				done()
			}))
	})

	describe('chain', () => {
		let spyChainer
		beforeEach(() => {
			spyChainer = mock.fn(str => Task.of(str.length))
		})

		it('should validate non curried version with rejection', (_, done) =>
			pipe(Task.rejected('bad'), tsk => Task.chain(tsk, spyChainer)).fork(err => {
				assert.equal('bad', err)
				assert.equal(spyChainer.mock.callCount(), 0)
				done()
			}, done))
		it('should validate non curried version with resolution and chains with success', (_, done) =>
			pipe(Task.of('good'), Task.chain(spyChainer)).fork(done, s => {
				assert.equal(4, s)
				assert.equal(spyChainer.mock.callCount(), 1)
				done()
			}))
		it('should validate non curried version with resolution and chains with failure', (_, done) => {
			const spyChainerRejects = mock.fn(str => Task.rejected('bad'))
			return pipe(Task.of('good'), Task.chain(spyChainerRejects)).fork(err => {
				assert.equal('bad', err)
				assert.equal(spyChainerRejects.mock.callCount(), 1)
				done()
			}, done)
		})
	})

	describe('orElse', () => {
		let spyFn
		beforeEach(() => {
			spyFn = mock.fn(str => Task.rejected(str.length))
		})

		it('should validate non curried version with rejection', (_, done) =>
			pipe(Task.rejected('bad'), tsk => Task.orElse(tsk, spyFn)).fork(err => {
				assert.equal(3, err)
				assert.equal(spyFn.mock.callCount(), 1)
				done()
			}, done))
		it('should validate non curried version with resolution and chains with success', (_, done) =>
			pipe(Task.of('good'), Task.orElse(spyFn)).fork(done, s => {
				assert.equal('good', s)
				assert.equal(spyFn.mock.callCount(), 0)
				done()
			}))
		it('should validate non curried version with resolution and chains with failure', (_, done) => {
			const spyFnResolves = mock.fn(str => Task.of('good'))
			return pipe(Task.rejected('bad'), Task.orElse(spyFnResolves)).fork(done, s => {
				assert.equal('good', s)
				assert.equal(spyFnResolves.mock.callCount(), 1)
				done()
			})
		})
	})

	describe('tap', () => {
		let spyFn
		beforeEach(() => {
			spyFn = mock.fn(() => {})
		})

		it('should validate non curried version with rejected', (_, done) =>
			pipe(Task.rejected('bad'), e => Task.tap(e, spyFn)).fork(err => {
				assert.equal('bad', err)
				assert.equal(spyFn.mock.callCount(), 0)
				done()
			}, done))

		it('should validate curried version with resolved', (_, done) =>
			pipe(Task.of('good'), Task.tap(spyFn)).fork(done, s => {
				assert.equal('good', s)
				assert.equal(spyFn.mock.callCount(), 1)
				done()
			}))

		it('should validate when tap function returns a resolved task', (_, done) => {
			const spyTaskVoidFn = mock.fn(() => Task.of(void 0))
			return pipe(Task.of('good'), Task.tap(spyTaskVoidFn)).fork(done, s => {
				assert.equal('good', s)
				assert.equal(spyTaskVoidFn.mock.callCount(), 1)
				done()
			})
		})
		it('should validate when tap function returns a rejected task', (_, done) => {
			const spyTaskVoidFn = mock.fn(() => Task.rejected('bad'))
			return pipe(Task.of('good'), Task.tap(spyTaskVoidFn)).fork(err => {
				assert.equal('bad', err)
				assert.equal(spyTaskVoidFn.mock.callCount(), 1)
				done()
			}, done)
		})
	})
	describe('rejectTap', () => {
		let spyFn
		beforeEach(() => {
			spyFn = mock.fn(() => {})
		})

		it('should validate non curried version with rejected', (_, done) =>
			pipe(Task.rejected('bad'), e => Task.rejectTap(e, spyFn)).fork(err => {
				assert.equal('bad', err)
				assert.equal(spyFn.mock.callCount(), 1)
				done()
			}, done))

		it('should validate curried version with resolved', (_, done) =>
			pipe(Task.of('good'), Task.rejectTap(spyFn)).fork(done, s => {
				assert.equal('good', s)
				assert.equal(spyFn.mock.callCount(), 0)
				done()
			}))

		it('should validate when tap function returns a resolved task', (_, done) => {
			const spyTaskVoidFn = mock.fn(() => Task.of('good'))
			return pipe(Task.rejected('bad'), Task.rejectTap(spyTaskVoidFn)).fork(done, s => {
				assert.equal('good', s)
				assert.equal(spyTaskVoidFn.mock.callCount(), 1)
				done()
			})
		})
		it('should validate when tap function returns a rejected task', (_, done) => {
			const spyTaskVoidFn = mock.fn(() => Task.rejected('re bad'))
			return pipe(Task.rejected('bad'), Task.rejectTap(spyTaskVoidFn)).fork(err => {
				assert.equal('bad', err)
				assert.equal(spyTaskVoidFn.mock.callCount(), 1)
				done()
			}, done)
		})
	})

	describe('ap', () => {
		let spyApFn
		let taskOfFn
		beforeEach(() => {
			spyApFn = mock.fn(str => 'hello ' + str)
			taskOfFn = Task.of(spyApFn)
		})

		it('should validate non curried version with rejected task', (_, done) =>
			pipe(Task.ap(taskOfFn, Task.rejected('bad'))).fork(err => {
				assert.equal('bad', err)
				assert.equal(spyApFn.mock.callCount(), 0)
				done()
			}, done))
		it('should validate curried version with resolved task', (_, done) =>
			pipe(taskOfFn, Task.ap(Task.of('good'))).fork(done, s => {
				assert.equal('hello good', s)
				assert.equal(spyApFn.mock.callCount(), 1)
				done()
			}))
	})

	describe('fold', () => {
		it('should validate non curried version with rejected task', (_, done) =>
			Task.fold(Task.rejected('bad'), err => err.length, done).fork(done, s => {
				assert.equal(3, s)
				done()
			}))
		it('should validate curried version with resolved task', (_, done) =>
			pipe(
				Task.of('good'),
				Task.fold(done, s => s.length),
			).fork(done, s => {
				assert.equal(4, s)
				done()
			}))
	})

	describe('toPromise', () => {
		it('should transform to a resolved Promise', () =>
			pipe(Task.of('good'), Task.toPromise).then(s => assert.equal(s, 'good')))
		it('should transform to a rejected Promise', () =>
			pipe(Task.rejected('bad'), Task.toPromise).catch(err => assert.equal(err, 'bad')))
	})
})
