import type { BigO, Comparator, Index, SortedArray } from "../../types.ts";
import { asIndex } from "../../types.ts";

export class BinarySearch {
  static readonly algorithmName = "Binary search";
  static readonly bigO: BigO = { time: "O(log n)", space: "O(1)" };

  static run<T>(
    array: SortedArray<T>,
    value: T,
    compare: Comparator<T>,
  ): Index | null {
    let low = 0;
    let high = array.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const cmp = compare(array[mid], value);

      if (cmp === 0) return asIndex(mid, array.length);
      if (cmp < 0) low = mid + 1;
      else high = mid - 1;
    }

    return null;
  }
}
