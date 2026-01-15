import type { SortAlgorithm, SortedArray } from "../types.ts";

export const nativeSort = <T>(): SortAlgorithm<T> => ({
  name: "Native sort",
  mutates: true,

  sort(array, compare) {
    return [...array].sort(compare) as unknown as SortedArray<T>;
  }
});
