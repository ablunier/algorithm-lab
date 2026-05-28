export type Brand<T, B extends string> = T & {
  readonly __brand: B;
};

export interface BigO {
  readonly time: string;
  readonly space: string;
}

export interface VariantMeta {
  readonly name: string;
  readonly bigO: BigO;
}

export interface AlgorithmVariant<TInput, TOutput> {
  readonly name: string;
  readonly bigO: BigO;
  run(input: TInput): TOutput;
}

export interface Problem<TInput, TOutput> {
  readonly name: string;
  readonly category: string;
  readonly variants: AlgorithmVariant<TInput, TOutput>[];
  generateInput(size: number): TInput;
}

export type SortedArray<T> = Brand<readonly T[], "SortedArray">;

export type Index = Brand<number, "Index">;

export type Comparator<T> = (a: T, b: T) => number;

export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined;

export type SortablePrimitive = string | number | bigint;

export function asIndex(value: number, length: number): Index {
  if (!Number.isInteger(value) || value < 0 || value >= length) {
    throw new Error("Invalid index");
  }

  return value as Index;
}

export function unsafeCastSortedArray<T>(array: readonly T[]): SortedArray<T> {
  return array as unknown as SortedArray<T>;
}

export function toSortedArray<T>(
  array: readonly T[],
  compare: Comparator<T>,
): SortedArray<T> {
  return unsafeCastSortedArray([...array].sort(compare));
}
