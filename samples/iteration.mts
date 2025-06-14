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