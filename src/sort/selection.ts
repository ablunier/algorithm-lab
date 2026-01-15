import { SortAlgorithm, SortedArray } from "../types.ts";

export const selectionSort = <T>(): SortAlgorithm<T> => ({
  name: "Selection sort",
  mutates: true,

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

    return result as unknown as SortedArray<T>;
  }
});
