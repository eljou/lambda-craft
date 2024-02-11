import { pipe } from './utils.mjs'
import { withArgumentsBinding } from './shared.mjs'
import { Either } from './either.mjs'
import { Maybe } from './maybe.mjs'
import { Task } from './task.mjs'

function of(...args) {
	return [...args]
}

function _make(n, element) {
	if (n < 0) return []
	return [...new Array(n)].map(() => element)
}
const make = withArgumentsBinding(_make)

function _makeWithIndex(n, fn) {
	if (n < 0) return []
	return [...new Array(n)].map((_, i) => fn(i))
}
const makeWithIndex = withArgumentsBinding(_makeWithIndex)

function isEmpty(arr) {
	return arr.length == 0
}

function size(arr) {
	return arr.length
}

function head([head, ...tail]) {
	return Maybe.fromNullable(head)
}

function headOrNull([head, ...tail]) {
	return head ?? null
}

function tail([h, ...tail]) {
	return tail
}

function _all(arr, pred) {
	return arr.reduce((prev, i) => prev && pred(i), true)
}
const all = withArgumentsBinding(_all)

function _any(arr, pred) {
	return arr.reduce((prev, i) => prev || pred(i), false)
}
const any = withArgumentsBinding(_any)

function _some(arr, pred) {
	return arr.some(pred)
}
const some = withArgumentsBinding(_some)

function _find(arr, pred) {
	return Maybe.fromNullable(arr.find(item => pred(item)))
}
const find = withArgumentsBinding(_find)

function _findOrNull(arr, pred) {
	return arr.find(item => pred(item)) ?? null
}
const findOrNull = withArgumentsBinding(_findOrNull)

function _at(arr, i) {
	return Maybe.fromNullable(arr.at(i))
}
const at = withArgumentsBinding(_at)

function _atOrNull(arr, i) {
	return arr.at(i) ?? null
}
const atOrNull = withArgumentsBinding(_atOrNull)

function _removeAt(arr, index) {
	return filterIndexed(arr, (x, i) => i != index)
}
const removeAt = withArgumentsBinding(_removeAt)

function _take(arr, amount) {
	if (amount < 0) return []
	if (amount >= arr.length) return arr
	const result = []
	for (let cursor = 0; cursor < amount; cursor++) {
		const element = arr[cursor]
		result.push(element)
	}
	return result
}
const take = withArgumentsBinding(_take)

function reverse(arr) {
	return [...arr].reverse()
}

function _cons(arr, item) {
	return [...arr, item]
}
const cons = withArgumentsBinding(_cons)

function _snoc(arr, item) {
	return [item, ...arr]
}
const snoc = withArgumentsBinding(_snoc)

function _concat(arrA, arrB) {
	return arrA.concat(arrB)
}
const concat = withArgumentsBinding(_concat)

function _groupBy(arr, fn) {
	return arr.reduce((prev, item) => {
		const key = fn(item)
		const value = prev[key]

		if (value != undefined) value.push(item)
		else prev[key] = [item]

		return prev
	}, {})
}
const groupBy = withArgumentsBinding(_groupBy)

function _forEach(arr, f) {
	return arr.forEach(item => f(item))
}
const forEach = withArgumentsBinding(_forEach)

function _forEachIndexed(arr, f) {
	return arr.forEach((item, i) => f(item, i))
}
const forEachIndexed = withArgumentsBinding(_forEachIndexed)

function _map(arr, f) {
	return arr.map(item => f(item))
}
const map = withArgumentsBinding(_map)

function _mapIndexed(arr, f) {
	return arr.map((item, i) => f(item, i))
}
const mapIndexed = withArgumentsBinding(_mapIndexed)

function _filter(arr, f) {
	return arr.filter(item => f(item))
}
const filter = withArgumentsBinding(_filter)

function _filterIndexed(arr, f) {
	return arr.filter((item, i) => f(item, i))
}
const filterIndexed = withArgumentsBinding(_filterIndexed)

function _chain(arr, f) {
	return arr.flatMap(item => f(item))
}
const chain = withArgumentsBinding(_chain)
function _chainIndexed(arr, f) {
	return arr.flatMap((item, i) => f(item, i))
}
const chainIndexed = withArgumentsBinding(_chainIndexed)

function _fold(arr, folder, start) {
	return arr.reduce((prev, curr) => folder(prev, curr), start)
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

function _foldIndexed(arr, folder, start) {
	return arr.reduce((prev, curr, i) => folder(prev, curr, i), start)
}
function foldIndexed() {
	if (arguments.length === 2) {
		const args = arguments
		return function fn(data) {
			return _foldIndexed(data, args[0], args[1])
		}
	}
	return _foldIndexed(arguments[0], arguments[1], arguments[2])
}

function _ap(fns, list) {
	return chain(fns, f => map(list, f))
}
const ap = withArgumentsBinding(_ap)

function sequenceMaybe(arr) {
	return arr.reduce(
		(prev, e) =>
			pipe(
				prev,
				Maybe.chain(xs => Maybe.map(e, x => [...xs, x])),
			),
		Maybe.of([]),
	)
}
function _traverseMaybe(arr, mapFn) {
	return sequenceMaybe(arr.map(mapFn))
}
const traverseMaybe = withArgumentsBinding(_traverseMaybe)

function sequenceEither(arr) {
	return arr.reduce(
		(prev, e) =>
			pipe(
				prev,
				Either.chain(xs => Either.map(e, x => [...xs, x])),
			),
		Either.of([]),
	)
}
function _traverseEither(arr, mapFn) {
	return sequenceEither(arr.map(mapFn))
}
const traverseEither = withArgumentsBinding(_traverseEither)

function sequenceTask(arr) {
	return arr.reduce(
		(prev, e) =>
			pipe(
				prev,
				Task.chain(xs => Task.map(e, x => [...xs, x])),
			),
		Task.of([]),
	)
}
function _traverseTaskM(arr, mapFn) {
	return sequenceTask(arr.map(mapFn))
}
const traverseTaskM = withArgumentsBinding(_traverseTaskM)

function _traverseTaskA(arr, mapFn) {
	return arr.reduce(
		(tl, i) =>
			pipe(
				Task.of(xs => x => xs.concat([x])),
				Task.ap(tl),
				Task.ap(mapFn(i)),
			),
		Task.of([]),
	)
}
const traverseTaskA = withArgumentsBinding(_traverseTaskA)

export const Arr = {
	of,
	make,
	makeWithIndex,
	isEmpty,
	size,
	head,
	headOrNull,
	tail,
	all,
	any,
	find,
	findOrNull,
	at,
	atOrNull,
	some,
	removeAt,
	take,
	reverse,
	cons,
	snoc,
	concat,
	groupBy,
	forEach,
	forEachIndexed,
	map,
	mapIndexed,
	filter,
	filterIndexed,
	chain,
	fold,
	foldIndexed,
	ap,
	sequenceMaybe,
	traverseMaybe,
	sequenceEither,
	traverseEither,
	sequenceTask,
	traverseTaskA,
	traverseTaskM,
}
