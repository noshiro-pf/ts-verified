export const memoizeFunction = <const A extends readonly unknown[], R, K>(
  fn: (...args: A) => R,
  argsToCacheKey: (...args: A) => K,
): ((...args: A) => R) => {
  const mut_cache = new Map<K, R>();

  return (...args: A): R => {
    const key = argsToCacheKey(...args);
    const cachedValue = mut_cache.get(key);

    if (cachedValue !== undefined) {
      return cachedValue;
    } else {
      const result = fn(...args);

      mut_cache.set(key, result);

      return result;
    }
  };
};
