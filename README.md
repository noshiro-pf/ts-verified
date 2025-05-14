# ts-verified

`ts-verified` is a TypeScript library providing a collection of type-safe utilities and verification tools. It aims to enhance development robustness, maintainability, and correctness by leveraging TypeScript's powerful type system.

## Features

This library offers a range of utilities, including:

- **Compile-Time Type Checking**: Assert type relationships at compile time with `expectType`.
- **Immutable Collections**: Type-safe and immutable map (`IMap`), set (`ISet`), and queue (`Queue`) implementations.
- **Array Utilities**: A comprehensive suite of functions for array manipulation, creation, transformation, and querying.
- **Number Utilities**: Safe and convenient functions for numerical operations.
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

_(Note: Adjust installation instructions based on how the package will be published.)_

## Usage Examples

Here are some examples of how to use utilities from `ts-verified`:

### 1. Compile-Time Type Assertions with `expectType`

The `expectType` utility allows you to make assertions about types at compile time. This is useful for ensuring type correctness in complex type manipulations or when refactoring.

```typescript
// filepath: /home/noshiro/repos/ts-verified/examples/expect-type-example.mts
import { expectType } from 'ts-verified/expect-type'; // Adjust import path as needed

type User = { id: number; name: string };
type Admin = { id: number; name: string; role: 'admin' };

let user: User = { id: 1, name: 'Alice' };
let admin: Admin = { id: 2, name: 'Bob', role: 'admin' };

// Assert that Admin extends User
expectType<Admin, User>('<=');

// Assert that User does not extend Admin
expectType<User, Admin>('!<=');

// Assert that a specific object literal matches a type
expectType<{ x: number }, { x: number }>('=');

// The following would cause a compile-time error if uncommented:
// expectType<User, Admin>("="); // Error: Type 'User' is not strictly equal to type 'Admin'.
```

### 2. Number Utilities with `Num`

The `Num` object provides safe and convenient functions for numerical operations.

```typescript
// filepath: /home/noshiro/repos/ts-verified/examples/num-example.mts
import { Num } from 'ts-verified/num'; // Adjust import path as needed

const a = 5;
const b = 10;

const sum = Num.sum([a, b, 15]);
console.log(sum); // Output: 30

const incremented = Num.increment(a);
console.log(incremented); // Output: 6

const product = Num.product([2, 3, 4]);
console.log(product); // Output: 24

// Safe parsing
const parsed = Num.fromStringToInteger('123');
if (parsed.ok) {
    console.log(parsed.value); // Output: 123
}

const invalidParse = Num.fromStringToInteger('abc');
if (invalidParse.err) {
    console.log(invalidParse.error); // Output: "Failed to parse 'abc' as an integer."
}
```

### 3. Object Utilities with `Obj`

The `Obj` object provides helpers for working with objects, such as `shallowEq` for comparing two objects by their top-level properties.

```typescript
// filepath: /home/noshiro/repos/ts-verified/examples/obj-example.mts
import { Obj } from 'ts-verified/record'; // Adjust import path as needed

const obj1 = { a: 1, b: 'hello' };
const obj2 = { a: 1, b: 'hello' };
const obj3 = { a: 1, b: 'world' };
const obj4 = { a: 1, b: 'hello', c: true };

console.log(Obj.shallowEq(obj1, obj2)); // Output: true
console.log(Obj.shallowEq(obj1, obj3)); // Output: false
console.log(Obj.shallowEq(obj1, obj4)); // Output: false

// Example with different number of keys
const obj5 = { a: 1 };
console.log(Obj.shallowEq(obj1, obj5)); // Output: false
```

### 4. Array Utilities with `Arr`

The `Arr` object (from `array-utils`) provides a rich set of functions for array manipulation.

```typescript
import { Arr } from 'ts-verified'; // Adjust import path as needed

const numbers = [1, 2, 3, 4, 5];

const doubled = Arr.map(numbers, (n) => n * 2);
console.log(doubled); // Output: [2, 4, 6, 8, 10]

const evens = Arr.filter(numbers, (n) => n % 2 === 0);
console.log(evens); // Output: [2, 4]

const firstEven = Arr.find(numbers, (n) => n % 2 === 0);
console.log(firstEven); // Output: Optional.some(2)

const sumOfNumbers = Arr.reduce(numbers, (acc, n) => acc + n, 0);
console.log(sumOfNumbers); // Output: 15

const uniqueNumbers = Arr.uniq([1, 2, 2, 3, 1, 4]);
console.log(uniqueNumbers); // Output: [1, 2, 3, 4] (order might vary for non-primitive types if custom equality is not used)
```

### 5. Immutable Collections: `IMap`

`IMap` provides a type-safe, immutable map implementation.

