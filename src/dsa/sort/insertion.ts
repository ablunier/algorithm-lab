import type { BigO, Comparator, SortedArray } from "../../types.ts";
import { unsafeCastSortedArray } from "../../types.ts";

export class InsertionSort {
  static readonly algorithmName = "Insertion sort";
  static readonly bigO: BigO = { time: "O(n²)", space: "O(n)" };

  static run<T>(array: readonly T[], compare: Comparator<T>): SortedArray<T> {
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

    return unsafeCastSortedArray(result);
  }
}
