import type { Comparator } from "../types.ts";

export const compareNumber: Comparator<number> = (a, b) => a - b;

export function benchmark(
  name: string,
  fn: () => void,
  iterations: number,
): string {
  // warmup for JIT optimization
  for (let i = 0; i < 1_000; i++) {
    fn();
  }

  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();

  return `${name}: ${(end - start).toFixed(2)} ms (${iterations} runs)`;
}
