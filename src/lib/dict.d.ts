import { Maybe } from './maybe'
import { ExtractValue } from './utils'

declare function fromPairs<T, K extends string | number>(xs: Array<readonly [K, T]>): Record<string, T>

declare function isEmpty<T extends Record<string, unknown>>(dict: T): boolean

declare function keys<T extends Record<string, unknown>>(dict: T): Array<keyof T>

declare function values<R>(dict: Record<any, R>): Array<R>

declare function prop<T, K extends keyof T>(dict: T, key: K): T[K]
declare function prop<T, K extends keyof T>(key: K): (dict: T) => T[K]

declare function deleteKey<T, K extends keyof T>(dict: T, key: K): Omit<T, K>
declare function deleteKey<T, K extends keyof T>(key: K): (dict: T) => Omit<T, K>

declare function deleteKeys<T, K extends keyof T>(dict: T, keys: ReadonlyArray<K>): Omit<T, K>
declare function deleteKeys<T, K extends keyof T>(keys: ReadonlyArray<K>): (dict: T) => Omit<T, K>

declare function get<T, K extends keyof T>(dict: T, key: K): Maybe<ExtractValue<T[K]>>
declare function get<T, K extends keyof T>(key: K): (dict: T) => Maybe<ExtractValue<T[K]>>

declare function merge<A, B>(fst: A, snd: B): A & B
declare function merge<A, B>(snd: B): (fst: A) => A & B

declare function update<T, K extends keyof T, R>(dict: T, key: K, fn: (value: Maybe<NonNullable<T[K]>>) => R): T & Record<K, R>
declare function update<T, K extends keyof T, R>(key: K, fn: (value: Maybe<T[K]>) => R): (dict: T) => T & Record<K, R>

// @ts-ignore
declare const Dict = { get, deleteKey, deleteKeys, prop, fromPairs, isEmpty, keys, merge, values, update }

export { Dict }
