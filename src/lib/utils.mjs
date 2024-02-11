function pipe(x, ...fns) {
	return fns.reduce((acc, fn) => fn(acc), x)
}

function id(value) {
	return value
}

export { pipe, id }
