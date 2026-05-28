import type { BigO, Comparator, Index } from "../../types.ts";
import { asIndex } from "../../types.ts";

export class LinearSearch {
  static readonly algorithmName = "Linear search";
  static readonly bigO: BigO = { time: "O(n)", space: "O(1)" };

  static run<T>(
    array: readonly T[],
    value: T,
    compare: Comparator<T>,
  ): Index | null {
    for (let i = 0; i < array.length; i++) {
      if (compare(array[i], value) === 0) {
        return asIndex(i, array.length);
      }
    }

    return null;
  }
}
