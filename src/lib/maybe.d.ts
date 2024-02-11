import { ExtractValue } from './utils.js'
import { Either } from './either.js'

type Nothing = { value: null | undefined; _tag: 'nothing' }
type Just<A> = { value: A; _tag: 'just' }
type Maybe<A> = Just<A> | Nothing

declare const of: <A>(value: NonNullable<A>) => Maybe<A>
declare const just: <A>(value: NonNullable<A>) => Maybe<A>
declare const nothing: <A = unknown>() => Maybe<A>
declare function fromNullable<A>(value: A): Maybe<ExtractValue<A>>
declare function fromTry<A>(fn: () => A): Maybe<ExtractValue<A>>

declare function isNothing<A>(mb: Maybe<A>): mb is Maybe<never>
declare function isJust<A>(mb: Maybe<A>): mb is Maybe<A>

declare function getOrEx<A>(mb: Maybe<A>): A | never
declare function toNullable<A>(mb: Maybe<A>): A | null
declare function getOrDefault<A>(mb: Maybe<A>, defaultValue: NonNullable<A>): A
declare function getOrDefault<A>(defaultValue: NonNullable<A>): (mb: Maybe<A>) => A

declare function match<A, B>(mb: Maybe<A>, justFn: (value: A) => B, noneFn: () => B): B
declare function match<A, B>(justFn: (value: A) => B, noneFn: () => B): (mb: Maybe<A>) => B

declare function tap<A>(mb: Maybe<A>, someFn: (value: A) => void): Maybe<A>
declare function tap<A>(someFn: (value: A) => void): (mb: Maybe<A>) => Maybe<A>

declare function map<A, B>(maybe: Maybe<A>, mapFn: (value: A) => B): Maybe<B>
declare function map<A, B>(mapFn: (value: A) => B): (maybe: Maybe<A>) => Maybe<B>

declare function chain<A, B>(mb: Maybe<A>, mapFn: (value: A) => Maybe<B>): Maybe<B>
declare function chain<A, B>(mapFn: (value: A) => Maybe<B>): (mb: Maybe<A>) => Maybe<B>

declare function ap<A, B>(mbFn: Maybe<(a: A) => B>, mb: Maybe<A>): Maybe<B>
declare function ap<A>(mb: Maybe<A>): <B>(mbFn: Maybe<(a: A) => B>) => Maybe<B>

declare function filter<A>(mb: Maybe<A>, predicateFn: (value: A) => boolean): Maybe<A>
declare function filter<A>(predicateFn: (value: A) => boolean): (mb: Maybe<A>) => Maybe<A>

declare function toEither<E, S>(mb: Maybe<S>, leftValue: NonNullable<E>): Either<E, S>
declare function toEither<E, S>(leftValue: NonNullable<E>): (mb: Maybe<S>) => Either<E, S>

//@ts-ignore
declare const Maybe = {
	of,
	nothing,
	just,
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

export { Maybe, Just, Nothing }
