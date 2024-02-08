import { withArgumentsBinding } from './shared.js'
import { Maybe } from './maybe.js'

function _deleteKey(dict, key) {
  const newDict = { ...dict }
  delete newDict[key]
  return newDict
}
const deleteKey = withArgumentsBinding(_deleteKey)

function _deleteKeys(dict, keys) {
  return keys.reduce(deleteKey, dict)
}
const deleteKeys = withArgumentsBinding(_deleteKeys)

function _prop(dict, key) {
  return dict[key]
}
const prop = withArgumentsBinding(_prop)

function fromPairs(pairs) {
  return pairs.reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})
}

function _get(dict, key) {
  return Maybe.fromNullable(dict[key])
}
const get = withArgumentsBinding(_get)

function isEmpty(dict) {
  return Object.keys(dict).length == 0
}

function keys(dict) {
  return Object.keys(dict)
}

function _merge(dictA, dictB) {
  return { ...dictA, ...dictB }
}

const merge = withArgumentsBinding(_merge)

function values(dict) {
  return Object.values(dict)
}

function _update(dict, key, updaterFn) {
  return { ...dict, [key]: updaterFn(Maybe.fromNullable(dict[key])) }
}
function update() {
  if (arguments.length === 2) {
    const args = arguments
    return function fn(data) {
      return _update(data, args[0], args[1])
    }
  }
  return _update(arguments[0], arguments[1], arguments[2])
}

export const Dict = { deleteKey, deleteKeys, prop, fromPairs, get, isEmpty, keys, merge, values, update }