```typescript
import { IMap } from 'ts-verified';

// Create a new IMap
let myMap = IMap.new<string, number>();

// Set key-value pairs (returns a new IMap)
myMap = IMap.set(myMap, 'one', 1);
myMap = IMap.set(myMap, 'two', 2);
myMap = IMap.set(myMap, 'three', 3);

console.log(IMap.get(myMap, 'two')); // Output: Optional.some(2)
console.log(IMap.get(myMap, 'four')); // Output: Optional.none()

console.log(IMap.has(myMap, 'one')); // Output: true

// Iterate over entries
for (const [key, value] of IMap.entries(myMap)) {
    console.log(`${key}: ${value}`);
}
// Output:
// one: 1
// two: 2
// three: 3

const updatedMap = IMap.set(myMap, 'one', 100);
console.log(IMap.get(myMap, 'one')); // Output: Optional.some(1) (original map is unchanged)
console.log(IMap.get(updatedMap, 'one')); // Output: Optional.some(100)

const removedMap = IMap.remove(updatedMap, 'two');
console.log(IMap.has(removedMap, 'two')); // Output: false
console.log(IMap.size(removedMap)); // Output: 2
```

## Modules Overview

- **`array`**: Utilities for working with arrays and tuples.
- **`collections`**: Immutable data structures like `IMap`, `ISet`, and `Queue`.
- **`expect-type`**: Compile-time type assertion utilities.
- **`functional`**: Functional programming helpers like `Optional`, `Result`, `pipe`, `match`.
- **`guard`**: Type guard functions (e.g., `isNonNullObject`).
- **`iterator`**: Utilities for working with iterators (e.g., `range`).
- **`json`**: Type-safe JSON parsing and stringification.
- **`num`**: Utilities for numerical operations.
- **`others`**: Miscellaneous utilities like `castMutable`, `castReadonly`, `ifThen`, `mapNullable`, `memoizeFunction`, `tuple`, `unknownToString`.
- **`record`**: Utilities for working with records/objects (e.g., `Obj.shallowEq`).

## Contributing

Contributions are welcome! Please refer to the contribution guidelines (TODO: create CONTRIBUTING.md).

## License

This project is licensed under the (TODO: Choose a License, e.g., MIT License).

````<!-- filepath: /home/noshiro/repos/ts-verified/README.md -->
# ts-verified

`ts-verified` is a TypeScript library providing a collection of type-safe utilities and verification tools. It aims to enhance development robustness, maintainability, and correctness by leveraging TypeScript's powerful type system.

## Features

This library offers a range of utilities, including:

*   **Compile-Time Type Checking**: Assert type relationships at compile time with `expectType`.
*   **Immutable Collections**: Type-safe and immutable map (`IMap`), set (`ISet`), and queue (`Queue`) implementations.
*   **Array Utilities**: A comprehensive suite of functions for array manipulation, creation, transformation, and querying.
*   **Number Utilities**: Safe and convenient functions for numerical operations.
*   **Object Utilities**: Helpers for working with objects, such as shallow equality checks.
*   **Functional Programming Tools**: Utilities like `pipe`, `Optional`, and `Result` to support functional programming patterns.
*   **Type Guards**: A collection of type guard functions to narrow down types safely.
*   **JSON Handling**: Type-safe JSON parsing and stringification.
*   **And more**: Including memoization, casting utilities, and other helpful tools.

## Installation

```bash
# npm
npm install ts-verified

# yarn
yarn add ts-verified

# pnpm
pnpm add ts-verified
````

_(Note: Adjust installation instructions based on how the package will be published.)_

## Usage Examples

Here are some examples of how to use utilities from `ts-verified`:

### 1. Compile-Time Type Assertions with `expectType`

The `expectType` utility allows you to make assertions about types at compile time. This is useful for ensuring type correctness in complex type manipulations or when refactoring.

```typescript
// filepath: /home/noshiro/repos/ts-verified/examples/expect-type-example.mts
import { expectType } from 'ts-verified/expect-type'; // Adjust import path as needed

type User = { id: number; name: string };
type Admin = { id: number; name: string; role: 'admin' };

let user: User = { id: 1, name: 'Alice' };
let admin: Admin = { id: 2, name: 'Bob', role: 'admin' };

// Assert that Admin extends User
expectType<Admin, User>('<=');

// Assert that User does not extend Admin
expectType<User, Admin>('!<=');

// Assert that a specific object literal matches a type
expectType<{ x: number }, { x: number }>('=');

// The following would cause a compile-time error if uncommented:
// expectType<User, Admin>("="); // Error: Type 'User' is not strictly equal to type 'Admin'.
```

### 2. Number Utilities with `Num`

The `Num` object provides safe and convenient functions for numerical operations.

```typescript
// filepath: /home/noshiro/repos/ts-verified/examples/num-example.mts
import { Num } from 'ts-verified/num'; // Adjust import path as needed

const a = 5;
const b = 10;

const sum = Num.sum([a, b, 15]);
console.log(sum); // Output: 30

const incremented = Num.increment(a);
console.log(incremented); // Output: 6

