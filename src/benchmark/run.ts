import { registry } from "../registry.ts";
import { benchmark, type BenchmarkResult } from "./utils.ts";

export interface BenchmarkEntry {
  algorithm: string;
  size: number;
  result: BenchmarkResult;
}

export interface SelectedVariant {
  problemIndex: number;
  variantIndex: number;
}

const SEARCH_SIZES = [10_000, 100_000, 500_000, 1_000_000];
const SORT_SIZES = [1_000, 5_000, 10_000, 50_000];
const DSA_SIZES = [100, 500, 1_000, 5_000];

const CATEGORY_SIZES: Record<string, number[]> = {
  search: SEARCH_SIZES,
  sort: SORT_SIZES,
  "arrays-strings-hash-tables": DSA_SIZES,
  "linked-lists": DSA_SIZES,
};

export function getSizesForProblem(problemIndex: number): number[] {
  const problem = registry[problemIndex];
  return CATEGORY_SIZES[problem.category] ?? SORT_SIZES;
}

export async function* runBenchmarks(
  selected: SelectedVariant[],
  iterations: number,
): AsyncGenerator<BenchmarkEntry> {
  for (const { problemIndex, variantIndex } of selected) {
    const problem = registry[problemIndex];
    const variant = problem.variants[variantIndex];
    const sizes = getSizesForProblem(problemIndex);

    for (const size of sizes) {
      const input = problem.generateInput(size);
      yield {
        algorithm: `${variant.name} ${variant.bigO.time}`,
        size,
        result: benchmark(() => variant.run(input), iterations),
      };
    }
  }
}
