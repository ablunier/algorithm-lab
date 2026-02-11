import type { Comparator, SortAlgorithm } from "../types.ts";
import { asSortedArray } from "../types.ts";

export const mergeSort = <T>(): SortAlgorithm<T> => ({
  name: "Merge sort",
  bigO: "O(n log n)",
  mutates: false,

  sort(array, compare) {
    return asSortedArray(mergeSortRecursive(array, compare));
  },
});

function mergeSortRecursive<T>(
  array: readonly T[],
  compare: Comparator<T>,
): T[] {
  if (array.length <= 1) {
    return [...array];
  }

  const middle = Math.floor(array.length / 2);

  return merge(
    mergeSortRecursive(array.slice(0, middle), compare),
    mergeSortRecursive(array.slice(middle), compare),
    compare,
  );
}

function merge<T>(
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

  return result
    .concat(left.slice(i))
    .concat(right.slice(j));
}
