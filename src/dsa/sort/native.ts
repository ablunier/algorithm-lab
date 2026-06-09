import type { Comparator, SortedArray } from "../../types.ts";
import { unsafeCastSortedArray } from "../../types.ts";
import { variant } from "../../decorators.ts";

export class NativeSort {
  @variant({ name: "Native sort", bigO: { time: "O(n log n)", space: "O(n)" } })

  static run<T>(array: readonly T[], compare: Comparator<T>): SortedArray<T> {
    return unsafeCastSortedArray([...array].sort(compare));
  }
}
