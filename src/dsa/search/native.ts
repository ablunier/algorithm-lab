import type { BigO, Comparator, Index } from "../../types.ts";
import { asIndex } from "../../types.ts";

export class NativeSearch {
  static readonly algorithmName = "Native search";
  static readonly bigO: BigO = { time: "O(n)", space: "O(1)" };

  static run<T>(
    array: readonly T[],
    value: T,
    compare: Comparator<T>,
  ): Index | null {
    const index = array.findIndex((element) => compare(element, value) === 0);
    return index === -1 ? null : asIndex(index, array.length);
  }
}
