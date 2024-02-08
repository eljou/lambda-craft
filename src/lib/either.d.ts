import { ExtractValue } from './utils.js'
import { Maybe } from './maybe.js'
import { Task } from './task.js'

type Right<T> = { readonly value: NonNullable<T>; _tag: 'right' }
type Left<T> = { readonly value: NonNullable<T>; _tag: 'left' }
type Either<E, S> = Left<E> | Right<S>

declare const of: <E, S>(value: NonNullable<S>) => Either<E, S>
declare const right: <E, S>(value: NonNullable<S>) => Either<E, S>
declare const left: <E, S = unknown>(value: NonNullable<E>) => Either<E, S>

declare function isLeft<E, S>(e: Either<E, S>): e is Left<E>
declare function isRight<E, S>(e: Either<E, S>): e is Right<S>

declare function fromTry<E, S>(fn: () => S): Either<E, ExtractValue<S>>

declare function map<E, S, T>(e: Either<E, S>, mapFn: (value: S) => NonNullable<T>): Either<E, T>
declare function map<S, T>(mapFn: (value: S) => NonNullable<T>): <E>(e: Either<E, S>) => Either<E, T>

declare function leftMap<E, S, F>(e: Either<E, S>, mapFn: (value: E) => NonNullable<F>): Either<F, S>
declare function leftMap<E, F>(mapFn: (value: E) => NonNullable<F>): <S>(e: Either<E, S>) => Either<F, S>

declare function ap<E, S, T>(eFn: Either<E, (s: S) => T>, e: Either<E, S>): Either<E, T>
declare function ap<E, S>(e: Either<E, S>): <T>(eFn: Either<E, (s: S) => T>) => Either<E, T>

declare function chain<E, S, F, T>(e: Either<E, S>, mapFn: (value: S) => Either<F, T>): Either<E | F, T>
declare function chain<S, F, T>(mapFn: (value: S) => Either<F, T>): <E>(e: Either<E, S>) => Either<E | F, T>

declare function orElse<E, S, F, T>(e: Either<E, S>, mapFn: (value: E) => Either<F, T>): Either<F, S | T>
declare function orElse<E, F, T>(mapFn: (value: E) => Either<F, T>): <S>(e: Either<E, S>) => Either<F, S | T>

declare function match<E, S, T>(e: Either<E, S>, leftFn: (value: E) => T, rightFn: (value: S) => T): T
declare function match<E, S, T>(leftFn: (value: E) => T, rightFn: (value: S) => T): (e: Either<E, S>) => T

declare function tap<E, S>(e: Either<E, S>, rightFn: (value: S) => void): Either<E, S>
declare function tap<E, S>(rightFn: (value: S) => void): (e: Either<E, S>) => Either<E, S>

declare function leftTap<E, S>(e: Either<E, S>, leftFn: (err: E) => void): Either<E, S>
declare function leftTap<E, S>(leftFn: (err: E) => void): (e: Either<E, S>) => Either<E, S>

declare function flip<E, S>(e: Either<E, S>): Either<S, E>

declare function toNullable<E, S>(e: Either<E, S>): S | null

declare function toMaybe<E, S>(e: Either<E, S>): Maybe<S>

declare function toTask<E, S>(e: Either<E, S>): Task<E, S>

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
