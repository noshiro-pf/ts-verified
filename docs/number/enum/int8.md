[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/enum/int8

# number/enum/int8

## Variables

### asInt8()

> `const` **asInt8**: (`x`) => `Int8` = `castTo`

Defined in: [src/number/enum/int8.mts:129](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/enum/int8.mts#L129)

Converts a number to Int8, throwing an error if invalid.

Converts a number to Int8, throwing an error if invalid.

#### Parameters

##### x

`number`

The number to convert

#### Returns

`Int8`

The number as Int8

#### Throws

TypeError if x is not a valid Int8

---

### Int8

> `const` **Int8**: `object`

Defined in: [src/number/enum/int8.mts:134](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/enum/int8.mts#L134)

Utilities for working with 8-bit signed integers (range: -128 to 127).

#### Type declaration

##### abs()

> **abs**: \<`N`\>(`x`) => `AbsoluteValue`\<`N`\>

Returns the absolute value of an Int8.

###### Type Parameters

###### N

`N` _extends_ `Int8`

###### Parameters

###### x

`N`

The Int8 value

###### Returns

`AbsoluteValue`\<`N`\>

The absolute value

##### add()

> **add**: (`x`, `y`) => `Int8`

Adds two Int8 values, clamped to Int8 range.

###### Parameters

###### x

`Int8`

First operand

###### y

`Int8`

Second operand

###### Returns

`Int8`

x + y clamped to [-128, 127]

###### Returns

`a + b`, but clamped to `[-128, 127]`

##### clamp()

> **clamp**: (`a`) => `Int8`

Clamps a number to the Int8 range [-128, 127].

###### Parameters

###### a

`number`

The number to clamp

###### Returns

`Int8`

The clamped value as Int8

##### div()

> **div**: (`x`, `y`) => `Int8`

Divides two Int8 values, clamped to Int8 range.

###### Parameters

###### x

`Int8`

The dividend

###### y

The divisor (cannot be 0)

`-128` | `-127` | `-126` | `-125` | `-124` | `-123` | `-122` | `-121` | `-120` | `-119` | `-118` | `-117` | `-116` | `-115` | `-114` | `-113` | `-112` | `-111` | `-110` | `-109` | `-108` | `-107` | `-106` | `-105` | `-104` | `-103` | `-102` | `-101` | `-100` | `-99` | `-98` | `-97` | `-96` | `-95` | `-94` | `-93` | `-92` | `-91` | `-90` | `-89` | `-88` | `-87` | `-86` | `-85` | `-84` | `-83` | `-82` | `-81` | `-80` | `-79` | `-78` | `-77` | `-76` | `-75` | `-74` | `-73` | `-72` | `-71` | `-70` | `-69` | `-68` | `-67` | `-66` | `-65` | `-64` | `-63` | `-62` | `-61` | `-60` | `-59` | `-58` | `-57` | `-56` | `-55` | `-54` | `-53` | `-52` | `-51` | `-50` | `-49` | `-48` | `-47` | `-46` | `-45` | `-44` | `-43` | `-42` | `-41` | `-40` | `-39` | `-38` | `-37` | `-36` | `-35` | `-34` | `-33` | `-32` | `-31` | `-30` | `-29` | `-28` | `-27` | `-26` | `-25` | `-24` | `-23` | `-22` | `-21` | `-20` | `-19` | `-18` | `-17` | `-16` | `-15` | `-14` | `-13` | `-12` | `-11` | `-10` | `-9` | `-8` | `-7` | `-6` | `-5` | `-4` | `-3` | `-2` | `-1` | `1` | `2` | `3` | `4` | `5` | `6` | `7` | `8` | `9` | `10` | `11` | `12` | `13` | `14` | `15` | `16` | `17` | `18` | `19` | `20` | `21` | `22` | `23` | `24` | `25` | `26` | `27` | `28` | `29` | `30` | `31` | `32` | `33` | `34` | `35` | `36` | `37` | `38` | `39` | `40` | `41` | `42` | `43` | `44` | `45` | `46` | `47` | `48` | `49` | `50` | `51` | `52` | `53` | `54` | `55` | `56` | `57` | `58` | `59` | `60` | `61` | `62` | `63` | `64` | `65` | `66` | `67` | `68` | `69` | `70` | `71` | `72` | `73` | `74` | `75` | `76` | `77` | `78` | `79` | `80` | `81` | `82` | `83` | `84` | `85` | `86` | `87` | `88` | `89` | `90` | `91` | `92` | `93` | `94` | `95` | `96` | `97` | `98` | `99` | `100` | `101` | `102` | `103` | `104` | `105` | `106` | `107` | `108` | `109` | `110` | `111` | `112` | `113` | `114` | `115` | `116` | `117` | `118` | `119` | `120` | `121` | `122` | `123` | `124` | `125` | `126` | `127`

###### Returns

`Int8`

⌊x / y⌋ clamped to [-128, 127]

###### Returns

`⌊a / b⌋`, but clamped to `[-128, 127]`

##### is()

> **is**: (`x`) => `x is Int8`

Checks if a number is a valid Int8 (integer in [-128, 127]).

###### Parameters

###### x

`number`

The number to check

###### Returns

`x is Int8`

True if x is a valid Int8

##### max()

> `readonly` **max**: (...`values`) => `Int8` = `max_`

Returns the maximum of the given Int8 values.

###### Parameters

###### values

...readonly `Int8`[]

The Int8 values to compare

###### Returns

`Int8`

The maximum value

##### MAX_VALUE

> **MAX_VALUE**: `127`

`127`

##### min()

> `readonly` **min**: (...`values`) => `Int8` = `min_`

Returns the minimum of the given Int8 values.

###### Parameters

###### values

...readonly `Int8`[]

The Int8 values to compare

###### Returns

`Int8`

The minimum value

##### MIN_VALUE

> **MIN_VALUE**: `-128`

`-128`

##### mul()

> **mul**: (`x`, `y`) => `Int8`

Multiplies two Int8 values, clamped to Int8 range.

###### Parameters

###### x

`Int8`

First operand

###### y

`Int8`

Second operand

###### Returns

`Int8`

x \* y clamped to [-128, 127]

###### Returns

`a * b`, but clamped to `[-128, 127]`

##### pow()

> **pow**: (`x`, `y`) => `Int8`

Raises x to the power of y, clamped to Int8 range.

###### Parameters

###### x

`Int8`

The base

###### y

`Int8`

The exponent

###### Returns

`Int8`

x^y clamped to [-128, 127]

###### Returns

`a ** b`, but clamped to `[-128, 127]`

##### random()

> **random**: (`min`, `max`) => `Int8`

Generates a random Int8 value within the specified range.

###### Parameters

###### min

`Int8`

The minimum value (inclusive)

###### max

`Int8`

The maximum value (inclusive)

###### Returns

`Int8`

A random Int8 between min and max

##### sub()

> **sub**: (`x`, `y`) => `Int8`

Subtracts two Int8 values, clamped to Int8 range.

###### Parameters

###### x

`Int8`

First operand

###### y

`Int8`

Second operand

###### Returns

`Int8`

x - y clamped to [-128, 127]

###### Returns

`a - b`, but clamped to `[-128, 127]`

---

### isInt8()

> `const` **isInt8**: (`x`) => `x is Int8` = `is`

Defined in: [src/number/enum/int8.mts:124](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/enum/int8.mts#L124)

Type guard function that checks if a number is a valid Int8.

Checks if a number is a valid Int8 (integer in [-128, 127]).

#### Parameters

##### x

`number`

The number to check

#### Returns

`x is Int8`

True if x is a valid Int8
