import { ExtractValue } from './utils.js'
import { Maybe } from './maybe.js'
import { Task } from './task.js'

type Right<T> = { readonly value: NonNullable<T>; _tag: 'right' }
type Left<T> = { readonly value: NonNullable<T>; _tag: 'left' }
type Either<E, S> = Left<E> | Right<S>

/**
 * Creates a Right instance of the Either type with the provided value.
 * @template E, S
 * @param {NonNullable<S>} value - The value to be wrapped in the Right instance.
 * @returns {Either<E, S>} - The Either instance containing the provided value.
 * @example
 * const result = Either.of(5); // result is { value: 5, _tag: 'right' }
 */
declare const of: <E = never, S>(value: NonNullable<S>) => Either<E, S>

/**
 * Creates a Right instance of the Either type with the provided value.
 * @template E, S
 * @param {NonNullable<S>} value - The value to be wrapped in the Right instance.
 * @returns {Either<E, S>} - The Either instance containing the provided value.
 * @example
 * const result = Either.right('hello'); // result is { value: 'hello', _tag: 'right' }
 */
declare const right: <E = never, S>(value: NonNullable<S>) => Either<E, S>

/**
 * Creates a Left instance of the Either type with the provided value.
 * @template E, S
 * @param {NonNullable<E>} value - The value to be wrapped in the Left instance.
 * @returns {Either<E, S>} - The Either instance containing the provided value.
 * @example
 * const result = Either.left('error'); // result is { value: 'error', _tag: 'left' }
 */
declare const left: <E, S = never>(value: NonNullable<E>) => Either<E, S>

/**
 * Checks if the provided Either instance is a Left instance.
 * @template E, S
 * @param {Either<E, S>} e - The Either instance to be checked.
 * @returns {e is Left<E>} - True if the provided instance is a Left instance, false otherwise.
 */
declare function isLeft<E, S>(e: Either<E, S>): e is Left<E>

/**
 * Checks if the provided Either instance is a Right instance.
 * @template E, S
 * @param {Either<E, S>} e - The Either instance to be checked.
 * @returns {e is Right<S>} - True if the provided instance is a Right instance, false otherwise.
 */
declare function isRight<E, S>(e: Either<E, S>): e is Right<S>

/**
 * Creates an Either instance by executing the provided function and wrapping the result in a Right instance if successful, or a Left instance if an error occurs.
 * @template E, S
 * @param {() => S} fn - The function to be executed to produce the value.
 * @returns {Either<E, ExtractValue<S>>} - The Either instance containing the result of the function execution.
 */
declare function fromTry<E, S>(fn: () => S): Either<E, ExtractValue<S>>

/**
 * Maps the value of the provided Either instance using the specified mapping function.
 * Functor implementation for Either
 * @template E, S, T
 * @param {Either<E, S>} e - The Either instance to be mapped.
 * @param {(value: S) => NonNullable<T>} mapFn - The mapping function to transform the value.
 * @returns {Either<E, T>} - The Either instance with the mapped value.
 */
declare function map<E, S, T>(e: Either<E, S>, mapFn: (value: S) => NonNullable<T>): Either<E, T>

/**
 * Maps the value of the provided Either instance using the specified mapping function (curried version).
 * @template S, T
 * @param {(value: S) => NonNullable<T>} mapFn - The mapping function to transform the value.
 * @returns {<E>(e: Either<E, S>) => Either<E, T>} - The function that maps the value of the Either instance.
 */
declare function map<S, T>(mapFn: (value: S) => NonNullable<T>): <E>(e: Either<E, S>) => Either<E, T>

/**
 * Maps the error value of the provided Either instance using the specified mapping function.
 * @template E, S, F
 * @param {Either<E, S>} e - The Either instance to be mapped.
 * @param {(value: E) => NonNullable<F>} mapFn - The mapping function to transform the error value.
 * @returns {Either<F, S>} - The Either instance with the mapped error value.
 */
declare function leftMap<E, S, F>(e: Either<E, S>, mapFn: (value: E) => NonNullable<F>): Either<F, S>

/**
 * Maps the error value of the provided Either instance using the specified mapping function (curried version).
 * @template E, F
 * @param {(value: E) => NonNullable<F>} mapFn - The mapping function to transform the error value.
 * @returns {<S>(e: Either<E, S>) => Either<F, S>} - The function that maps the error value of the Either instance.
 */
