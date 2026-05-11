import type { SortAlgorithm } from "../../types.ts";
import { asSortedArray } from "../../types.ts";

export const selectionSort = <T>(): SortAlgorithm<T> => ({
  name: "Selection sort",
  bigO: "O(n^2)",
  mutates: false,

  sort(array, compare) {
    const result = [...array];

    const n = result.length;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;

      for (let j = i + 1; j < n; j++) {
        if (compare(result[j], result[minIndex]) < 0) {
          minIndex = j;
        }
      }

      if (minIndex !== i) {
        [result[i], result[minIndex]] = [result[minIndex], result[i]];
      }
    }

    return asSortedArray(result);
  },
});
