import { Either, pipe } from '../index.mjs'

const logData = (data: unknown) => {
	console.log({ data })
}

function main() {
	const r = pipe(
		Either.of(1),
		Either.map(n => n.toString()),
		Either.chain(str => Either.of(str.length)),
		Either.tap(logData),
		Either.toNullable,
	)

	console.log(r)
}

main()
