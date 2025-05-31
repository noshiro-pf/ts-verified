# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Development Commands

**Testing:**

- `npm test` - Run all tests with Vitest
- `npm run testw` - Run tests in watch mode
- `npm run test -- path/to/test.mts` - Run specific test file

**Build & Validation:**

- `npm run build` - Full build pipeline (generates indexes, type-checks, bundles)
- `npm run tsc` - Type checking only
- `npm run check-all` - Comprehensive validation (lint, test, build)

**Code Quality:**

- `npm run lint` - ESLint checking
- `npm run fmt` - Prettier formatting

## Architecture Overview

**ts-verified** is a TypeScript utility library providing type-safe functional programming utilities. Key architectural principles:

1. **Type-first design** - Heavy use of TypeScript's type system for compile-time safety
2. **Zero runtime dependencies** - Only development tooling dependencies
3. **Functional programming patterns** - Immutable data structures, Optional/Result types
4. **ESM modules** - Uses `.mts` extensions with `NodeNext` module resolution

## Module Structure

- `array/` - Array and tuple utilities with type-safe operations
- `collections/` - Immutable data structures (IMap, ISet, Queue)
- `functional/` - FP utilities (Optional, Result, pipe, match)
- `guard/` - Type guard functions for runtime type checking
- `iterator/` - Iterator utilities (range generators)
- `expect-type.mts` - Compile-time type assertions for testing

## Testing Approach

Uses **Vitest** with dual testing strategy:

1. **Compile-time type testing** via `expectType` utility
2. **Runtime behavioral testing** with standard assertions

Example pattern:

```typescript
import { expectType } from '../expect-type.mjs';

// Type-level assertion
expectType<typeof result, readonly [0, 0, 0]>('=');
// Runtime assertion
expect(result).toStrictEqual([0, 0, 0]);
```

## Configuration Notes

- **TypeScript**: Strict mode with `noUncheckedIndexedAccess: true`
- **ESLint**: Custom rules including bans on `object` type, enforces `Object.hasOwn`
- **Build**: Rollup bundler with automatic index file generation via custom scripts
- **Tests**: Co-located with source files using `.test.mts` suffix

## Important Patterns

- Functions return immutable data structures
- Type utilities leverage `ts-type-forge` for advanced TypeScript patterns
- All exports go through generated index files
- Documentation auto-generated from TSDoc comments using TypeDoc
