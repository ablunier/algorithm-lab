import type { Comparator, SortedArray } from "../../types.ts";
import { unsafeCastSortedArray } from "../../types.ts";
import { variant } from "../../decorators.ts";

export class MergeSort {
  @variant({ name: "Merge sort", bigO: { time: "O(n log n)", space: "O(n)" } })
  static run<T>(array: readonly T[], compare: Comparator<T>): SortedArray<T> {
    return unsafeCastSortedArray(MergeSort.sortRecursive(array, compare));
  }

  private static sortRecursive<T>(
    array: readonly T[],
    compare: Comparator<T>,
  ): T[] {
    if (array.length <= 1) return [...array];

    const mid = Math.floor(array.length / 2);

    return MergeSort.merge(
      MergeSort.sortRecursive(array.slice(0, mid), compare),
      MergeSort.sortRecursive(array.slice(mid), compare),
      compare,
    );
  }

  private static merge<T>(
    left: readonly T[],
    right: readonly T[],
    compare: Comparator<T>,
  ): T[] {
    const result: T[] = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      if (compare(left[i], right[j]) <= 0) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
  }
}
