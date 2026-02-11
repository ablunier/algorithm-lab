import type { SearchAlgorithm, SortedArray } from "../types.ts";
import { asIndex } from "../types.ts";

export const binarySearch = <T>(): SearchAlgorithm<T, SortedArray<T>> => ({
  name: "Binary search",
  bigO: "O(log n)",

  search(array, value, compare) {
    let low = 0;
    let high = array.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const cmp = compare(array[mid], value);

      if (cmp === 0) {
        return asIndex(mid, array.length);
      }

      if (cmp < 0) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return null;
  },
});
