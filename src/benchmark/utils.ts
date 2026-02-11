import type { Comparator } from "../types.ts";

export const compareNumber: Comparator<number> = (a, b) => a - b;

export interface BenchmarkResult {
  avgMs: number;
  minMs: number;
  maxMs: number;
}

export function benchmark(
  fn: () => void,
  iterations: number,
): BenchmarkResult {
  // brief warmup for JIT optimization
  for (let i = 0; i < 10; i++) {
    fn();
  }

  // measure each iteration individually for per-iteration stats
  const times: number[] = new Array(iterations);

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    fn();
    times[i] = performance.now() - start;
  }

  let min = times[0];
  let max = times[0];
  let sum = times[0];

  for (let i = 1; i < times.length; i++) {
    if (times[i] < min) min = times[i];
    if (times[i] > max) max = times[i];
    sum += times[i];
  }

  return {
    avgMs: sum / iterations,
    minMs: min,
    maxMs: max,
  };
}
