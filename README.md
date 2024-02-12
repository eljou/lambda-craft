<p align="center">
  <strong>Fast, modern, and practical utility library for FP in TypeScript.</strong>
</p>

## Features

- 👀 provides more readable code, due to the `data-first` approach
- ✨ supports `TypeScript`
- 🛡 helps you write safer code with `Maybe` and `Either` types
- 🎯 all functions return immutable data (no side-effects)
- 🌲 tree-shakeable

## Getting started

### Installation

```shell
yarn add lambda-craft
```

or with `npm`

```shell
npm install lambda-craft --save
```

### Usage

| Module          | Namespace | Description                                                                                             |
| --------------- | --------- | ------------------------------------------------------------------------------------------------------- |
| [Array]         | Arr       | Utility functions for `Array`.                                                                          |
| [Object (Dict)] | Dict      | Utility functions for `Object`.                                                                         |
| [Maybe]         | Maybe     | Functions for handling the `Maybe` data type that represents the existence and nonexistence of a value. |
| [Either]        | Either    | Functions for describing the `Either` of a certain operation without relying on exceptions.             |
| [Task]          | Task      | Functions for describing the asynchoronous operations.                                                  |

### Example

```typescript
import { pipe, Maybe, Arr } from 'lambda-craft'

const r = pipe(
  Arr.of(1, 2, 3, 4, 5), // -> [1,2,3,4,5]
  Arr.take(2),  // -> [1,2]
  Arr.find(n => n == 1), // -> Maybe(1)
  Maybe.map(n => n * 10), // -> Maybe(10)
  Maybe.getOrDefault<number>(5), // -> 10
)
```

## License

The MIT License.

See [LICENSE](LICENSE)
