import type { Comparator, SortAlgorithm, SortedArray } from "../types.ts";

export const mergeSort = <T>(): SortAlgorithm<T> => ({
  name: "Merge sort",
  mutates: false,

  sort(array, compare) {
    if (array.length <= 1) {
      return array as unknown as SortedArray<T>;
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    const sorted = merge(
      mergeSort<T>().sort(left, compare),
      mergeSort<T>().sort(right, compare),
      compare
    );

    return sorted as unknown as SortedArray<T>;
  }
});

function merge<T>(left: readonly T[], right: readonly T[], compare: Comparator<T>): T[] {
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
