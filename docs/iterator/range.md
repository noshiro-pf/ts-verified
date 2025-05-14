[**Documentation**](../README.md)

---

[Documentation](../README.md) / iterator/range

# iterator/range

## Functions

### range()

> **range**(`start`, `end`, `step`): `Generator`\<`number`, `void`, `unknown`\>

Defined in: [iterator/range.mts:9](https://github.com/noshiro-pf/ts-verified/blob/main/src/iterator/range.mts#L9)

Generates a sequence of numbers within a specified range.

#### Parameters

##### start

`number`

The starting number of the sequence.

##### end

`number`

The end number of the sequence. The sequence does not include this number.

##### step

`number` = `1`

The increment or decrement value. Defaults to 1.

#### Returns

`Generator`\<`number`, `void`, `unknown`\>

#### Yields

Numbers in the specified range.

#### Throws

Will throw an error if `step` is 0, or if `start`, `end`, or `step` are not SafeInteger.
