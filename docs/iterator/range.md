[**Documentation**](../README.md)

---

[Documentation](../README.md) / iterator/range

# iterator/range

## Functions

### range()

#### Call Signature

> **range**(`start`, `end`, `step?`): `Generator`\<`SafeUint`, `void`, `unknown`\>

Defined in: [src/iterator/range.mts:38](https://github.com/noshiro-pf/ts-verified/blob/main/src/iterator/range.mts#L38)

Generates a sequence of numbers within a specified range using a generator.

The generator yields numbers from `start` (inclusive) to `end` (exclusive)
with the specified `step` increment/decrement.

##### Parameters

###### start

`SafeUintWithSmallInt`

The starting number of the sequence (inclusive).

###### end

`SafeUintWithSmallInt`

The end number of the sequence (exclusive). The sequence does not include this number.

###### step?

`PositiveSafeIntWithSmallInt`

The increment or decrement value. Defaults to 1. Must be non-zero.

##### Returns

`Generator`\<`SafeUint`, `void`, `unknown`\>

A generator that yields numbers in the specified range.

##### Example

```typescript
// Basic ascending range
for (const n of range(0, 5)) {
    console.log(n); // 0, 1, 2, 3, 4
}

// Range with custom step
for (const n of range(0, 10, 2)) {
    console.log(n); // 0, 2, 4, 6, 8
}

// Descending range
for (const n of range(5, 0, -1)) {
    console.log(n); // 5, 4, 3, 2, 1
}

// Convert to array
const arr = Array.from(range(1, 4)); // [1, 2, 3]

// Empty range (start >= end with positive step)
Array.from(range(5, 5)); // []
Array.from(range(5, 3)); // []
```

#### Call Signature

> **range**(`start`, `end`, `step?`): `Generator`\<`SafeInt`, `void`, `unknown`\>

Defined in: [src/iterator/range.mts:43](https://github.com/noshiro-pf/ts-verified/blob/main/src/iterator/range.mts#L43)

Generates a sequence of numbers within a specified range using a generator.

The generator yields numbers from `start` (inclusive) to `end` (exclusive)
with the specified `step` increment/decrement.

##### Parameters

###### start

`SafeIntWithSmallInt`

The starting number of the sequence (inclusive).

###### end

`SafeIntWithSmallInt`

The end number of the sequence (exclusive). The sequence does not include this number.

###### step?

`NonZeroSafeIntWithSmallInt`

The increment or decrement value. Defaults to 1. Must be non-zero.

##### Returns

`Generator`\<`SafeInt`, `void`, `unknown`\>

A generator that yields numbers in the specified range.

##### Example

```typescript
// Basic ascending range
for (const n of range(0, 5)) {
    console.log(n); // 0, 1, 2, 3, 4
}

// Range with custom step
for (const n of range(0, 10, 2)) {
    console.log(n); // 0, 2, 4, 6, 8
}

// Descending range
for (const n of range(5, 0, -1)) {
    console.log(n); // 5, 4, 3, 2, 1
}

// Convert to array
const arr = Array.from(range(1, 4)); // [1, 2, 3]

// Empty range (start >= end with positive step)
Array.from(range(5, 5)); // []
Array.from(range(5, 3)); // []
```
