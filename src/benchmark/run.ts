import { toSortedArray } from "../types.ts";
import { benchmark, compareNumber } from "./utils.ts";

export async function runBenchmarks(
  selectedAlgorithms: string[],
  iterations: number,
): Promise<void> {
  for (const algorithmName of selectedAlgorithms) {
    switch (algorithmName) {
      case "linearSearch": {
        const { linearSearch } = await import("../search/linear.ts");
        const size = 1_000_000;
        const haystack = Array.from({ length: size }, (_, i) => i);
        const needle = size - 1;
        const linear = linearSearch<number>();
        const result = benchmark(
          linear.name,
          () => linear.search(haystack, needle, compareNumber),
          iterations,
        );
        console.log(result);
        break;
      }
      case "binarySearch": {
        const { binarySearch } = await import("../search/binary.ts");
        const size = 1_000_000;
        const haystack = Array.from({ length: size }, (_, i) => i);
        const needle = size - 1;
        const binary = binarySearch<number>();
        const result = benchmark(
          binary.name,
          () =>
            binary.search(
              toSortedArray(haystack, compareNumber),
              needle,
              compareNumber,
            ),
          iterations,
        );
        console.log(result);
        break;
      }
      case "insertionSort": {
        const { insertionSort } = await import("../sort/insertion.ts");
        const data = Array.from({ length: 10_000 }, () => Math.random());
        const sort = insertionSort<number>();
        const result = benchmark(
          sort.name,
          () => sort.sort(data, compareNumber),
          iterations,
        );
        console.log(result);
        break;
      }
      case "selectionSort": {
        const { selectionSort } = await import("../sort/selection.ts");
        const data = Array.from({ length: 10_000 }, () => Math.random());
        const sort = selectionSort<number>();
        const result = benchmark(
          sort.name,
          () => sort.sort(data, compareNumber),
          iterations,
        );
        console.log(result);
        break;
      }
      case "mergeSort": {
        const { mergeSort } = await import("../sort/merge.ts");
        const data = Array.from({ length: 10_000 }, () => Math.random());
        const sort = mergeSort<number>();
        const result = benchmark(
          sort.name,
          () => sort.sort(data, compareNumber),
          iterations,
        );
        console.log(result);
        break;
      }
      case "nativeSort": {
        const { nativeSort } = await import("../sort/native.ts");
        const data = Array.from({ length: 10_000 }, () => Math.random());
        const sort = nativeSort<number>();
        const result = benchmark(
          sort.name,
          () => sort.sort(data, compareNumber),
          iterations,
        );
        console.log(result);
        break;
      }
    }
  }
}
