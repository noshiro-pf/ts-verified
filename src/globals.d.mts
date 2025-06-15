/// <reference types="ts-type-forge" />

type SmallUint = SmallInt<'>=0'>;
type PositiveSmallInt = SmallInt<'>0'>;

/**
 * Represents the type of keys that can be used in a standard JavaScript Map.
 */
type MapSetKeyType = Primitive;

// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/length
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/length
// Max array length : 2^32 - 1
// Max string length : 2^53 - 1

declare namespace SizeType {
  type Arr = Uint32;
  type TypedArray = SafeUint;
  type Str = SafeUint;

  type ArrSearchResult = Arr | -1;
  type TypedArraySearchResult = TypedArray | -1;
  type StrSearchResult = Str | -1;

  type ArgArr = WithSmallInt<NormalizeBrandUnion<NegativeInt32 | Arr>>;
  type ArgTypedArray = WithSmallInt<SafeInt>;
  type ArgStr = WithSmallInt<SafeInt>;

  type ArgArrPositive = WithSmallInt<IntersectBrand<PositiveNumber, Arr>>;
  type ArgTypedArrayPositive = WithSmallInt<
    IntersectBrand<PositiveNumber, TypedArray>
  >;
  type ArgStrPositive = WithSmallInt<IntersectBrand<PositiveNumber, Str>>;

  type ArgArrNonNegative = WithSmallInt<Arr>;
  type ArgTypedArrayNonNegative = WithSmallInt<TypedArray>;
  type ArgStrNonNegative = WithSmallInt<Str>;
}
