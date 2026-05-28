import { Table } from "@cliffy/table";
import type { BenchmarkEntry } from "./run.ts";
import type { BenchmarkResult } from "./utils.ts";

function formatSize(n: number): string {
  return n >= 1_000_000
    ? `${n / 1_000_000}M`
    : n >= 1_000
    ? `${n / 1_000}K`
    : `${n}`;
}

function formatResult(result: BenchmarkResult): string {
  const avg = result.avgMs;
  if (avg < 1) return `${(avg * 1000).toFixed(0)}us`;
  if (avg < 100) return `${avg.toFixed(2)}ms`;
  return `${avg.toFixed(0)}ms`;
}

export function createTableRenderer(
  algorithms: string[],
  sizes: number[],
  title: string,
) {
  const results = new Map<string, Map<number, BenchmarkResult>>();
  let lastLineCount = 0;

  const encoder = new TextEncoder();

  function update(entry: BenchmarkEntry): void {
    let row = results.get(entry.algorithm);
    if (!row) {
      row = new Map();
      results.set(entry.algorithm, row);
    }
    row.set(entry.size, entry.result);
  }

  function render(): void {
    // clear previous table output
    if (lastLineCount > 0) {
      Deno.stdout.writeSync(
        encoder.encode(`\x1b[${lastLineCount}A\x1b[J`),
      );
    }

    const header = ["Algorithm", ...sizes.map(formatSize)];

    const rows = algorithms.map((algo) => {
      const row = results.get(algo);
      return [
        algo,
        ...sizes.map((size) => {
          const result = row?.get(size);
          return result ? formatResult(result) : "...";
        }),
      ];
    });

    const table = new Table()
      .header(header)
      .body(rows)
      .border();

    const bold = (s: string) => `\x1b[1m${s}\x1b[0m`;
    const heading = `\n${bold(title)}\n${bold("─".repeat(title.length))}`;
    const output = `${heading}\n${table.toString()}`;
    lastLineCount = output.split("\n").length;

    console.log(output);
  }

  return { update, render };
}
