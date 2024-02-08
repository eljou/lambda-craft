import { Maybe } from './maybe.js'
import { Either } from './either.js'

declare type Task<E, S> = { fork: (rej: (e: E) => void, res: (r: S) => void) => void }

declare function create<E, S>(fork: (rej: (e: E) => void, res: (t: S) => void) => void): Task<E, S>
declare function of<E, S>(value: S): Task<E, S>
declare function rejected<E, S = unknown>(err: E): Task<E, S>
declare function fromTry<E, S>(f: () => S): Task<E, S>
declare function fromLazyPromise<E, S>(f: () => Promise<S>): Task<E, S>
declare function fromEither<E, S>(either: Either<E, S>): Task<E, S>

declare function fromMaybe<E, S>(mb: Maybe<S>, orErr: E): Task<E, S>
declare function fromMaybe<E>(orErr: E): <S>(mb: Maybe<S>) => Task<E, S>

declare function flip<E, S>(t: Task<E, S>): Task<S, E>

declare function map<E, S, T>(t: Task<E, S>, mapFn: (value: S) => T): Task<E, T>
declare function map<S, T>(mapFn: (value: S) => T): <E>(t: Task<E, S>) => Task<E, T>

declare function rejectMap<E, S, F>(t: Task<E, S>, mapFn: (value: E) => F): Task<F, S>
declare function rejectMap<E, F>(mapFn: (value: E) => F): <S>(e: Task<E, S>) => Task<F, S>

declare function chain<E, S, F, T>(t: Task<E, S>, mapFn: (value: S) => Task<F, T>): Task<E | F, T>
declare function chain<S, F, T>(mapFn: (value: S) => Task<F, T>): <E>(t: Task<E, S>) => Task<E | F, T>

declare function orElse<E, S, F, T>(t: Task<E, S>, mapFn: (value: E) => Task<F, T>): Task<F, S | T>
declare function orElse<E, F, T>(mapFn: (value: E) => Task<F, T>): <S>(t: Task<E, S>) => Task<F, S | T>

declare function tap<E, S>(t: Task<E, S>, succFn: ((input: S) => Task<E, void>) | ((input: S) => void)): Task<E, S>
declare function tap<E, S>(succFn: ((input: S) => Task<E, void>) | ((input: S) => void)): (t: Task<E, S>) => Task<E, S>

declare function rejectTap<E, S>(e: Task<E, S>, errFn: ((err: E) => void) | ((err: E) => Task<void, S>)): Task<E, S>
declare function rejectTap<E, S>(errFn: ((err: E) => void) | ((err: E) => Task<void, S>)): (t: Task<E, S>) => Task<E, S>

declare function ap<E, S, F, T>(tFn: Task<E, (s: S) => T>, t: Task<E, S>): Task<E, T>
declare function ap<E, S>(t: Task<E, S>): <T>(tFn: Task<E, (s: S) => T>) => Task<E, T>

declare function fold<E, S, F, T>(t: Task<E, S>, fErr: (e: E) => F, fSucc: (s: S) => T): Task<never, T | F>
declare function fold<E, S, F, T>(fErr: (e: E) => F, fSucc: (s: S) => T): (t: Task<E, S>) => Task<never, T | F>

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
  toPromise,
}

export { Task }