declare function leftMap<E, F>(mapFn: (value: E) => NonNullable<F>): <S>(e: Either<E, S>) => Either<F, S>

/**
 * Applies the function contained in the provided Either instance to the value of another Either instance.
 * Applicative implementation for Either
 * @template E, S, T
 * @param {Either<E, (s: S) => T>} eFn - The Either instance containing a function to be applied.
 * @param {Either<E, S>} e - The Either instance whose value will be used as the argument for the function.
 * @returns {Either<E, T>} - The Either instance with the result of applying the function to the value.
 */
declare function ap<E, S, T>(eFn: Either<E, (s: S) => T>, e: Either<E, S>): Either<E, T>

/**
 * Applies the function contained in the provided Either instance to the value of another Either instance (curried version).
 * Applicative implementation for Either.
 * @template E, S
 * @param {Either<E, S>} e - The Either instance whose value will be used as the argument for the function.
 * @returns {<T>(eFn: Either<E, (s: S) => T>) => Either<E, T>} - The function that applies the function to the value.
 */
declare function ap<E, S>(e: Either<E, S>): <T>(eFn: Either<E, (s: S) => T>) => Either<E, T>

/**
 * Chains the provided mapping function to the value of the provided Either instance.
 * Monad implementation for Either
 * @template E, S, F, T
 * @param {Either<E, S>} e - The Either instance to be chained.
 * @param {(value: S) => Either<F, T>} mapFn - The mapping function to produce the new Either instance.
 * @returns {Either<E | F, T>} - The new Either instance after applying the mapping function.
 */
declare function chain<E, S, F, T>(e: Either<E, S>, mapFn: (value: S) => Either<F, T>): Either<E | F, T>

/**
 * Chains the provided mapping function to the value of the provided Either instance (curried version).
 * Monad implementation for Either.
 * @template S, F, T
 * @param {(value: S) => Either<F, T>} mapFn - The mapping function to produce the new Either instance.
 * @returns {<E>(e: Either<E, S>) => Either<E | F, T>} - The function that chains the mapping function to the value.
 */
declare function chain<S, F, T>(mapFn: (value: S) => Either<F, T>): <E>(e: Either<E, S>) => Either<E | F, T>

/**
 * Returns a new Either instance by applying the provided mapping function to the value of the provided Either instance if it is a Left, otherwise returns the original Right instance.
 * @template E, S, F, T
 * @param {Either<E, S>} e - The Either instance to be checked and mapped.
 * @param {(value: E) => Either<F, T>} mapFn - The mapping function to produce the new Either instance.
 * @returns {Either<F, S | T>} - The new Either instance after applying the mapping function.
 */
declare function orElse<E, S, F, T>(e: Either<E, S>, mapFn: (value: E) => Either<F, T>): Either<F, S | T>

/**
 * Returns a new Either instance by applying the provided mapping function to the value of the provided Either instance if it is a Left, otherwise returns the original Right instance (curried version).
 * @template E, F, T
 * @param {(value: E) => Either<F, T>} mapFn - The mapping function to produce the new Either instance.
 * @returns {<S>(e: Either<E, S>) => Either<F, S | T>} - The function that returns the new Either instance after applying the mapping function.
 */
declare function orElse<E, F, T>(mapFn: (value: E) => Either<F, T>): <S>(e: Either<E, S>) => Either<F, S | T>

/**
 * Executes the appropriate function based on whether the provided Either instance is a Left or a Right, and returns the result.
 * @template E, S, T
 * @param {Either<E, S>} e - The Either instance to be matched.
 * @param {(value: E) => T} leftFn - The function to execute if the Either instance is a Left.
 * @param {(value: S) => T} rightFn - The function to execute if the Either instance is a Right.
 * @returns {T} - The result of executing the appropriate function.
 */
declare function match<E, S, T>(e: Either<E, S>, leftFn: (value: E) => T, rightFn: (value: S) => T): T

