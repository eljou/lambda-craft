import { Maybe } from './maybe.js'
import { Either } from './either.js'

declare type Task<E, S> = {
	fork: (rej: (e: E) => void, res: (r: S) => void) => void
}

/**
 * Creates a new asynchronous Task with the provided fork function.
 * @template E, S
 * @param {(rej: (e: E) => void, res: (t: S) => void) => void} fork - The fork function for the Task.
 * @returns {Task<E, S>} - A new Task instance.
 */
declare function create<E, S>(fork: (rej: (e: E) => void, res: (t: S) => void) => void): Task<E, S>

/**
 * Creates a new asynchronous Task that is resolved with the provided value.
 * @template E, S
 * @param {S} value - The value for the Task.
 * @returns {Task<E, S>} - A new Task instance.
 */
declare function of<E = never, S>(value: S): Task<E, S>

/**
 * Creates a new asynchronous Task that is rejected with the provided error.
 * @template E, S
 * @param {E} err - The error for the rejection.
 * @returns {Task<E, S>} - A new rejected Task instance.
 */
declare function rejected<E, S = never>(err: E): Task<E, S>

/**
 * Creates a new asynchronous Task from the provided synchronous computation.
 * @template E, S
 * @param {() => S} f - The synchronous computation function.
 * @returns {Task<E, S>} - A new Task instance.
 */
declare function fromTry<E, S>(f: () => S): Task<E, S>

/**
 * Creates a new asynchronous Task from the provided lazy Promise.
 * @template E, S
 * @param {() => Promise<S>} f - The lazy Promise function.
 * @returns {Task<E, S>} - A new Task instance.
 */
declare function fromLazyPromise<E, S>(f: () => Promise<S>): Task<E, S>

/**
 * Creates a new asynchronous Task from the provided Either type.
 * @template E, S
 * @param {Either<E, S>} either - The Either type.
 * @returns {Task<E, S>} - A new Task instance.
 */
declare function fromEither<E, S>(either: Either<E, S>): Task<E, S>

/**
 * Creates a new asynchronous Task from the provided Maybe type, using the specified error as the default value in case of an empty Maybe.
 * @template E, S
 * @param {Maybe<S>} mb - The Maybe type.
 * @param {E} orErr - The default error value.
 * @returns {Task<E, S>} - A new Task instance.
 */
declare function fromMaybe<E, S>(mb: Maybe<S>, orErr: E): Task<E, S>

/**
 * Creates a new asynchronous Task from the provided Maybe type, using the specified error as the default value in case of an empty Maybe (curried version).
 * @template E, S
 * @param {E} orErr - The default error value.
 * @returns {(mb: Maybe<S>) => Task<E, S>} - A function that takes a Maybe type and returns a new Task instance.
 */
declare function fromMaybe<E>(orErr: E): <S>(mb: Maybe<S>) => Task<E, S>

/**
 * Flips the error and success types of the provided Task.
 * @template E, S
 * @param {Task<E, S>} t - The Task to flip.
 * @returns {Task<S, E>} - A new Task instance with flipped error and success types.
 */
declare function flip<E, S>(t: Task<E, S>): Task<S, E>

/**
 * Transforms the success value of the provided Task using the specified mapping function.
 * Functor implementation for Task.
 * @template E, S, T
 * @param {Task<E, S>} t - The Task to transform.
 * @param {(value: S) => T} mapFn - The mapping function.
 * @returns {Task<E, T>} - A new Task instance with the transformed value.
 */
declare function map<E, S, T>(t: Task<E, S>, mapFn: (value: S) => T): Task<E, T>

/**
 * Transforms the success value of the provided Task using the specified mapping function (curried version).
 * Functor implementation for Task.
 * @template S, T
 * @param {(value: S) => T} mapFn - The mapping function.
 * @returns {<E>(t: Task<E, S>) => Task<E, T>} - A function that takes a Task and returns a new Task instance with the transformed value.
 */
declare function map<S, T>(mapFn: (value: S) => T): <E>(t: Task<E, S>) => Task<E, T>

/**
 * Transforms the error value of the provided Task using the specified mapping function.
 * @template E, S, F
 * @param {Task<E, S>} t - The Task to transform.
 * @param {(value: E) => F} mapFn - The error mapping function.
 * @returns {Task<F, S>} - A new Task instance with the transformed error value.
 */
declare function rejectMap<E, S, F>(t: Task<E, S>, mapFn: (value: E) => F): Task<F, S>

