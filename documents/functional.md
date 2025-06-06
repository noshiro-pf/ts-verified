[**Documentation**](README.md)

---

# Functional Programming Guide

The functional module provides essential utilities for cleaner, more reliable code through functional programming patterns. These utilities help you handle nullability, errors, and function composition in a type-safe way.

## Key Features

- **Type Safety**: All operations preserve and refine TypeScript types
- **No Exceptions**: Handle errors as values, not exceptions
- **Composition**: Build complex operations from simple functions
- **Null Safety**: Eliminate null/undefined errors at compile time

## Quick Start

```typescript
import { Optional, Result, pipe, match } from 'ts-verified';

// Optional: Type-safe null handling
const user = Optional.some({ name: 'John', age: 30 });
const greeting = user
    .map((u) => `Hello, ${u.name}!`)
    .unwrapOr('Hello, stranger!'); // "Hello, John!"

// Result: Error handling without exceptions
const parseNumber = (str: string): Result<number, string> => {
    const num = Number(str);
    return Number.isNaN(num) ? Result.err('Invalid number') : Result.ok(num);
};

const doubled = parseNumber('42')
    .map((n) => n * 2)
    .unwrapOr(0); // 84

// Pipe: Function composition
const processText = pipe(
    (text: string) => text.trim(),
    (str) => str.toUpperCase(),
    (str) => str.split(' '),
);

const words = processText('  hello world  '); // ['HELLO', 'WORLD']
```

## Core Utilities

### Optional - Null Safety

Handle nullable values without runtime errors:

**Creation:** `some()`, `none()`, `fromNullable()`
**Transformation:** `map()`, `flatMap()`, `filter()`
**Extraction:** `unwrap()`, `unwrapOr()`, `unwrapOrElse()`
**Checking:** `isSome()`, `isNone()`, `exists()`

```typescript
// Safe property access
const user = { profile: { email: 'user@example.com' } };
const email = Optional.fromNullable(user)
    .flatMap((u) => Optional.fromNullable(u.profile))
    .flatMap((p) => Optional.fromNullable(p.email))
    .map((e) => e.toLowerCase())
    .unwrapOr('no-email@example.com');

// Finding elements
const findUser = (users: readonly User[], id: string): Optional<User> => {
    const user = users.find((u) => u.id === id);
    return user !== undefined ? Optional.some(user) : Optional.none();
};
```

### Result - Error Handling

Handle operations that can fail without throwing exceptions:

**Creation:** `ok()`, `err()`, `fromThrowable()`
**Transformation:** `map()`, `mapErr()`, `flatMap()`
**Extraction:** `unwrap()`, `unwrapOr()`, `unwrapErr()`
**Checking:** `isOk()`, `isErr()`, `contains()`

```typescript
// Safe JSON parsing using fromThrowable
const parseJson = (text: string): Result<unknown, Error> =>
    Result.fromThrowable(() => JSON.parse(text));

// Alternative manual approach
const parseJsonManual = (text: string): Result<unknown, Error> => {
    try {
        return Result.ok(JSON.parse(text));
    } catch (error) {
        return Result.err(
            error instanceof Error ? error : new Error(String(error)),
        );
    }
};

// Validation with error accumulation
const validateUser = (data: any): Result<User, string[]> => {
    const errors: string[] = [];

    if (!data.name || data.name.length === 0) errors.push('Name is required');
    if (!data.email || !data.email.includes('@'))
        errors.push('Valid email is required');
    if (!data.age || data.age < 0) errors.push('Age must be positive');

    return errors.length > 0
        ? Result.err(errors)
        : Result.ok({ name: data.name, email: data.email, age: data.age });
};
```

### Pipe - Function Composition

Compose functions in a readable, left-to-right manner:

```typescript
// Data transformation pipeline
const processUserData = pipe(
    (input: string) => JSON.parse(input),
    (data: any) => validateUser(data),
    (result: Result<User, string[]>) => result.map(transformUser),
    (result: Result<TransformedUser, string[]>) => result.unwrapOr(defaultUser),
);

// Async operations
const fetchAndProcess = pipe(
    (url: string) => fetch(url),
    (response: Response) => response.json(),
    (data: any) => processData(data),
);
```