/**
 * Executes the appropriate function based on whether the provided Either instance is a Left or a Right, and returns the result (curried version).
 * @template E, S, T
 * @param {(value: E) => T} leftFn - The function to execute if the Either instance is a Left.
 * @param {(value: S) => T} rightFn - The function to execute if the Either instance is a Right.
 * @returns {(e: Either<E, S>) => T} - The function that executes the appropriate function and returns the result.
 */
declare function match<E, S, T>(leftFn: (value: E) => T, rightFn: (value: S) => T): (e: Either<E, S>) => T

/**
 * Executes the provided function with the value of the Right instance, if it exists and ignores the returned value.
 * @template E, S
 * @param {Either<E, S>} e - The Either instance to perform the operation on.
 * @param {(value: S) => void} rightFn - The function to execute with the value of the Right instance.
 * @returns {Either<E, S>} - The original Either instance.
 */
declare function tap<E, S>(e: Either<E, S>, rightFn: (value: S) => void): Either<E, S>

/**
 * Executes the provided function with the value of the Right instance, if it exists and ignores the returned value (curried version).
 * @template E, S
 * @param {(value: S) => void} rightFn - The function to execute with the value of the Right instance.
 * @returns {(e: Either<E, S>) => Either<E, S>} - The new function that performs the tap operation.
 */
declare function tap<E, S>(rightFn: (value: S) => void): (e: Either<E, S>) => Either<E, S>

/**
 * Executes the provided function with the error value of the Left instance, if it exists and ignores the returned value.
 * @template E, S
 * @param {Either<E, S>} e - The Either instance to perform the operation on.
 * @param {(err: E) => void} leftFn - The function to execute with the error value of the Left instance.
 * @returns {Either<E, S>} - The original Either instance.
 */
declare function leftTap<E, S>(e: Either<E, S>, leftFn: (err: E) => void): Either<E, S>

/**
 * Executes the provided function with the error value of the Left instance, if it exists and ignores the returned value (curried version).
 * @template E, S
 * @param {(err: E) => void} leftFn - The function to execute with the error value of the Left instance.
 * @returns {(e: Either<E, S>) => Either<E, S>} - The new function that performs the leftTap operation.
 */
declare function leftTap<E, S>(leftFn: (err: E) => void): (e: Either<E, S>) => Either<E, S>

/**
 * Returns a new Either instance with the values swapped between Left and Right.
 * @template E, S
 * @param {Either<E, S>} e - The Either instance to have its values swapped.
 * @returns {Either<S, E>} - The new Either instance with the values swapped.
 */
declare function flip<E, S>(e: Either<E, S>): Either<S, E>

/**
 * Returns the value of the Right instance, or null if the instance is a Left.
 * @template E, S
 * @param {Either<E, S>} e - The Either instance to extract the value from.
 * @returns {S | null} - The value of the Right instance, or null if the instance is a Left.
 */
declare function toNullable<E, S>(e: Either<E, S>): S | null

/**
 * Returns a Maybe instance containing the value of the Right instance, or Nothing if the instance is a Left.
 * @template E, S
 * @param {Either<E, S>} e - The Either instance to convert to a Maybe.
 * @returns {Maybe<S>} - The Maybe instance containing the value of the Right instance, or Nothing if the instance is a Left.
 */
declare function toMaybe<E, S>(e: Either<E, S>): Maybe<S>

/**
 * Returns a Task instance representing the asynchronous computation of the Either instance.
 * @template E, S
 * @param {Either<E, S>} e - The Either instance to convert to a Task.
 * @returns {Task<E, S>} - The Task instance representing the asynchronous computation of the Either instance.
 */
declare function toTask<E, S>(e: Either<E, S>): Task<E, S>

/**
 * Returns the value of the Right instance, or throws an error if the instance is a Left.
 * @template E, S
 * @param {Either<E, S>} e - The Either instance to extract the value from.
 * @returns {S | never} - The value of the Right instance, or throws an error if the instance is a Left.
 */
declare function getOrEx<E, S>(e: Either<E, S>): S | never

//@ts-ignore
const Either = {
	of,
	right,
	left,
	isLeft,
	isRight,
	fromTry,
	map,
	leftMap,
	ap,
	chain,
	orElse,
	match,
	tap,
	leftTap,
	flip,
	toNullable,
	toMaybe,
	toTask,
	getOrEx,
}

export { Either, Left, Right }
