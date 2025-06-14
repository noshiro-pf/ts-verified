import { Arr } from 'ts-verified';

const numbers: readonly number[] = [1, 2, 3, 4, 5, 2, 3];
const people = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 35 },
] as const;

// Reduction
const sum = Arr.sum(numbers);
console.log(sum); // 20

// Array creation
const zeros: readonly [0, 0, 0, 0, 0] = Arr.zeros(5); // [0, 0, 0, 0, 0]
const range: readonly [1, 2, 3] = Arr.range(1, 4); // [1, 2, 3]

// Type-safe length checking
if (Arr.isArrayAtLeastLength(numbers, 2)) {
    // numbers is now guaranteed to have at least 3 elements
    expectType<typeof numbers, readonly [number, number, ...number[]]>('=');
    console.log(numbers[1]); // Safe access to index 2
}

// Take first n elements
const firstThree = Arr.take(numbers, 3); // [1, 2, 3]

// Find maximum by property
const oldestPerson = Arr.maxBy(people, (person) => person.age);
console.log(oldestPerson?.name); // 'Charlie'

// Remove duplicates
const unique = Arr.uniq(numbers); // [1, 2, 3, 4, 5]