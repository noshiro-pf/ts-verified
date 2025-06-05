# ts-verified

`ts-verified` is a TypeScript library providing a collection of type-safe utilities and verification tools. It aims to enhance development robustness, maintainability, and correctness by leveraging TypeScript's powerful type system.

## Features

This library offers a range of utilities, including:

- **Compile-Time Type Checking**: Assert type relationships at compile time with `expectType`.
- **Immutable Collections**: Type-safe and immutable map (`IMap`), set (`ISet`), and queue (`Queue`) implementations.
- **Array Utilities**: A comprehensive suite of functions for array manipulation, creation, transformation, and querying.
- **Number Utilities**: Safe and convenient functions for numerical operations, including branded types and range checking.
- **Object Utilities**: Helpers for working with objects, such as shallow equality checks.
- **Functional Programming Tools**: Utilities like `pipe`, `Optional`, and `Result` to support functional programming patterns.
- **Type Guards**: A collection of type guard functions to narrow down types safely.
- **JSON Handling**: Type-safe JSON parsing and stringification.
- **And more**: Including memoization, casting utilities, and other helpful tools.

## Installation

```bash
# npm
npm install ts-verified

# yarn
yarn add ts-verified

# pnpm
pnpm add ts-verified
```

**Important**: This library uses advanced TypeScript features, including branded types for enhanced type safety. Some functions require specific branded types as parameters (such as `Uint32` in `newArray`). The examples below use the small literal numeric values specifically allowed in each function for brevity, but in actual use you should use the provided type conversion functions (such as `asUint32`) or cast to the appropriate branded type, for example `as Uint32`.

## Usage Examples

Here are some examples of how to use utilities from `ts-verified`:

### 1. Compile-Time Type Assertions with `expectType`

The `expectType` utility allows you to make assertions about types at compile time. This is useful for ensuring type correctness in complex type manipulations or when refactoring.

```typescript
import { expectType } from 'ts-verified';

type User = { id: number; name: string };
type Admin = { id: number; name: string; role: 'admin' };

// Assert that Admin extends User
expectType<Admin, User>('<=');

// Assert that User does not extend Admin
expectType<User, Admin>('!<=');

// Assert exact type equality
expectType<{ x: number }, { x: number }>('=');

// The following would cause a compile-time error:
// expectType<User, Admin>("="); // Error: Type 'User' is not strictly equal to type 'Admin'.
```

### 2. Number Utilities with `Num`

The `Num` object provides safe and convenient functions for numerical operations.

```typescript
import { Num } from 'ts-verified';

// Basic conversions
const num = Num.from('123'); // 123
const invalid = Num.from('abc'); // NaN

// Range checking
const inRange = Num.isInRange(0, 10);
console.log(inRange(5)); // true
console.log(inRange(0)); // true (inclusive lower bound)
console.log(inRange(10)); // false (exclusive upper bound)

// Clamping values
const clamp = Num.clamp(0, 100);
console.log(clamp(150)); // 100
console.log(clamp(-10)); // 0

// Rounding utilities
const round2 = Num.round(2);
console.log(round2(3.14159)); // 3.14

console.log(Num.roundAt(3.14159, 3)); // 3.142
console.log(Num.roundToInt(3.7)); // 4

// Type guards
declare const value: number;
if (Num.isNonZero(value)) {
    // value is guaranteed to be non-zero
    const result = Num.div(10, value); // Safe division
}
```

### 3. Array Utilities with `Arr`

The `Arr` object provides a rich set of functions for array manipulation.

```typescript
import { Arr } from 'ts-verified';

const numbers = [1, 2, 3, 4, 5];

// Reduction
const sum = Arr.reduce(numbers, (acc, n) => acc + n, 0);
console.log(sum); // 15

// Array creation
const zeros = Arr.zeros(5); // [0, 0, 0, 0, 0]
const range = Arr.range(1, 4); // [1, 2, 3]
```

### 4. Functional Programming with `Optional` and `Result`

Handle nullable values and error-prone operations safely.

```typescript
import { Optional, Result, pipe } from 'ts-verified';

// Optional for nullable values
const maybeValue = Optional.some(42);
const nothing = Optional.none;

const doubled = Optional.map(maybeValue, (x) => x * 2);
console.log(Optional.unwrapOr(doubled, 0)); // 84

// Result for error handling
const success = Result.ok(42);
const failure = Result.err('Something went wrong');

const mapped = Result.map(success, (x) => x * 2);
if (Result.isOk(mapped)) {
    console.log(mapped.value); // 84
}

// Combine with pipe for fluent API
const result = pipe(Optional.some(10))
    .mapOptional((x) => x * 2)
    .mapOptional((x) => x + 1).value; // Optional.some(21)
```

### 5. Immutable Collections: `IMap` and `ISet`

Type-safe, immutable data structures.

```typescript
import { IMap, ISet } from 'ts-verified';

// IMap usage
let myMap = IMap.new<string, number>([]);
myMap = myMap.set('one', 1);
myMap = myMap.set('two', 2);

console.log(myMap.get('one')); // Optional.some(1)
console.log(myMap.has('three')); // false

// ISet usage
let mySet = ISet.new<number>([]);
mySet = mySet.add(1);
mySet = mySet.add(2);
mySet = mySet.add(1); // Duplicate ignored

console.log(mySet.has(1)); // true
console.log(mySet.size); // 2
```

### 6. Type Guards

Safe type narrowing with comprehensive type guards.

```typescript
import { isNonNullObject, isRecord, hasKey } from 'ts-verified';

function processData(data: unknown) {
    if (isRecord(data)) {
        // data is now Record<string, unknown>
        if (hasKey(data, 'name') && typeof data.name === 'string') {
            console.log(`Hello, ${data.name}!`);
        }
    }
}

// Non-null object checking
declare const value: unknown;
if (isNonNullObject(value)) {
    // value is guaranteed to be a non-null object
    console.log(Object.keys(value));
}
```

## Modules Overview

- **`array`**: Utilities for working with arrays and tuples, including creation, transformation, and type-safe operations.
- **`collections`**: Immutable data structures like `IMap`, `ISet`, and `Queue` with full type safety.
- **`expect-type`**: Compile-time type assertion utilities for testing and verification.
- **`functional`**: Functional programming helpers like `Optional`, `Result`, `pipe`, and `match`.
- **`guard`**: Type guard functions for safe type narrowing (e.g., `isNonNullObject`, `isRecord`).
- **`iterator`**: Utilities for working with iterators and generators (e.g., `range`).
- **`json`**: Type-safe JSON parsing and stringification utilities.
- **`num`**: Comprehensive numerical utilities including branded types, range checking, and safe arithmetic.
- **`others`**: Miscellaneous utilities like `castMutable`, `castReadonly`, `ifThen`, `mapNullable`, `memoizeFunction`, `tuple`, `unknownToString`.
- **`record`**: Utilities for working with records/objects (e.g., `Obj.shallowEq`).

## Key Benefits

- **Type Safety**: All utilities are designed with TypeScript's type system in mind, providing compile-time guarantees.
- **Immutability**: Data structures and operations promote immutable patterns for safer, more predictable code.
- **Functional Programming**: Support for functional programming paradigms with utilities like `Optional`, `Result`, and `pipe`.
- **Zero Runtime Dependencies**: The library has no external runtime dependencies, keeping your bundle size minimal.
- **Comprehensive Testing**: All utilities are thoroughly tested with both runtime and compile-time tests.

## Contributing

Contributions are welcome! Please refer to the contribution guidelines (TODO: create CONTRIBUTING.md).

## License

This project is licensed under the (TODO: Choose a License, e.g., MIT License).
