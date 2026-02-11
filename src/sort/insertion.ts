import type { SortAlgorithm } from "../types.ts";
import { asSortedArray } from "../types.ts";

export const insertionSort = <T>(): SortAlgorithm<T> => ({
  name: "Insertion sort",
  bigO: "O(n^2)",
  mutates: false,

  sort(array, compare) {
    const result = [...array];

    for (let i = 1; i < result.length; i++) {
      const current = result[i];
      let j = i - 1;

      while (j >= 0 && compare(current, result[j]) < 0) {
        result[j + 1] = result[j];
        j--;
      }

      result[j + 1] = current;
    }

    return asSortedArray(result);
  },
});
