function withArgumentsBinding(cb) {
  return function () {
    if (arguments.length === 1) {
      const args = arguments
      return function fn(data) {
        return cb(data, args[0])
      }
    }
    return cb(arguments[0], arguments[1])
  }
}

export { withArgumentsBinding }
