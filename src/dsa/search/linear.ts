import type { Comparator, Index } from "../../types.ts";
import { asIndex } from "../../types.ts";
import { variant } from "../../decorators.ts";

export class LinearSearch {
  @variant({ name: "Linear search", bigO: { time: "O(n)", space: "O(1)" } })
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
