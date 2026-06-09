import type { Comparator, Index } from "../../types.ts";
import { asIndex } from "../../types.ts";
import { variant } from "../../decorators.ts";

export class NativeSearch {
  @variant({ name: "Native search", bigO: { time: "O(n)", space: "O(1)" } })

  static run<T>(
    array: readonly T[],
    value: T,
    compare: Comparator<T>,
  ): Index | null {
    const index = array.findIndex((element) => compare(element, value) === 0);
    return index === -1 ? null : asIndex(index, array.length);
  }
}
