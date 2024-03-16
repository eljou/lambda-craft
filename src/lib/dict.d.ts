import { Maybe } from './maybe.js'
import { ExtractValue } from './utils.js'

/**
 * Creates an object from an array of key-value pairs.
 * @template T, K
 * @param {Array<readonly [K, T]>} xs - The array of key-value pairs.
 * @returns {Record<string, T>} - The resulting object.
 */
declare function fromPairs<T, K extends string | number>(xs: Array<readonly [K, T]>): Record<string, T>

/**
 * Checks if a given object is empty.
 * @template T
 * @param {T} dict - The object to be checked.
 * @returns {boolean} - True if the object is empty, false otherwise.
 */
declare function isEmpty<T extends Record<string, unknown>>(dict: T): boolean

/**
 * Retrieves the keys of a given object.
 * @template T
 * @param {T} dict - The object from which keys are to be retrieved.
 * @returns {Array<keyof T>} - An array containing the keys of the object.
 */
declare function keys<T extends Record<string, unknown>>(dict: T): Array<keyof T>

/**
 * Retrieves the values of a given object.
 * @template R
 * @param {Record<any, R>} dict - The object from which values are to be retrieved.
 * @returns {Array<R>} - An array containing the values of the object.
 */
declare function values<R>(dict: Record<any, R>): Array<R>

/**
 * Retrieves the value of a specified property from an object.
 * @template T, K
 * @param {T} dict - The object from which the property value is to be retrieved.
 * @param {K} key - The key of the property to retrieve.
 * @returns {T[K]} - The value of the specified property.
 */
declare function prop<T, K extends keyof T>(dict: T, key: K): T[K]

/**
 * Retrieves the value of a specified property from an object (curried version).
 * @template T, K
 * @param {K} key - The key of the property to retrieve.
 * @returns {(dict: T) => T[K]} - A function that retrieves the value of the specified property.
 */
declare function prop<T, K extends keyof T>(key: K): (dict: T) => T[K]

/**
 * Deletes a specified key from an object and returns a new object without the specified key.
 * @template T, K
 * @param {T} dict - The object from which the key is to be deleted.
 * @param {K} key - The key to be deleted.
 * @returns {Omit<T, K>} - A new object without the specified key.
 */
declare function deleteKey<T, K extends keyof T>(dict: T, key: K): Omit<T, K>

/**
 * Deletes a specified key from an object and returns a new object without the specified key (curried version).
 * @template T, K
 * @param {K} key - The key to be deleted.
 * @returns {(dict: T) => Omit<T, K>} - A function that deletes the specified key from an object and returns a new object without the key.
 */
declare function deleteKey<T, K extends keyof T>(key: K): (dict: T) => Omit<T, K>

/**
 * Deletes specified keys from an object and returns a new object without the specified keys.
 * @template T, K
 * @param {T} dict - The object from which the keys are to be deleted.
 * @param {ReadonlyArray<K>} keys - The keys to be deleted.
 * @returns {Omit<T, K>} - A new object without the specified keys.
 */
declare function deleteKeys<T, K extends keyof T>(dict: T, keys: ReadonlyArray<K>): Omit<T, K>

/**
 * Deletes specified keys from an object and returns a new object without the specified keys (curried version).
 * @template T, K
 * @param {ReadonlyArray<K>} keys - The keys to be deleted.
 * @returns {(dict: T) => Omit<T, K>} - A function that deletes the specified keys from an object and returns a new object without the keys.
 */
declare function deleteKeys<T, K extends keyof T>(keys: ReadonlyArray<K>): (dict: T) => Omit<T, K>

/**
 * Retrieves the value of a specified property from an object returning a Maybe.
 * @template T, K
 * @param {T} dict - The object from which the property value is to be retrieved.
 * @param {K} key - The key of the property to retrieve.
 * @returns {Maybe<ExtractValue<T[K]>>} - The value of the specified property.
 */
declare function get<T, K extends keyof T>(dict: T, key: K): Maybe<ExtractValue<T[K]>>

/**
 * Retrieves the value of a specified property from an object returning a Maybe (curried version).
 * @template T, K
 * @param {K} key - The key of the property to retrieve.
 * @returns {(dict: T) => Maybe<ExtractValue<T[K]>>} - A function that retrieves the value of the specified property.
 */
declare function get<T, K extends keyof T>(key: K): (dict: T) => Maybe<ExtractValue<T[K]>>

/**
 * Merges two objects together and returns a new object that contains all the properties from both objects.
 * @template A, B
 * @param {A} fst - The first object to merge.
 * @param {B} snd - The second object to merge.
 * @returns {A & B} - A new object that contains all the properties from both objects.
 */
declare function merge<A, B>(fst: A, snd: B): A & B

/**
 * Merges two objects together and returns a new object that contains all the properties from both objects (curried version).
 * @template A, B
 * @param {B} snd - The second object to merge.
 * @returns {(fst: A) => A & B} - A function that merges an object with another object and returns a new object that contains all the properties from both objects.
 */
declare function merge<A, B>(snd: B): (fst: A) => A & B

/**
 * Updates the value of a specified property in an object and returns a new object with the updated value.
 * @template T, K, R
 * @param {T} dict - The object in which the property value is to be updated.
 * @param {K} key - The key of the property to update.
 * @param {(value: Maybe<NonNullable<T[K]>>) => R} fn - The function that updates the property value.
 * @returns {T & Record<K, R>} - A new object with the updated property value.
 */
declare function update<T, K extends keyof T, R>(
	dict: T,
	key: K,
	fn: (value: Maybe<NonNullable<T[K]>>) => R,
): T & Record<K, R>

/**
 * Updates the value of a specified property in an object and returns a new object with the updated value (curried version).
 * @template T, K, R
 * @param {K} key - The key of the property to update.
 * @param {(value: Maybe<T[K]>) => R} fn - The function that updates the property value.
 * @returns {(dict: T) => T & Record<K, R>} - A function that updates the value of a specified property in an object and returns a new object with the updated value.
 */
declare function update<T, K extends keyof T, R>(key: K, fn: (value: Maybe<T[K]>) => R): (dict: T) => T & Record<K, R>

// @ts-ignore
declare const Dict = {
	get,
	deleteKey,
	deleteKeys,
	prop,
	fromPairs,
	isEmpty,
	keys,
	merge,
	values,
	update,
}

export { Dict }
