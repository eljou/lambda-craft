export declare type ExtractValue<T> = Exclude<T, null | undefined>

export declare function pipe<A, B>(value: A, fn1: (arg: A) => B): B
export declare function pipe<A, B, C>(value: A, fn1: (arg: A) => B, fn2: (arg: B) => C): C
export declare function pipe<A, B, C, D>(value: A, fn1: (arg: A) => B, fn2: (arg: B) => C, fn3: (arg: C) => D): D
export declare function pipe<A, B, C, D, E>(value: A,fn1: (arg: A) => B, fn2: (arg: B) => C, fn3: (arg: C) => D, fn4: (arg: D) => E): E
export declare function pipe<A, B, C, D, E, F>(value: A, fn1: (arg: A) => B, fn2: (arg: B) => C, fn3: (arg: C) => D, fn4: (arg: D) => E, fn5: (arg: E) => F): F
export declare function pipe<A, B, C, D, E, F, G>(value: A, fn1: (arg: A) => B, fn2: (arg: B) => C, fn3: (arg: C) => D, fn4: (arg: D) => E, fn5: (arg: E) => F, fn6: (arg: F) => G): G
export declare function pipe<A, B, C, D, E, F, G, H>(value: A, fn1: (arg: A) => B, fn2: (arg: B) => C, fn3: (arg: C) => D, fn4: (arg: D) => E, fn5: (arg: E) => F, fn6: (arg: F) => G, fn7: (arg: G) => H): H
export declare function pipe<A, B, C, D, E, F, G, H, I>(value: A, fn1: (arg: A) => B, fn2: (arg: B) => C, fn3: (arg: C) => D, fn4: (arg: D) => E, fn5: (arg: E) => F, fn6: (arg: F) => G, fn7: (arg: G) => H, fn8: (arg: H) => I): I
export declare function pipe<A, B, C, D, E, F, G, H, I, J>(value: A, fn1: (arg: A) => B, fn2: (arg: B) => C, fn3: (arg: C) => D, fn4: (arg: D) => E, fn5: (arg: E) => F, fn6: (arg: F) => G, fn7: (arg: G) => H, fn8: (arg: H) => I, fn9: (arg: I) => J): J
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K>(value: A, fn1: (arg: A) => B, fn2: (arg: B) => C, fn3: (arg: C) => D, fn4: (arg: D) => E, fn5: (arg: E) => F, fn6: (arg: F) => G, fn7: (arg: G) => H, fn8: (arg: H) => I, fn9: (arg: I) => J, fn10: (arg: J) => K): K

/**
 * Performs left-to-right function composition and returns a new function, the first argument may have any arity, the remaining arguments must be unary.
 */
export declare function flow<A extends ReadonlyArray<unknown>, B>(fn1: (...args: A) => B): (...args: A) => B;
export declare function flow<A extends ReadonlyArray<unknown>, B, C>(fn1: (...args: A) => B, fn2: (arg: B) => C): (...args: A) => C;
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D>(fn1: (...args: A) => B, fn2: (arg: B) => C, fn3: (arg: C) => D): (...args: A) => D;
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E>(fn1: (...args: A) => B, fn2: (arg: B) => C, fn3: (arg: C) => D, fn4: (arg: D) => E): (...args: A) => E;
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F>(fn1: (...args: A) => B, fn2: (arg: B) => C, fn3: (arg: C) => D, fn4: (arg: D) => E, fn5: (arg: E) => F): (...args: A) => F;
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G>(fn1: (...args: A) => B, fn2: (arg: B) => C, fn3: (arg: C) => D, fn4: (arg: D) => E, fn5: (arg: E) => F, fn6: (arg: F) => G): (...args: A) => G;
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H>(fn1: (...args: A) => B, fn2: (arg: B) => C, fn3: (arg: C) => D, fn4: (arg: D) => E, fn5: (arg: E) => F, fn6: (arg: F) => G, fn7: (arg: G) => H): (...args: A) => H;
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I>(fn1: (...args: A) => B, fn2: (arg: B) => C, fn3: (arg: C) => D, fn4: (arg: D) => E, fn5: (arg: E) => F, fn6: (arg: F) => G, fn7: (arg: G) => H, fn8: (arg: H) => I): (...args: A) => I;
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I, J>(fn1: (...args: A) => B, fn2: (arg: B) => C, fn3: (arg: C) => D, fn4: (arg: D) => E, fn5: (arg: E) => F, fn6: (arg: F) => G, fn7: (arg: G) => H, fn8: (arg: H) => I, fn9: (arg: I) => J): (...args: A) => J;
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I, J, K>(fn1: (...args: A) => B, fn2: (arg: B) => C, fn3: (arg: C) => D, fn4: (arg: D) => E, fn5: (arg: E) => F, fn6: (arg: F) => G, fn7: (arg: G) => H, fn8: (arg: H) => I, fn9: (arg: I) => J,fn10: (arg: J) => K): (...args: A) => K;

export declare function idFn<T>(t: T): T