/**
 * Transforms the error value of the provided Task using the specified mapping function (curried version).
 * @template E, F
 * @param {(value: E) => F} mapFn - The error mapping function.
 * @returns {<S>(e: Task<E, S>) => Task<F, S>} - A function that takes a Task and returns a new Task instance with the transformed error value.
 */
declare function rejectMap<E, F>(mapFn: (value: E) => F): <S>(e: Task<E, S>) => Task<F, S>

/**
 * Chains the provided Task with the result of the mapping function, creating a new Task.
 * Monad implementation for Task
 * @template E, S, F, T
 * @param {Task<E, S>} t - The Task to chain.
 * @param {(value: S) => Task<F, T>} mapFn - The mapping function.
 * @returns {Task<E | F, T>} - A new Task instance resulting from the chaining operation.
 */
declare function chain<E, S, F, T>(t: Task<E, S>, mapFn: (value: S) => Task<F, T>): Task<E | F, T>

/**
 * Chains the provided Task with the result of the mapping function, creating a new Task (curried version).
 * @template S, F, T
 * @param {(value: S) => Task<F, T>} mapFn - The mapping function.
 * @returns {<E>(t: Task<E, S>) => Task<E | F, T>} - A function that takes a Task and returns a new Task instance resulting from the chaining operation.
 */
declare function chain<S, F, T>(mapFn: (value: S) => Task<F, T>): <E>(t: Task<E, S>) => Task<E | F, T>

/**
 * Provides an alternative Task if the original Task fails, based on the specified mapping function.
 * Monad implementation for Task
 * @template E, S, F, T
 * @param {Task<E, S>} t - The original Task.
 * @param {(value: E) => Task<F, T>} mapFn - The mapping function for the alternative Task.
 * @returns {Task<F, S | T>} - A new Task instance with the alternative Task for failure scenarios.
 */
declare function orElse<E, S, F, T>(t: Task<E, S>, mapFn: (value: E) => Task<F, T>): Task<F, S | T>

/**
 * Provides an alternative Task if the original Task fails, based on the specified mapping function (curried version).
 * @template E, F, T
 * @param {(value: E) => Task<F, T>} mapFn - The mapping function for the alternative Task.
 * @returns {<S>(t: Task<E, S>) => Task<F, S | T>} - A function that takes a Task and returns a new Task instance with the alternative Task for failure scenarios.
 */
declare function orElse<E, F, T>(mapFn: (value: E) => Task<F, T>): <S>(t: Task<E, S>) => Task<F, S | T>

/**
 * Applies a side effect to the result of a Task without modifying the result.
 * Returns a new Task that resolves with the original result.
 * @param {Task<E, S>} t - The Task to tap into.
 * @param {((input: S) => Task<E, void>) | ((input: S) => void)} succFn - The function to apply as a side effect.
 * @returns {Task<E, S>} - A new Task that resolves with the original result.
 */
declare function tap<E, S>(t: Task<E, S>, succFn: ((input: S) => Task<E, void>) | ((input: S) => void)): Task<E, S>

/**
 * Applies a side effect to the result of a Task without modifying the result.
 * Returns a new Task that resolves with the original result (curried version).
 * @param {((input: S) => Task<E, void>) | ((input: S) => void)} succFn - The function to apply as a side effect.
 * @returns {(t: Task<E, S>) => Task<E, S>} - A new function that takes a Task and returns a new Task that resolves with the original result.
 */
declare function tap<E, S>(succFn: ((input: S) => Task<E, void>) | ((input: S) => void)): (t: Task<E, S>) => Task<E, S>

/**
 * Applies a side effect to the error of a Task without modifying the error.
 * Returns a new Task that rejects with the original error.
 * @param {Task<E, S>} e - The Task to tap into.
 * @param {((err: E) => void) | ((err: E) => Task<void, S>)} errFn - The function to apply as a side effect.
 * @returns {Task<E, S>} - A new Task that rejects with the original error.
 */
declare function rejectTap<E, S>(e: Task<E, S>, errFn: ((err: E) => void) | ((err: E) => Task<void, S>)): Task<E, S>

/**
 * Applies a side effect to the error of a Task without modifying the error.
 * Returns a new Task that rejects with the original error (curried version).
 * @param {((err: E) => void) | ((err: E) => Task<void, S>)} errFn - The function to apply as a side effect.
 * @returns {(t: Task<E, S>) => Task<E, S>} - A new function that takes a Task and returns a new Task that rejects with the original error.
 */
