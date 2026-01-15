import { linearSearch } from "../search/linear.ts";
import { binarySearch } from "../search/binary.ts";
import { mergeSort } from "../sort/merge.ts";
import { nativeSort } from "../sort/native.ts";
import { selectionSort } from "../sort/selection.ts";
import { insertionSort } from "../sort/insertion.ts";
import { toSortedArray, type Comparator } from "../types.ts";

const compareNumber: Comparator<number> = (a, b) => a - b;

function benchmark(name: string, fn: () => void, iterations: number): void {
  // warmup for JIT optimization
  for (let i = 0; i < 1_000; i++) {
    fn();
  }

  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();

  console.log(`${name}: ${(end - start).toFixed(2)} ms (${iterations} runs)`);
}

// Search benchmarks
const size = 1_000_000;
const haystack = Array.from({ length: size }, (_, i) => i);
const sortedHaystack = toSortedArray(haystack, compareNumber);
const needle = size - 1;

const linear = linearSearch<number>();
const binary = binarySearch<number>();

benchmark(linear.name, () => linear.search(haystack, needle, compareNumber), 1_000);
benchmark(
  binary.name, 
  () => binary.search(sortedHaystack, needle, compareNumber), 
  1_000_000
);

// Sort benchmarks
const data = Array.from({ length: 10_000 }, () => Math.random());

const native = nativeSort<number>();
const merge = mergeSort<number>();
const selection = selectionSort<number>();
const insertion = insertionSort<number>();

benchmark(native.name, () => native.sort(data, compareNumber), 100);
benchmark(merge.name, () => merge.sort(data, compareNumber), 100);
benchmark(selection.name, () => selection.sort(data, compareNumber), 100);
benchmark(insertion.name, () => insertion.sort(data, compareNumber), 100);
