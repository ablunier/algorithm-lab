# TypeScript Algorithms Playground

This project is a personal playground to explore:

1. algorithmic complexity
2. performance characteristics
3. type-safe API design in TypeScript

## Linear vs Binary search

### Theoretical complexity

- Linear search: O(n)
- Binary search: O(log n) – requires sorted input

### Benchmark setup

- Runtime: Deno
- Data size: 1.000.000 integers
- Warmup runs before measurement for JIT optimization
- `performance.now()` for timing

### Observations

Binary search outperforms linear search significantly for large datasets, but
requires sorted input, making it unsuitable for unsorted collections.

This playground focuses on **understanding trade-offs**, not on
micro-optimizations.

## Native vs Merge vs Selection vs Insertion sort

### Theoretical complexity

- Native sort: O(n log n) average – implementation-dependent, mutating
- Merge sort: O(n log n) – stable, non-mutating
- Selection sort: O(n²) – non-adaptive
- Insertion sort: O(n²) worst case, O(n) best case

### Benchmark setup

- Runtime: Deno
- Data size: 10.000 integers
- Randomized input
- Warmup runs before measurement for JIT optimization
- `performance.now()` for timing

### Observations

Native sort is generally faster due to highly optimized engine implementations,
but mutates the input array and offers fewer semantic guarantees. Merge sort
provides predictable behavior and avoids side effects by returning a new sorted
array, at the cost of additional memory allocations. Despite identical
worst-case complexity between insertion an selection sort, insertion sort
performs significantly better on small or nearly sorted datasets. This
comparison highlights the trade-off between performance, safety, and
predictability and the limits of Big-O notation when analyzing real-world
performance.

## TypeScript Design Focus

This project also serves as a TypeScript design playground, exploring:

- generic-based APIs
- branded types for domain invariants
- strong interface contracts
- semantic typing beyond structural typing

TypeScript is used as a design and modeling tool, not just for type safety.
