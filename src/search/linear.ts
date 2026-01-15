import type { SearchAlgorithm } from "../types.ts";
import { asIndex } from "../types.ts";

export const linearSearch = <T>(): SearchAlgorithm<T, readonly T[]> => ({
  name: "Linear search",

  search(array, value, compare) {
    for (let i = 0; i < array.length; i++) {
      if (compare(array[i], value) === 0) {
        return asIndex(i, array.length);
      }
    }

    return null;
  },
});
