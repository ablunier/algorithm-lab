import type { SearchAlgorithm } from "../../types.ts";
import { asIndex } from "../../types.ts";

export const nativeSearch = <T>(): SearchAlgorithm<T, readonly T[]> => ({
  name: "Native search",
  bigO: "O(n)",

  search(array, value, compare) {
    const index = array.findIndex((element) => compare(element, value) === 0);
    return index === -1 ? null : asIndex(index, array.length);
  },
});
