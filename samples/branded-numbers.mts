import {
    asInt,
    asUint,
    asFiniteNumber,
    asSafeInt,
    asInt16,
    asUint32,
    asNonZeroInt,
    asPositiveInt,
    Int,
    Uint,
    FiniteNumber,
    SafeInt,
    Int16,
    Uint32,
    NonZeroInt,
    PositiveInt,
} from 'ts-verified';

// Basic branded types
const integer = asInt(42); // Int - any integer
const unsigned = asUint(42); // Uint - non-negative integer
const finite = asFiniteNumber(3.14); // FiniteNumber - finite floating-point
const safeInt = asSafeInt(42); // SafeInt - integer in safe range

const nonInteger = asInt(3.14); // This line causes a runtime error

// Range-constrained types (16-bit, 32-bit)
const int16 = asInt16(1000); // Int16: [-32768, 32767]
const uint32 = asUint32(3000000000); // Uint32: [0, 4294967295]

// Non-zero and positive variants
const nonZeroInt = asNonZeroInt(5); // NonZeroInt - excludes zero
const positiveInt = asPositiveInt(10); // PositiveInt - excludes zero and negatives

// Type-safe arithmetic with automatic clamping
const sum = Int16.add(int16, asInt16(2000)); // Int16 (3000)
const clamped = Int16.clamp(100000); // Int16 (32767 - clamped to MAX_VALUE)

// Safe division with non-zero types
const ratio = NonZeroInt.div(asNonZeroInt(10), nonZeroInt); // No division by zero risk

// Random generation within type constraints
const randomInt16 = Int16.random(); // Int16 (random value in valid range)