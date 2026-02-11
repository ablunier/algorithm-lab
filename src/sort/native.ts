import type { SortAlgorithm } from "../types.ts";
import { asSortedArray } from "../types.ts";

export const nativeSort = <T>(): SortAlgorithm<T> => ({
  name: "Native sort",
  mutates: false,

  sort(array, compare) {
    return asSortedArray([...array].sort(compare));
  },
});
