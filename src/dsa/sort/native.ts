import type { BigO, Comparator, SortedArray } from "../../types.ts";
import { unsafeCastSortedArray } from "../../types.ts";

export class NativeSort {
  static readonly algorithmName = "Native sort";
  static readonly bigO: BigO = { time: "O(n log n)", space: "O(n)" };

  static run<T>(array: readonly T[], compare: Comparator<T>): SortedArray<T> {
    return unsafeCastSortedArray([...array].sort(compare));
  }
}
