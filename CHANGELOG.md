# [3.0.0](https://github.com/noshiro-pf/ts-verified/compare/v2.0.0...v3.0.0) (2025-06-15)

### Features

- update utilities ([#45](https://github.com/noshiro-pf/ts-verified/issues/45)) ([a0376c1](https://github.com/noshiro-pf/ts-verified/commit/a0376c11c9df74afbadaec766efa5adf51672c05))

### BREAKING CHANGES

-   - Changed the return type of some `Arr` methods

* Renamed `ISet.new` to `ISet.create`.
* Renamed `IMap.new` to `IMap.create`.
* Renamed `ISetMapped.new` to `ISetMapped.create`.
* Renamed `IMapMapped.new` to `IMapMapped.create`.
* Array element access such as `Arr.head`, `Arr.last` now returns `Optional<T>` instead of `T | undefined`.
* Added `Stack<T>`
* `Obj.shallowEq` now compares values with `Object.is` instead of strict equality (`===`).
* Other improvements and fixes.
    - Improved performance of `Queue<T>`.
    - Added curried function overloads.

# [2.0.0](https://github.com/noshiro-pf/ts-verified/compare/v1.0.0...v2.0.0) (2025-06-05)

### Features

- update APIs and add JSDocs ([#34](https://github.com/noshiro-pf/ts-verified/issues/34)) ([4e215a5](https://github.com/noshiro-pf/ts-verified/commit/4e215a53695376b9ec5edaaa30e0f4efc6269bd5))

### BREAKING CHANGES

- Use branded types for number types, add new APIs, and remove deprecated ones.

# 1.0.0 (2025-05-11)

### Features

- add src files ([#6](https://github.com/noshiro-pf/ts-verified/issues/6)) ([a9f6782](https://github.com/noshiro-pf/ts-verified/commit/a9f67824daddb1b6aee410331b9ba755a12a6ad7))
