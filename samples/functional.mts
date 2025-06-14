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