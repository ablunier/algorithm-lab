import { toSortedArray } from "../types.ts";
import { benchmark, type BenchmarkResult, compareNumber } from "./utils.ts";

export interface BenchmarkEntry {
  algorithm: string;
  size: number;
  result: BenchmarkResult;
}

const SORT_SIZES = [1_000, 5_000, 10_000, 50_000];
const SEARCH_SIZES = [10_000, 100_000, 500_000, 1_000_000];

export function getSizesForAlgorithm(name: string): number[] {
  switch (name) {
    case "linearSearch":
    case "binarySearch":
    case "nativeSearch":
      return SEARCH_SIZES;
    default:
      return SORT_SIZES;
  }
}

export async function* runBenchmarks(
  selectedAlgorithms: string[],
  iterations: number,
): AsyncGenerator<BenchmarkEntry> {
  for (const algorithmName of selectedAlgorithms) {
    const sizes = getSizesForAlgorithm(algorithmName);

    for (const size of sizes) {
      switch (algorithmName) {
        case "linearSearch": {
          const { linearSearch } = await import("../dsa/search/linear.ts");
          const haystack = Array.from({ length: size }, (_, i) => i);
          const needle = size - 1;
          const search = linearSearch<number>();
          yield {
            algorithm: `${search.name} ${search.bigO}`,
            size,
            result: benchmark(
              () => search.search(haystack, needle, compareNumber),
              iterations,
            ),
          };
          break;
        }
        case "binarySearch": {
          const { binarySearch } = await import("../dsa/search/binary.ts");
          const haystack = toSortedArray(
            Array.from({ length: size }, (_, i) => i),
            compareNumber,
          );
          const needle = size - 1;
          const search = binarySearch<number>();
          yield {
            algorithm: `${search.name} ${search.bigO}`,
            size,
            result: benchmark(
              () => search.search(haystack, needle, compareNumber),
              iterations,
            ),
          };
          break;
        }
        case "nativeSearch": {
          const { nativeSearch } = await import("../dsa/search/native.ts");
          const haystack = Array.from({ length: size }, (_, i) => i);
          const needle = size - 1;
          const search = nativeSearch<number>();
          yield {
            algorithm: `${search.name} ${search.bigO}`,
            size,
            result: benchmark(
              () => search.search(haystack, needle, compareNumber),
              iterations,
            ),
          };
          break;
        }
        case "insertionSort": {
          const { insertionSort } = await import("../dsa/sort/insertion.ts");
          const data = Array.from({ length: size }, () => Math.random());
          const sort = insertionSort<number>();
          yield {
            algorithm: `${sort.name} ${sort.bigO}`,
            size,
            result: benchmark(
              () => sort.sort(data, compareNumber),
              iterations,
            ),
          };
          break;
        }
        case "selectionSort": {
          const { selectionSort } = await import("../dsa/sort/selection.ts");
          const data = Array.from({ length: size }, () => Math.random());
          const sort = selectionSort<number>();
          yield {
            algorithm: `${sort.name} ${sort.bigO}`,
            size,
            result: benchmark(
              () => sort.sort(data, compareNumber),
              iterations,
            ),
          };
          break;
        }
        case "mergeSort": {
          const { mergeSort } = await import("../dsa/sort/merge.ts");
          const data = Array.from({ length: size }, () => Math.random());
          const sort = mergeSort<number>();
          yield {
            algorithm: `${sort.name} ${sort.bigO}`,
            size,
            result: benchmark(
              () => sort.sort(data, compareNumber),
              iterations,
            ),
          };
          break;
        }
        case "nativeSort": {
          const { nativeSort } = await import("../dsa/sort/native.ts");
          const data = Array.from({ length: size }, () => Math.random());
          const sort = nativeSort<number>();
          yield {
            algorithm: `${sort.name} ${sort.bigO}`,
            size,
            result: benchmark(
              () => sort.sort(data, compareNumber),
              iterations,
            ),
          };
          break;
        }
      }
    }
  }
}
