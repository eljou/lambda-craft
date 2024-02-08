import { Maybe } from './maybe'
import { Either } from './either'
import { Task } from './task'

declare function of<T>(...args: T[]): T[]

declare function make<A>(n: number, element: A): A[]
declare function make<A>(element: A): (n: number) => A[]

declare function makeWithIndex<A>(n: number, mapFn: (idx: number) => A): A[]
declare function makeWithIndex<A>(mapFn: (idx: number) => A): (n: number) => A[]

declare function isEmpty<A>(arr: A[]): boolean

declare function size<T>(list: T[]): number

declare function head<T>(arr: T[]): Maybe<T>
declare function headOrNull<T>(arr: T[]): T | undefined

declare function tail<T>(arr: T[]): T[]

declare function all<A>(arr: A[], predicateFn: (item: A) => boolean): boolean
declare function all<A>(predicateFn: (item: A) => boolean): (arr: A[]) => boolean

declare function any<A>(arr: A[], predicateFn: (item: A) => boolean): boolean
declare function any<A>(predicateFn: (item: A) => boolean): (arr: A[]) => boolean

declare function some<T>(list: T[], predicate: (val: T) => boolean): boolean
declare function some<T>(predicate: (val: T) => boolean): (list: T[]) => boolean

declare function find<T>(list: T[], predicate: (val: T) => boolean): Maybe<T>
declare function find<T>(predicate: (val: T) => boolean): (list: T[]) => Maybe<T>

declare function findOrNull<T>(list: T[], predicate: (val: T) => boolean): T | null
declare function findOrNull<T>(predicate: (val: T) => boolean): (list: T[]) => T | null

declare function at<T>(list: T[], i: number): Maybe<T>
declare function at<T>(i: number): (list: T[]) => Maybe<T>

declare function atOrNull<T>(list: T[], i: number): T | null
declare function atOrNull<T>(i: number): (list: T[]) => T | null

declare function removeAt<A>(arr: A[], index: number): A[]
declare function removeAt<A>(index: number): (arr: A[]) => A[]

declare function take<A>(arr: A[], n: number): A[]
declare function take<A>(n: number): (arr: A[]) => A[]

declare function reverse<T>(arr: T[]): T[]

declare function cons<T>(arr: T[], item: T): T[]
declare function cons<T>(item: T): (arr: T[]) => T[]

declare function snoc<T>(arr: T[], item: T): T[]
declare function snoc<T>(item: T): (arr: T[]) => T[]

declare function concat<T>(arrA: T[], arrB: T[]): T[]
declare function concat<T>(arrB: T[]): (arrA: T[]) => T[]

declare function groupBy<A extends object, B extends keyof A>(
  arr: A[],
  groupFn: (item: A) => A[B],
): Partial<Record<PropertyKey, readonly [A, ...A[]]>>
declare function groupBy<A extends object, B extends keyof A>(
  groupFn: (item: A) => A[B],
): (arr: A[]) => Partial<Record<PropertyKey, readonly [A, ...A[]]>>

declare function forEach<A, B>(arr: A[], fn: (value: A) => void): void
declare function forEach<A, B>(fn: (value: A) => void): (arr: A[]) => void
declare function forEachIndexed<A, B>(arr: A[], fn: (value: A, index: number) => void): void
declare function forEachIndexed<A, B>(fn: (value: A, index: number) => void): (arr: A[]) => void

declare function map<A, B>(arr: A[], mapFn: (value: A) => B): B[]
declare function map<A, B>(mapFn: (value: A) => B): (arr: A[]) => B[]
declare function mapIndexed<A, B>(arr: A[], mapFn: (value: A, index: number) => B): B[]
declare function mapIndexed<A, B>(mapFn: (value: A, index: number) => B): (arr: A[]) => B[]

declare function filter<A>(arr: A[], predicateFn: (value: A) => boolean): A[]
declare function filter<A>(predicateFn: (value: A) => boolean): (arr: A[]) => A[]
declare function filterIndexed<A>(arr: A[], predicateFn: (value: A, index: number) => boolean): A[]
declare function filterIndexed<A>(predicateFn: (value: A, index: number) => boolean): (arr: A[]) => A[]

declare function chain<T, U>(arr: T[], fn: (item: T) => U[]): U[]
declare function chain<T, U>(fn: (item: T) => U[]): (arr: T[]) => U[]
declare function chainIndexed<T, U>(arr: T[], fn: (item: T, index: number) => U[]): U[]
declare function chainIndexed<T, U>(fn: (item: T, index: number) => U[]): (arr: T[]) => U[]

declare function fold<A, B>(arr: A[], fn: (prev: B, item: A) => B, init: B): B
declare function fold<A, B>(fn: (prev: B, item: A) => B, init: B): (arr: A[]) => B
declare function foldIndexed<A, B>(arr: A[], fn: (prev: B, item: A, index: number) => B, init: B): B
declare function foldIndexed<A, B>(fn: (prev: B, item: A, index: number) => B, init: B): (arr: A[]) => B

declare function ap<T, U>(fns: ((item: T) => U)[], list: T[]): U[]
declare function ap<T>(list: T[]): <U>(fns: ((item: T) => U)[]) => U[]

declare function sequenceMaybe<A>(maybeArr: Maybe<A>[]): Maybe<A[]>
declare function traverseMaybe<A, B>(arr: A[], f: (item: A) => Maybe<B>): Maybe<B[]>
declare function traverseMaybe<A, B>(f: (item: A) => Maybe<B>): (arr: A[]) => Maybe<B[]>

declare function sequenceEither<E, A>(eitherArr: Either<E, A>[]): Either<E, A[]>
declare function traverseEither<E, S, T>(arr: S[], f: (item: S) => Either<E, T>): Either<E, T[]>
declare function traverseEither<E, S, T>(f: (item: S) => Either<E, T>): (arr: S[]) => Either<E, T[]>

declare function sequenceTask<E, A>(taskArr: Task<E, A>[]): Task<E, A[]>
declare function traverseTaskA<E, S, T>(arr: S[], f: (item: S) => Task<E, T>): Task<E, T[]>
declare function traverseTaskA<E, S, T>(f: (item: S) => Task<E, T>): (arr: S[]) => Task<E, T[]>
declare function traverseTaskM<E, S, T>(arr: S[], f: (item: S) => Task<E, T>): Task<E, T[]>
declare function traverseTaskM<E, S, T>(f: (item: S) => Task<E, T>): (arr: S[]) => Task<E, T[]>

// @ts-ignore
declare const Arr = {
  of,
  make,
  makeWithIndex,
  isEmpty,
  size,
  head,
  headOrNull,
  tail,
  all,
  any,
  some,
  find,
  findOrNull,
  at,
  atOrNull,
  removeAt,
  take,
  reverse,
  cons,
  snoc,
  concat,
  groupBy,
  forEach,
  forEachIndexed,
  map,
  mapIndexed,
  filter,
  filterIndexed,
  chain,
  chainIndexed,
  fold,
  foldIndexed,
  sequenceMaybe,
  sequenceEither,
  sequenceTask,
  traverseMaybe,
  traverseEither,
  traverseTaskA,
  traverseTaskM,
  ap,
}

export { Arr }