### Match - Pattern Matching

Exhaustive pattern matching for TypeScript:

```typescript
type ApiResponse =
    | { status: 'loading' }
    | { status: 'success'; data: string }
    | { status: 'error'; error: Error };

const handleResponse = (response: ApiResponse) =>
    match(response, {
        loading: () => showSpinner(),
        success: ({ data }) => displayData(data),
        error: ({ error }) => showError(error.message),
    });

// With default case
const getStatusMessage = (status: string) =>
    match(
        status,
        {
            active: 'System is running',
            maintenance: 'Under maintenance',
            error: 'System error occurred',
        },
        'Unknown status',
    );
```

## Error Handling Patterns

### When to Use Each Approach

**Use `Optional<T>` when:**

- A value might not exist naturally
- No additional error information is needed
- The absence is a normal condition

**Use `Result<T, E>` when:**

- Operations can fail in multiple ways
- Error details are important for recovery
- You need to propagate error information

**Throw exceptions when:**

- The error represents a programming mistake
- Type constraints are violated
- Preconditions are not met

```typescript
// Optional: for missing values
const getConfigValue = (key: string): string =>
    Optional.fromNullable(process.env[key]).unwrapOr('default-value');

// Result: for operations that can fail
const parseConfig = (text: string): Result<Config, ConfigError> => {
    try {
        const parsed = JSON.parse(text);
        return validateConfig(parsed);
    } catch (error) {
        return Result.err(new ConfigError(`Invalid JSON: ${error.message}`));
    }
};

// Exceptions: for programming errors
const asPositiveInt = (value: number): PositiveInt => {
    if (!Number.isInteger(value) || value <= 0) {
        throw new TypeError(`Expected positive integer, got: ${value}`);
    }
    return value as PositiveInt;
};
```

### Error Recovery Strategies

**Fallback Values:**

```typescript
const safeParseNumber = (str: string): number =>
    Result.fromThrowable(() => Number(str))
        .filter((n) => !Number.isNaN(n))
        .unwrapOr(0);

const getUserName = (user: unknown): string =>
    Optional.fromNullable(user)
        .flatMap((u) => Optional.fromNullable((u as any).name))
        .unwrapOr('Anonymous');
```

**Retry with Backoff:**

```typescript
const retryOperation = async <T>(
    operation: () => Promise<Result<T, Error>>,
    maxRetries: number = 3,
): Promise<Result<T, Error>> => {
    let lastError: Error = new Error('Max retries exceeded');

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        const result = await operation();
        if (Result.isOk(result)) return result;

        lastError = result.value;
        if (attempt < maxRetries - 1) {
            await new Promise((resolve) =>
                setTimeout(resolve, 1000 * Math.pow(2, attempt)),
            );
        }
    }

    return Result.err(lastError);
};
```

**Combining Multiple Results:**

```typescript
const createUser = (
    name: string,
    email: string,
    age: number,
): Result<User, readonly string[]> => {
    const nameResult = validateName(name);
    const emailResult = validateEmail(email);
    const ageResult = validateAge(age);

    const errors = [
        ...(nameResult.isErr() ? [nameResult.value] : []),
        ...(emailResult.isErr() ? [emailResult.value] : []),
        ...(ageResult.isErr() ? [ageResult.value] : []),
    ];

    return errors.length > 0
        ? Result.err(errors)
        : Result.ok({
              name: nameResult.unwrap(),
              email: emailResult.unwrap(),
              age: ageResult.unwrap(),
          });
};
```

## Migration Guide

When converting from exception-based code:

```typescript
// Before: Exception-based
function getElement<T>(arr: readonly T[], index: number): T {
    if (index < 0 || index >= arr.length) {
        throw new RangeError('Index out of bounds');
    }
    return arr[index];
}

// After: Optional-based
function getElement<T>(arr: readonly T[], index: number): Optional<T> {
    return index < 0 || index >= arr.length
        ? Optional.none()
        : Optional.some(arr[index]);
}

// Usage
const element = getElement(array, 5);
if (Optional.isSome(element)) {
    console.log('Found:', element.value);
} else {
    console.log('Element not found');
}
```

This functional approach eliminates many common sources of runtime errors while making error handling explicit and composable.
