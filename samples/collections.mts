import { IMap, ISet, pipe } from 'ts-verified';

// IMap usage - immutable operations
const originalMap = IMap.create<string, number>([]);
const mapWithOne = originalMap.set('one', 1);
const mapWithTwo = mapWithOne.set('two', 2);

// Original map is unchanged
console.log(originalMap.size); // 0
console.log(mapWithTwo.get('one')); // Optional.some(1)
console.log(mapWithTwo.has('three')); // false

// Using pipe for fluent updates
const idMap = pipe(Arr.seq(10))
    .map(Arr.map<number>(i => [i, i.toString()])
     .map(Arr.skip(1)) // [ [1, "1"], ..., [9, "9"]]
    .map(IMap.create<number, string>).value;

console.log(idMap.size); // 9

// Efficient batch updates with withMutations
const idMapUpdated = idMap.withMutations([
    { type: 'set', key: 99, value: "99" },
    { type: 'update', key: 5, value: "five" },
    { type: 'delete', key: 4 },
]);

console.log(idMapUpdated.size); // 9

// ISet usage
const originalSet = ISet.create<number>([]);
const setWithItems = originalSet.add(1).add(2).add(1); // Duplicate ignored

console.log(originalSet.size); // 0 (unchanged)
console.log(setWithItems.has(1)); // true
console.log(setWithItems.size); // 2