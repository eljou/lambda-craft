import { Arr, pipe } from '../index.mjs'

export function main() {
	pipe(
		Arr.make(5, 0),
		Arr.mapIndexed((_, i) => i + 1),
		Arr.reverse,
		Arr.removeAt(3),
		Arr.tail,
		Arr.forEach(console.log),
	)
}
