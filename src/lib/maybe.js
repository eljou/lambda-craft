import { Either } from './either.js'
import { withArgumentsBinding } from './shared.js'

function valFromMaybe(x) {
  return x.value
}

const just = value => ({ _tag: 'just', value })
const nothing = () => ({ _tag: 'nothing', value: null })

function orJust(x) {
  return x == null ? nothing() : just(x)
}

const of = just
const fromNullable = orJust
const fromTry = function (fn) {
  try {
    return orJust(fn())
  } catch (error) {
    return nothing()
  }
}

function isNothing(mb) {
  return mb.value == null
}

function isJust(mb) {
  return !isNothing(mb)
}

function getOrEx(mb) {
  const value = valFromMaybe(mb)
  if (value != null) return value
  throw new Error('Maybe is empty')
}

function _getOrDefault(mb, deflt) {
  const value = valFromMaybe(mb)
  return value != null ? value : deflt
}

const getOrDefault = withArgumentsBinding(_getOrDefault)

function toNullable(mb) {
  return valFromMaybe(mb)
}

function _match(mb, justFn, noneFn) {
  return isJust(mb) ? justFn(valFromMaybe(mb)) : noneFn()
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

function _tap(mb, f) {
  if (isJust(mb)) f(valFromMaybe(mb))
  return mb
}

const tap = withArgumentsBinding(_tap)

function _map(mb, f) {
  const value = valFromMaybe(mb)
  return orJust(value != null ? f(value) : null)
}

const map = withArgumentsBinding(_map)

function _chain(mb, f) {
  const value = valFromMaybe(mb)
  return value != null ? f(value) : mb
}

const chain = withArgumentsBinding(_chain)

function _ap(mbFn, mb) {
  return isJust(mbFn) && isJust(mb) ? _map(mbFn, f => f(valFromMaybe(mb))) : nothing()
}

const ap = withArgumentsBinding(_ap)

function _filter(mb, predicateFn) {
  return _chain(mb, value => (predicateFn(value) ? mb : nothing()))
}

const filter = withArgumentsBinding(_filter)

function _toEither(mb, err) {
  return isJust(mb) ? Either.right(valFromMaybe(mb)) : Either.left(err)
}
const toEither = withArgumentsBinding(_toEither)

export const Maybe = {
  of,
  just,
  nothing,
  fromNullable,
  fromTry,
  isNothing,
  isJust,
  getOrEx,
  getOrDefault,
  toNullable,
  match,
  tap,
  map,
  chain,
  ap,
  filter,
  toEither,
}
