function pipe(x, ...fns) {
	return fns.reduce((acc, fn) => fn(acc), x)
}

function flow(...fns) {
	return arg => pipe(arg, ...fns)
}

function idFn(value) {
	return value
}

export { pipe, flow, idFn }
