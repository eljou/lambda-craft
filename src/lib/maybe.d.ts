import { ExtractValue } from './utils.js'
import { Either } from './either.js'

type Nothing = { value: null | undefined; _tag: 'nothing' }
type Just<A> = { value: A; _tag: 'just' }
type Maybe<A> = Just<A> | Nothing

/**
 * Creates a Maybe container with a non-nullable value.
 * @template A
 * @param {NonNullable<A>} value - The non-nullable value.
 * @returns {Maybe<A>} - The Maybe container with the value.
 */
declare const of: <A>(value: NonNullable<A>) => Maybe<A>

/**
 * Creates a Maybe container with a non-nullable value.
 * @template A
 * @param {NonNullable<A>} value - The non-nullable value.
 * @returns {Maybe<A>} - The Maybe container with the value.
 */
declare const just: <A>(value: NonNullable<A>) => Maybe<A>

/**
 * Creates a Maybe container with no value.
 * @template A
 * @returns {Maybe<A>} - The Maybe container with no value.
 */
declare const nothing: <A = unknown>() => Maybe<A>

/**
 * Creates a Maybe container from a nullable value.
 * @template A
 * @param {A} value - The nullable value.
 * @returns {Maybe<A>} - The Maybe container with the value (if not null or undefined) or no value.
 */
declare function fromNullable<A>(value: A): Maybe<ExtractValue<A>>

/**
 * Creates a Maybe container from the result of a function.
 * @template A
 * @param {() => A} fn - The function to execute.
 * @returns {Maybe<A>} - The Maybe container with the value (if the function does not throw an error) or no value.
 */
declare function fromTry<A>(fn: () => A): Maybe<ExtractValue<A>>

/**
 * Checks if the Maybe container has no value.
 * @template A
 * @param {Maybe<A>} mb - The Maybe container.
 * @returns {mb is Maybe<never>} - True if the Maybe container has no value, false otherwise.
 */
declare function isNothing<A>(mb: Maybe<A>): mb is Maybe<never>

/**
 * Checks if the Maybe container has a value.
 * @template A
 * @param {Maybe<A>} mb - The Maybe container.
 * @returns {mb is Maybe<A>} - True if the Maybe container has a value, false otherwise.
 */
declare function isJust<A>(mb: Maybe<A>): mb is Maybe<A>

/**
 * Gets the value from the Maybe container or throws an error if there is no value.
 * @template A
 * @param {Maybe<A>} mb - The Maybe container.
 * @returns {A} - The value from the Maybe container.
 * @throws {Error} - If the Maybe container has no value.
 */
declare function getOrEx<A>(mb: Maybe<A>): A

/**
 * Converts the Maybe container to a nullable value (either the value or null).
 * @template A
 * @param {Maybe<A>} mb - The Maybe container.
 * @returns {A | null} - The value from the Maybe container, or null if there is no value.
 */
declare function toNullable<A>(mb: Maybe<A>): A | null

/**
 * Gets the value from the Maybe container or returns a default value if there is no value.
 * @template A
 * @param {Maybe<A>} mb - The Maybe container.
 * @param {NonNullable<A>} defaultValue - The default value to return if there is no value in the Maybe container.
 * @returns {A} - The value from the Maybe container or the default value.
 */
declare function getOrDefault<A>(mb: Maybe<A>, defaultValue: NonNullable<A>): A

/**
 * Gets the value from the Maybe container or returns a default value if there is no value (curried version).
 * @template A
 * @param {NonNullable<A>} defaultValue - The default value to return if there is no value in the Maybe container.
 * @returns {(mb: Maybe<A>) => A} - A function that takes a Maybe container and returns the value or the default value.
 */
declare function getOrDefault<A>(defaultValue: NonNullable<A>): (mb: Maybe<A>) => A

/**
 * Matches the Maybe container and executes the appropriate function based on whether it has a value or not.
 * @template A, B
 * @param {Maybe<A>} mb - The Maybe container.
 * @param {(value: A) => B} justFn - The function to execute if the Maybe container has a value.
 * @param {() => B} noneFn - The function to execute if the Maybe container has no value.
 * @returns {B} - The result of executing the appropriate function.
 */
declare function match<A, B>(mb: Maybe<A>, justFn: (value: A) => B, noneFn: () => B): B

/**
 * Matches the Maybe container and executes the appropriate function based on whether it has a value or not (curried version).
 * @template A, B
 * @param {(value: A) => B} justFn - The function to execute if the Maybe container has a value.
 * @param {() => B} noneFn - The function to execute if the Maybe container has no value.
 * @returns {(mb: Maybe<A>) => B} - A function that takes a Maybe container and returns the result of executing the appropriate function.
 */
declare function match<A, B>(justFn: (value: A) => B, noneFn: () => B): (mb: Maybe<A>) => B

/**
 * Executes a function with the value from the Maybe container and returns the Maybe container.
 * @template A
 * @param {Maybe<A>} mb - The Maybe container.
 * @param {(value: A) => void} someFn - The function to execute with the value from the Maybe container.
 * @returns {Maybe<A>} - The Maybe container.
 */
declare function tap<A>(mb: Maybe<A>, someFn: (value: A) => void): Maybe<A>