const product = Num.product([2, 3, 4]);
console.log(product); // Output: 24

// Safe parsing
const parsed = Num.fromStringToInteger('123');
if (parsed.ok) {
    console.log(parsed.value); // Output: 123
}

const invalidParse = Num.fromStringToInteger('abc');
if (invalidParse.err) {
    console.log(invalidParse.error); // Output: "Failed to parse 'abc' as an integer."
}
```

### 3. Object Utilities with `Obj`

The `Obj` object provides helpers for working with objects, such as `shallowEq` for comparing two objects by their top-level properties.

```typescript
// filepath: /home/noshiro/repos/ts-verified/examples/obj-example.mts
import { Obj } from 'ts-verified/record'; // Adjust import path as needed

const obj1 = { a: 1, b: 'hello' };
const obj2 = { a: 1, b: 'hello' };
const obj3 = { a: 1, b: 'world' };
const obj4 = { a: 1, b: 'hello', c: true };

console.log(Obj.shallowEq(obj1, obj2)); // Output: true
console.log(Obj.shallowEq(obj1, obj3)); // Output: false
console.log(Obj.shallowEq(obj1, obj4)); // Output: false

// Example with different number of keys
const obj5 = { a: 1 };
console.log(Obj.shallowEq(obj1, obj5)); // Output: false
```

### 4. Array Utilities with `Arr`

The `Arr` object (from `array-utils`) provides a rich set of functions for array manipulation.

```typescript
// filepath: /home/noshiro/repos/ts-verified/examples/arr-example.mts
import { Arr } from 'ts-verified/array'; // Adjust import path as needed

const numbers = [1, 2, 3, 4, 5];

const doubled = Arr.map(numbers, (n) => n * 2);
console.log(doubled); // Output: [2, 4, 6, 8, 10]

const evens = Arr.filter(numbers, (n) => n % 2 === 0);
console.log(evens); // Output: [2, 4]

const firstEven = Arr.find(numbers, (n) => n % 2 === 0);
console.log(firstEven); // Output: Optional.some(2)

const sumOfNumbers = Arr.reduce(numbers, (acc, n) => acc + n, 0);
console.log(sumOfNumbers); // Output: 15

const uniqueNumbers = Arr.uniq([1, 2, 2, 3, 1, 4]);
console.log(uniqueNumbers); // Output: [1, 2, 3, 4] (order might vary for non-primitive types if custom equality is not used)
```

### 5. Immutable Collections: `IMap`

`IMap` provides a type-safe, immutable map implementation.

```typescript
// filepath: /home/noshiro/repos/ts-verified/examples/imap-example.mts
import { IMap } from 'ts-verified/collections'; // Adjust import path as needed

// Create a new IMap
let myMap = IMap.new<string, number>();

// Set key-value pairs (returns a new IMap)
myMap = IMap.set(myMap, 'one', 1);
myMap = IMap.set(myMap, 'two', 2);
myMap = IMap.set(myMap, 'three', 3);

console.log(IMap.get(myMap, 'two')); // Output: Optional.some(2)
console.log(IMap.get(myMap, 'four')); // Output: Optional.none()

console.log(IMap.has(myMap, 'one')); // Output: true

// Iterate over entries
for (const [key, value] of IMap.entries(myMap)) {
    console.log(`${key}: ${value}`);
}
// Output:
// one: 1
// two: 2
// three: 3

const updatedMap = IMap.set(myMap, 'one', 100);
console.log(IMap.get(myMap, 'one')); // Output: Optional.some(1) (original map is unchanged)
console.log(IMap.get(updatedMap, 'one')); // Output: Optional.some(100)

const removedMap = IMap.remove(updatedMap, 'two');
console.log(IMap.has(removedMap, 'two')); // Output: false
console.log(IMap.size(removedMap)); // Output: 2
```

## Modules Overview

- **`array`**: Utilities for working with arrays and tuples.
- **`collections`**: Immutable data structures like `IMap`, `ISet`, and `Queue`.
- **`expect-type`**: Compile-time type assertion utilities.
- **`functional`**: Functional programming helpers like `Optional`, `Result`, `pipe`, `match`.
- **`guard`**: Type guard functions (e.g., `isNonNullObject`).
- **`iterator`**: Utilities for working with iterators (e.g., `range`).
- **`json`**: Type-safe JSON parsing and stringification.
- **`num`**: Utilities for numerical operations.
- **`others`**: Miscellaneous utilities like `castMutable`, `castReadonly`, `ifThen`, `mapNullable`, `memoizeFunction`, `tuple`, `unknownToString`.
- **`record`**: Utilities for working with records/objects (e.g., `Obj.shallowEq`).

## Contributing

Contributions are welcome! Please refer to the contribution guidelines (TODO: create CONTRIBUTING.md).

## License

This project is licensed under the (TODO: Choose a License, e.g., MIT License).
