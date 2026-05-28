# Algorithm Lab

A Deno + TypeScript playground for exploring algorithmic complexity, performance
characteristics, and type-safe API design.

## Getting started

```sh
deno task start   # interactive benchmark selector
deno task test    # run unit tests
```

An interactive CLI lets you select which algorithms to benchmark, set iteration
counts, and view results in a live-updating table.

## Complexity notation

All time and space complexities are expressed using Big O notation.

![image](./big-o-complexity-chart.svg)

## Benchmark setup

- Dataset sizes per category: search 10K–1M, sort 1K–50K, DSA problems 100–5K.
- JIT warmup phase before measurement.
- Per-iteration timing via `performance.now()` with min/avg/max reporting.
- Randomized input for sort; worst-case input for search; mixed for DSA problems.
