import { withArgumentsBinding } from './shared.js'
import { Maybe } from './maybe.js'
import { Task } from './task.js'

const of = value => ({ _tag: 'right', value })
const right = value => ({ _tag: 'right', value })
const left = value => ({ _tag: 'left', value })

function isLeft(e) {
  return e._tag == 'left'
}

function isRight(e) {
  return e._tag == 'right'
}

function fromTry(f) {
  try {
    const value = f()
    return { _tag: 'right', value }
  } catch (error) {
    return { _tag: 'left', value: error }
  }
}

function _map(either, f) {
  return either._tag == 'right' ? { _tag: 'right', value: f(either.value) } : either
}

const map = withArgumentsBinding(_map)

function _leftMap(either, f) {
  return either._tag == 'left' ? { _tag: 'left', value: f(either.value) } : either
}

const leftMap = withArgumentsBinding(_leftMap)

function _ap(eFn, e) {
  return isLeft(e) ? e : _map(eFn, f => f(e.value))
}
const ap = withArgumentsBinding(_ap)

function _chain(either, f) {
  return either._tag == 'right' ? f(either.value) : either
}

const chain = withArgumentsBinding(_chain)

function _orElse(either, f) {
  return either._tag == 'left' ? f(either.value) : either
}

const orElse = withArgumentsBinding(_orElse)

function _match(e, leftFn, rightFn) {
  return isRight(e) ? rightFn(e.value) : leftFn(e.value)
}

function match() {
  if (arguments.length === 2) {
    const args = arguments
    return function fn(data) {
      return _match(data, args[0], args[1])
    }
  }
  return _match(arguments[0], arguments[1], arguments[2])
}

function _tap(state) {
  return (e, fn) => {
    if (state === e._tag) fn(e.value)
    return e
  }
}

const tap = withArgumentsBinding(_tap('right'))

const leftTap = withArgumentsBinding(_tap('left'))

function flip(e) {
  return isRight(e) ? left(e.value) : right(e.value)
}

function toNullable(e) {
  return isRight(e) ? e.value : null
}

function toMaybe(e) {
  return isRight(e) ? Maybe.just(e.value) : Maybe.nothing()
}

function toTask(e) {
  return isRight(e) ? Task.of(e.value) : Task.rejected(e.value)
}

function getOrEx(e) {
  if (isRight(e)) return e.value
  throw e.value
}

export const Either = {
  of,
  right,
  left,
  isLeft,
  isRight,
  fromTry,
  map,
  leftMap,
  chain,
  orElse,
  ap,
  tap,
  leftTap,
  flip,
  match,
  toNullable,
  toMaybe,
  toTask,
  getOrEx,
}
