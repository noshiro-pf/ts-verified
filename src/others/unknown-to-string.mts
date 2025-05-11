import { isNonNullish } from '../guard/index.mjs';

/**
 * @param err
 * @param prettyPrintObject Use JSON.stringify(err, undefined, 2) instead of
 *   JSON.stringify(err)
 */
export const unknownToString = (
  err: unknown,
  options?: Partial<Readonly<{ prettyPrintObject: boolean }>>,
): string => {
  switch (typeof err) {
    case 'string':
      return err;

    case 'number':
    case 'bigint':
    case 'boolean':
    case 'symbol':
    case 'function':
      return err.toString();

    case 'object':
      return isNonNullish(err)
        ? options?.prettyPrintObject === true
          ? JSON.stringify(err, undefined, 2)
          : JSON.stringify(err)
        : 'null';

    case 'undefined':
      return 'undefined';
  }
};
