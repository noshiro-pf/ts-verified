/// <reference types="ts-type-forge" />

type SmallUint = Index<40>;
type PositiveSmallInt = UintRange<1, 40>;

type PositiveInt = UintRange<1, 512>;

/**
 * Represents the type of keys that can be used in a standard JavaScript Map.
 */
type MapSetKeyType = number | string;
