import { Task, pipe } from '../index.mjs'

const logData = <T>(data: T) => {
	console.log({ data })
}

const logAsync = <T>(data: T) => Task.of(console.log({ asyncData: data }))

function main() {
	const r = pipe(
		Task.of(33),
		Task.map(n => n.toString()),
		Task.tap<Error, string>(logData),
		Task.tap<Error, string>(logAsync),
		Task.chain(str => Task.of(str.length)),
	)

	Task.fork(r, console.error, console.log)
}

main()
