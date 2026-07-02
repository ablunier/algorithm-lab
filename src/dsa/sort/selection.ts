import type { Comparator, SortedArray } from "../../types.ts";
import { unsafeCastSortedArray } from "../../types.ts";
import { variant } from "../../decorators.ts";

export class SelectionSort {
  @variant({ name: "Selection sort", bigO: { time: "O(n²)", space: "O(n)" } })
  static run<T>(array: readonly T[], compare: Comparator<T>): SortedArray<T> {
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

    return unsafeCastSortedArray(result);
  }
}
