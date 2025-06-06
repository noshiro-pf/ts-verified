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
console.log(Num.roundToInt(3.7) satisfies Int); // 4

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

const numbers = [1, 2, 3, 4, 5, 2, 3] as const;
const people = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 35 },
] as const;

// Reduction
const sum = Arr.sum(numbers);
console.log(sum); // 20

// Array creation
const zeros = Arr.zeros(5); // [0, 0, 0, 0, 0]
const range = Arr.range(1, 4); // [1, 2, 3]

// Type-safe length checking
if (Arr.isArrayAtLeastLength(numbers, 3)) {
    // numbers is now guaranteed to have at least 3 elements
    console.log(numbers[2]); // Safe access to index 2
}

// Take first n elements
const firstThree = Arr.take(numbers, 3); // [1, 2, 3]

// Find maximum by property
const oldestPerson = Arr.maxBy(people, (person) => person.age);
console.log(oldestPerson?.name); // 'Charlie'

// Remove duplicates
const unique = Arr.uniq(numbers); // [1, 2, 3, 4, 5]
```

### 4. Functional Programming with `Optional`, `Result`, `pipe`, and `match`

Handle nullable values and error-prone operations safely.

```typescript
import { Optional, Result, pipe, match } from 'ts-verified';

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

// Advanced pipe usage
const processNumber = (input: number) =>
    pipe(input)
        .map((x) => x * 2) // Regular transformation
        .map((x) => x + 10) // Chain transformations
        .map((x) => (x > 50 ? Optional.some(x) : Optional.none)) // Convert to Optional
        .mapOptional((x) => x / 2).value; // Continue with Optional chain and get final Optional<number>

console.log(processNumber(30)); // Optional.some(35)
console.log(processNumber(10)); // Optional.none

// Pattern matching with match
type Status = 'loading' | 'success' | 'error';

const handleStatus = (status: Status, data?: string) =>
    match(status, {
        loading: 'Please wait...',
        success: `Data: ${data ?? 'No data'}`,
        error: 'An error occurred',
    });

console.log(handleStatus('loading')); // 'Please wait...'
console.log(handleStatus('success', 'Hello')); // 'Data: Hello'
console.log(handleStatus('error')); // 'An error occurred'

// Pattern matching with Result
const processResult = (result: Result<number, string>) =>
    Result.isOk(result) ? `Success: ${result.value}` : `Error: ${result.value}`;

console.log(processResult(Result.ok(42))); // 'Success: 42'
console.log(processResult(Result.err('Failed'))); // 'Error: Failed'
```

### 5. Immutable Collections: `IMap` and `ISet`

Type-safe, immutable data structures.

```typescript
import { IMap, ISet, pipe } from 'ts-verified';

// IMap usage - immutable operations
const originalMap = IMap.new<string, number>([]);
const mapWithOne = originalMap.set('one', 1);
const mapWithTwo = mapWithOne.set('two', 2);

// Original map is unchanged
console.log(originalMap.size); // 0
console.log(mapWithTwo.get('one')); // Optional.some(1)
console.log(mapWithTwo.has('three')); // false

// Using pipe for fluent updates
const updatedMap = pipe(IMap.new<string, number>([]))
    .map((map) => map.set('one', 1))
    .map((map) => map.set('two', 2))
    .map((map) => map.set('three', 3)).value;

console.log(updatedMap.size); // 3

// Efficient batch updates with withMutations
const largeMap = IMap.new<string, number>([]).withMutations([
    { type: 'set', key: 'key1', value: 1 },
    { type: 'set', key: 'key2', value: 2 },
    { type: 'set', key: 'key3', value: 3 },
]);

console.log(largeMap.size); // 3

// ISet usage
const originalSet = ISet.new<number>([]);
const setWithItems = originalSet.add(1).add(2).add(1); // Duplicate ignored

console.log(originalSet.size); // 0 (unchanged)
console.log(setWithItems.has(1)); // true
console.log(setWithItems.size); // 2
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

### 7. Iteration with `range`

Generate ranges for iteration and array creation.

```typescript
import { range } from 'ts-verified';

// Traditional for loop using range
for (const i of range(0, 5)) {
    console.log(i); // 0, 1, 2, 3, 4
}

// Create arrays from ranges
const numbers = Array.from(range(1, 4)); // [1, 2, 3]
const squares = Array.from(range(1, 6), (x) => x * x); // [1, 4, 9, 16, 25]

// Step ranges
for (const i of range(0, 10, 2)) {
    console.log(i); // 0, 2, 4, 6, 8
}
```

### 8. Mutability Utilities with `castMutable`

Safely work with readonly types when interfacing with mutable APIs.

```tsx
import { Autocomplete } from '@mui/material';
import { castMutable } from 'ts-verified';

const readonlyOptions: readonly string[] = ['Option 1', 'Option 2', 'Option 3'];

const SomeComponent: React.FC = () => {
    // Component implementation
    return (
        <Autocomplete
            // Use castMutable to safely pass readonly array to mutable API. This is safer than casting with `as`, as it simply changes type `readonly T[]` to `T[]`.
            options={castMutable(readonlyOptions)}
            // ...
        />
    );
};

// Immer.js example - draft properties need mutable types
import { produce } from 'immer';

type State = Readonly<{
    items: readonly string[];
}>;

const initialState: State = {
    items: ['item1', 'item2'],
} as const;

const newItems: readonly string[] = ['newItem1', 'newItem2'];

const updatedState = produce(initialState, (draft) => {
    // draft.items expects mutable array, but newItems is readonly
    draft.items = castMutable(newItems); // Safe cast for assignment
});

console.log(updatedState.items); // ['newItem1', 'newItem2']
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

**Important Notes:**

- This library **only supports ESM (ES Modules)**. CommonJS is not supported.
- This library uses advanced TypeScript features, including branded types for enhanced type safety. Some functions require specific branded types as parameters (such as `Uint32` in `newArray`). The examples above use the small literal numeric values specifically allowed in each function for brevity, but in actual use you should use the provided type conversion functions (such as `asUint32`) or cast to the appropriate branded type, for example `as Uint32`.

## Removing `expectType` in Production

Since `expectType` is only used for compile-time type checking, you should remove these calls in production builds for better performance.

### Rollup Configuration

```javascript
import rollupPluginStrip from '@rollup/plugin-strip';

export default {
    // ... other config
    plugins: [
        // ... other plugins
        rollupPluginStrip({
            functions: ['expectType'],
            include: '**/*.(mts|ts|mjs|js)',
        }),
    ],
};
```

### Vite Configuration

```javascript
import { defineConfig } from 'vite';

export default defineConfig({
    // ... other config
    build: {
        terserOptions: {
            compress: {
                // 'expectType' という名前の関数呼び出しをビルド時に除去する
                pure_funcs: ['expectType'],
            },
        },
    },
});
```

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines on how to contribute to this project.

## License

This project is licensed under the [Apache License 2.0](./LICENSE).
