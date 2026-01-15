export type Brand<T, B extends string> = T & {
  readonly __brand: B;
};

export type SortedArray<T> = Brand<readonly T[], "SortedArray">;

export type Index = Brand<number, "Index">;

export type Comparator<T> = (a: T, b: T) => number;

export interface SearchAlgorithm<T, A extends readonly T[]> {
  readonly name: string;

  search(
    array: A,
    value: T,
    compare: Comparator<T>
  ): Index | null;
}

export interface SortAlgorithm<T> {
  readonly name: string;
  readonly mutates: boolean;

  sort(
    array: readonly T[],
    compare: Comparator<T>
  ): SortedArray<T>;
}

export function asIndex(value: number, length: number): Index {
  if (!Number.isInteger(value) || value < 0 || value >= length) {
    throw new Error("Invalid index");
  }

  return value as Index;
}

export function toSortedArray<T>(array: readonly T[], compare: Comparator<T>): SortedArray<T> {
  return [...array].sort(compare) as unknown as SortedArray<T>;
}