declare function rejectTap<E, S>(errFn: ((err: E) => void) | ((err: E) => Task<void, S>)): (t: Task<E, S>) => Task<E, S>

/**
 * Applies a function wrapped in a Task to the result of another Task.
 * Returns a new Task that resolves with the result of applying the function to the result of the other Task.
 * Applicative implementation for Task
 * @param {Task<E, (s: S) => T>} tFn - The Task that wraps a function.
 * @param {Task<E, S>} t - The Task whose result will be passed as an argument to the function.
 * @returns {Task<E, T>} - A new Task that resolves with the result of applying the function to the result of the other Task.
 */
declare function ap<E, S, F, T>(tFn: Task<E, (s: S) => T>, t: Task<E, S>): Task<E, T>

/**
 * Applies a function wrapped in a Task to the result of another Task.
 * Returns a new Task that resolves with the result of applying the function to the result of the other Task (curried version).
 * Applicative implementation for Task
 * @param {Task<E, S>} t - The Task whose result will be passed as an argument to the function.
 * @returns {<T>(tFn: Task<E, (s: S) => T>) => Task<E, T>} - A new function that takes a Task and returns a new Task that resolves with the result of applying the function to the result of the other Task.
 */
declare function ap<E, S>(t: Task<E, S>): <T>(tFn: Task<E, (s: S) => T>) => Task<E, T>

/**
 * Applies two functions to the result of a Task, depending on whether it resolves or rejects.
 * Returns a new Task that resolves with the result of applying the success function to the resolved value,
 * or rejects with the result of applying the error function to the rejected value.
 * @param {Task<E, S>} t - The Task to fold.
 * @param {(e: E) => F} fErr - The function to apply to the rejected value.
 * @param {(s: S) => T} fSucc - The function to apply to the resolved value.
 * @returns {Task<never, T | F>} - A new Task that resolves with the result of applying the success function to the resolved value,
 * or rejects with the result of applying the error function to the rejected value.
 */
declare function fold<E, S, F, T>(t: Task<E, S>, fErr: (e: E) => F, fSucc: (s: S) => T): Task<never, T | F>

/**
 * Applies two functions to the result of a Task, depending on whether it resolves or rejects.
 * Returns a new Task that resolves with the result of applying the success function to the resolved value,
 * or rejects with the result of applying the error function to the rejected value (curried version).
 * @param {(e: E) => F} fErr - The function to apply to the rejected value.
 * @param {(s: S) => T} fSucc - The function to apply to the resolved value.
 * @returns {(t: Task<E, S>) => Task<never, T | F>} - A new function that takes a Task and returns a new Task that resolves with the result of applying the success function to the resolved value,
 * or rejects with the result of applying the error function to the rejected value.
 */
declare function fold<E, S, F, T>(fErr: (e: E) => F, fSucc: (s: S) => T): (t: Task<E, S>) => Task<never, T | F>

/**
 * Executes a Task and provides separate error and success callbacks to handle the result.
 * @param {Task<E, S>} t - The Task to fork.
 * @param {(e: E) => void} fErr - The callback function to handle the error.
 * @param {(s: S) => void} fSucc - The callback function to handle the success.
 * @returns {void} - No return value.
 */
declare function fork<E, S>(t: Task<E, S>, fErr: (e: E) => void, fSucc: (s: S) => void): void

/**
 * Executes a Task and provides separate error and success callbacks to handle the result (curried version).
 * @param {(e: E) => void} fErr - The callback function to handle the error.
 * @param {(s: S) => void} fSucc - The callback function to handle the success.
 * @returns {(t: Task<E, S>) => void} - A new function that takes a Task and executes it, providing separate error and success callbacks to handle the result.
 */
declare function fork<E, S>(fErr: (e: E) => void, fSucc: (s: S) => void): (t: Task<E, S>) => void

/**
 * Converts a Task into a promise that resolves with the result of the Task.
 * @param {Task<E, S>} t - The Task to convert.
 * @returns {Promise<S>} - A promise that resolves with the result of the Task.
 */
declare function toPromise<E, S>(t: Task<E, S>): Promise<S>

// @ts-ignore
declare const Task = {
	create,
	of,
	rejected,
	fromTry,
	fromEither,
	fromLazyPromise,
	fromMaybe,
	flip,
	map,
	rejectMap,
	chain,
	orElse,
	tap,
	rejectTap,
	ap,
	fold,
	fork,
	toPromise,
}

export { Task }