/**
 * Executes a function with the value from the Maybe container and returns the Maybe container (curried version).
 * @template A
 * @param {(value: A) => void} someFn - The function to execute with the value from the Maybe container.
 * @returns {(mb: Maybe<A>) => Maybe<A>} - A function that takes a Maybe container and returns the Maybe container.
 */
declare function tap<A>(someFn: (value: A) => void): (mb: Maybe<A>) => Maybe<A>

/**
 * Maps the value of type A in the Maybe container to a value of type B using the provided map function, implementing the Functor type class.
 * Functor implementation for Maybe
 * @template A, B
 * @param {Maybe<A>} maybe - The Maybe container.
 * @param {(value: A) => B} mapFn - The map function.
 * @returns {Maybe<B>} - The Maybe container with the mapped value.
 */
declare function map<A, B>(maybe: Maybe<A>, mapFn: (value: A) => B): Maybe<B>

/**
 * Maps the value of type A in the Maybe container to a value of type B using the provided map function, implementing the Functor type class (curried version).
 * @template A, B
 * @param {(value: A) => B} mapFn - The map function.
 * @returns {(maybe: Maybe<A>) => Maybe<B>} - The function that maps the value in the Maybe container.
 */
declare function map<A, B>(mapFn: (value: A) => B): (maybe: Maybe<A>) => Maybe<B>

/**
 * Chains the Maybe container with a mapping function that returns another Maybe container, implementing the Monad type class.
 * Monad implementation for Maybe
 * @template A, B
 * @param {Maybe<A>} mb - The Maybe container.
 * @param {(value: A) => Maybe<B>} mapFn - The mapping function that returns another Maybe container.
 * @returns {Maybe<B>} - The result of chaining the Maybe container with the mapping function.
 */
declare function chain<A, B>(mb: Maybe<A>, mapFn: (value: A) => Maybe<B>): Maybe<B>

/**
 * Chains the Maybe container with a mapping function that returns another Maybe container, implementing the Monad type class (curried version).
 * @template A, B
 * @param {(value: A) => Maybe<B>} mapFn - The mapping function that returns another Maybe container.
 * @returns {(mb: Maybe<A>) => Maybe<B>} - A function that takes a Maybe container and returns the result of chaining it with the mapping function.
 */
declare function chain<A, B>(mapFn: (value: A) => Maybe<B>): (mb: Maybe<A>) => Maybe<B>

/**
 * Applies a Maybe container that contains a function to a Maybe container that contains a value, resulting in a new Maybe container, implementing the Applicative type class.
 * Applicative implementation for Maybe
 * @template A, B
 * @param {Maybe<(a: A) => B>} mbFn - The Maybe container that contains a function.
 * @param {Maybe<A>} mb - The Maybe container that contains a value.
 * @returns {Maybe<B>} - The result of applying the function from the first Maybe container to the value from the second Maybe container.
 */
declare function ap<A, B>(mbFn: Maybe<(a: A) => B>, mb: Maybe<A>): Maybe<B>

/**
 * Applies a Maybe container that contains a function to a Maybe container that contains a value, resulting in a new Maybe container, implementing the Applicative type class (curried version).
 * @template A
 * @param {Maybe<A>} mb - The Maybe container that contains a value.
 * @returns {<B>(mbFn: Maybe<(a: A) => B>) => Maybe<B>} - A function that takes a Maybe container that contains a function and returns the result of applying it to the value.
 */
declare function ap<A>(mb: Maybe<A>): <B>(mbFn: Maybe<(a: A) => B>) => Maybe<B>

/**
 * Filters the Maybe container based on a predicate function.
 * @template A
 * @param {Maybe<A>} mb - The Maybe container.
 * @param {(value: A) => boolean} predicateFn - The predicate function to filter the Maybe container.
 * @returns {Maybe<A>} - The filtered Maybe container.
 */
declare function filter<A>(mb: Maybe<A>, predicateFn: (value: A) => boolean): Maybe<A>

/**
 * Filters the Maybe container based on a predicate function (curried version).
 * @template A
 * @param {(value: A) => boolean} predicateFn - The predicate function to filter the Maybe container.
 * @returns {(mb: Maybe<A>) => Maybe<A>} - A function that takes a Maybe container and returns the filtered Maybe container.
 */
declare function filter<A>(predicateFn: (value: A) => boolean): (mb: Maybe<A>) => Maybe<A>

/**
 * Converts a Maybe type to an Either type.
 * @template E - The type of the left value in the Either type.
 * @template S - The type of the right value in the Either type.
 * @param {Maybe<S>} mb - The Maybe value to convert.
 * @param {NonNullable<E>} leftValue - The value to use as the left value in the Either type in case the Maybe is empty.
 * @returns {Either<E, S>} - The converted Either value.
 */
declare function toEither<E, S>(mb: Maybe<S>, leftValue: NonNullable<E>): Either<E, S>

/**
 * Partially applies the leftValue parameter of the toEither function.
 * @template E - The type of the left value in the Either type.
 * @template S - The type of the right value in the Either type.
 * @param {NonNullable<E>} leftValue - The value to use as the left value in the Either type in case the Maybe is empty.
 * @returns {(mb: Maybe<S>) => Either<E, S>} - A function that takes the Maybe value and returns the converted Either value.
 */
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
