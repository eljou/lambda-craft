import { withArgumentsBinding } from './shared.mjs'
import { Either } from './either.mjs'
import { Maybe } from './maybe.mjs'

function create(fork) {
	return { fork }
}

function of(value) {
	return create((_, res) => res(value))
}

function rejected(e) {
	return create((rej, _) => rej(e))
}

function fromTry(f) {
	return create((rej, res) => {
		try {
			res(f())
		} catch (error) {
			rej(error)
		}
	})
}

function fromLazyPromise(f) {
	return create((rej, res) => {
		f().then(res).catch(rej)
	})
}

function fromEither(either) {
	return create((rej, res) => (Either.isLeft(either) ? rej(either.value) : res(either.value)))
}

function _fromMaybe(mb, orErr) {
	return create((rej, res) => (Maybe.isJust(mb) ? res(Maybe.getOrEx(mb)) : rej(orErr)))
}
const fromMaybe = withArgumentsBinding(_fromMaybe)

function flip(t) {
	return create((rej, res) => t.fork(res, rej))
}

function _map(t, mapFn) {
	return create((rej, res) => t.fork(rej, r => res(mapFn(r))))
}
const map = withArgumentsBinding(_map)

function _rejectMap(t, mapFn) {
	return create((rej, res) => t.fork(e => rej(mapFn(e)), res))
}
const rejectMap = withArgumentsBinding(_rejectMap)

function _chain(t, mapFn) {
	return create((rej, res) => t.fork(rej, s => mapFn(s).fork(rej, res)))
}
const chain = withArgumentsBinding(_chain)

function _orElse(t, mapErr) {
	return create((rej, res) => t.fork(e => mapErr(e).fork(rej, res), res))
}
const orElse = withArgumentsBinding(_orElse)

function _tap(t, succFn) {
	return create((rej, res) =>
		t.fork(rej, s => {
			const tapped = succFn(s)
			return tapped != undefined && tapped.fork ? tapped.fork(rej, () => res(s)) : res(s)
		}),
	)
}
const tap = withArgumentsBinding(_tap)

function _rejectTap(t, errFn) {
	return create((rej, res) =>
		t.fork(e => {
			const tapped = errFn(e)
			return tapped != undefined && tapped.fork ? tapped.fork(() => rej(e), res) : rej(e)
		}, res),
	)
}
const rejectTap = withArgumentsBinding(_rejectTap)

function synchronize(rej, res) {
	let fn = null
	let val = null
	let rejected = false
	const rejecter = err => {
		if (rejected) return

		rejected = true
		rej(err)
	}
	const resolver = setter => x => {
		if (rejected) return

		setter(x)
		if (fn != null && val != null) res(fn(val))
	}

	return {
		guardReject: rejecter,
		resolveFn: resolver(f => {
			fn = f
		}),
		resolveValue: resolver(v => {
			val = v
		}),
	}
}

function _ap(tFn, t) {
	return create((rej, res) => {
		const { guardReject, resolveFn, resolveValue } = synchronize(rej, res)

		tFn.fork(guardReject, resolveFn)
		t.fork(guardReject, resolveValue)
	})
}
const ap = withArgumentsBinding(_ap)

function _fold(t, errFn, succFn) {
	return create((_, res) =>
		t.fork(
			e => res(errFn(e)),
			s => res(succFn(s)),
		),
	)
}
function fold() {
	if (arguments.length === 2) {
		const args = arguments
		return function fn(data) {
			return _fold(data, args[0], args[1])
		}
	}
	return _fold(arguments[0], arguments[1], arguments[2])
}

function toPromise(t) {
	return new Promise((res, rej) => t.fork(rej, res))
}

export const Task = {
	create,
	of,
	rejected,
	fromTry,
	fromLazyPromise,
	fromEither,
	fromMaybe,
	map,
	rejectMap,
	ap,
	chain,
	orElse,
	tap,
	rejectTap,
	toPromise,
	flip,
	fold,
}
