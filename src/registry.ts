import type { AlgorithmVariant, Index, Problem, SortedArray, VariantMeta } from "./types.ts";
import { toSortedArray } from "./types.ts";
import { variantMetas } from "./decorators.ts";
import { compareNumber } from "./benchmark/utils.ts";
import { LinearSearch } from "./dsa/search/linear.ts";
import { BinarySearch } from "./dsa/search/binary.ts";
import { NativeSearch } from "./dsa/search/native.ts";
import { InsertionSort } from "./dsa/sort/insertion.ts";
import { SelectionSort } from "./dsa/sort/selection.ts";
import { MergeSort } from "./dsa/sort/merge.ts";
import { NativeSort } from "./dsa/sort/native.ts";
import { IsUnique } from "./dsa/arrays-strings-hash-tables/is-unique.ts";
import { Concat } from "./dsa/arrays-strings-hash-tables/concat.ts";
import { GroupAnagrams } from "./dsa/arrays-strings-hash-tables/group-anagrams.ts";
import { TwoSum } from "./dsa/arrays-strings-hash-tables/two-sum.ts";
import { ZeroMatrix } from "./dsa/arrays-strings-hash-tables/zero-matrix.ts";
import { Node } from "./dsa/linked-lists/linked-list.ts";
import { RemoveDuplicates } from "./dsa/linked-lists/remove-duplicates.ts";
import { NthNodeToLast } from "./dsa/linked-lists/nth-node-to-last.ts";
import { MergeTwoSorted } from "./dsa/linked-lists/merge-two-sorted.ts";
import { AddTwoNumbers } from "./dsa/linked-lists/add-two-numbers.ts";
import { SwapNodesInPairs } from "./dsa/linked-lists/swap-nodes-in-pairs.ts";

// --- helpers ---

function withRuns<TInput, TOutput>(
  metas: VariantMeta[],
  ...runs: Array<(input: TInput) => TOutput>
): AlgorithmVariant<TInput, TOutput>[] {
  return metas.map((meta, i) => ({ ...meta, run: runs[i]! }));
}

function buildList<T>(values: T[]): Node<T> | null {
  if (values.length === 0) return null;
  const head = new Node<T>(values[0]);
  let cur = head;
  for (let i = 1; i < values.length; i++) {
    cur.next = new Node<T>(values[i]);
    cur = cur.next;
  }
  return head;
}

function randomLowercaseWord(length: number): string {
  let w = "";
  for (let i = 0; i < length; i++) {
    w += String.fromCharCode(97 + Math.floor(Math.random() * 26));
  }
  return w;
}

// --- search ---

type SearchInput = { array: SortedArray<number>; value: number };

const searchProblem: Problem<SearchInput, Index | null> = {
  name: "Search",
  category: "search",
  generateInput: (size) => ({
    array: toSortedArray(
      Array.from({ length: size }, (_, i) => i),
      compareNumber,
    ),
    value: size - 1,
  }),
  variants: [
    { ...variantMetas(LinearSearch)[0], run: ({ array, value }) => LinearSearch.run(array, value, compareNumber) },
    { ...variantMetas(BinarySearch)[0], run: ({ array, value }) => BinarySearch.run(array, value, compareNumber) },
    { ...variantMetas(NativeSearch)[0], run: ({ array, value }) => NativeSearch.run(array, value, compareNumber) },
  ],
};

// --- sort ---

const sortProblem: Problem<number[], SortedArray<number>> = {
  name: "Sort",
  category: "sort",
  generateInput: (size) => Array.from({ length: size }, () => Math.random()),
  variants: [
    { ...variantMetas(InsertionSort)[0], run: (array) => InsertionSort.run(array, compareNumber) },
    { ...variantMetas(SelectionSort)[0], run: (array) => SelectionSort.run(array, compareNumber) },
    { ...variantMetas(MergeSort)[0], run: (array) => MergeSort.run(array, compareNumber) },
    { ...variantMetas(NativeSort)[0], run: (array) => NativeSort.run(array, compareNumber) },
  ],
};

// --- arrays / strings / hash tables ---

const isUniqueProblem: Problem<string, boolean> = {
  name: "Is Unique",
  category: "arrays-strings-hash-tables",
  generateInput: (size) => {
    // worst-case: all unique characters — algorithms must scan the full string
    const chars = Array.from(
      { length: size },
      (_, i) => String.fromCodePoint(0x0041 + i),
    );
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join("");
  },
  variants: withRuns(variantMetas(IsUnique),
    (s) => IsUnique.bruteForce(s),
    (s) => IsUnique.sortThenScan(s),
    (s) => IsUnique.hashSet(s),
  ),
};

type ConcatInput = { words: string[]; glue: string };

const concatProblem: Problem<ConcatInput, string> = {
  name: "Concat",
  category: "arrays-strings-hash-tables",
  generateInput: (size) => ({
    words: Array.from({ length: size }, () => randomLowercaseWord(5)),
    glue: " ",
  }),
  variants: withRuns(variantMetas(Concat),
    ({ words, glue }) => Concat.naive(words, glue),
    ({ words, glue }) => Concat.pushAndJoin(words, glue),
  ),
};

const groupAnagramsProblem: Problem<string[], string[][]> = {
  name: "Group Anagrams",
  category: "arrays-strings-hash-tables",
  generateInput: (size) =>
    Array.from(
      { length: size },
      () => randomLowercaseWord(5 + Math.floor(Math.random() * 4)),
    ),
  variants: withRuns(variantMetas(GroupAnagrams),
    (words) => GroupAnagrams.bruteForce(words),
    (words) => GroupAnagrams.hashMapAscii(words),
    (words) => GroupAnagrams.hashMapUniversal(words),
  ),
};

type TwoSumInput = { nums: number[]; target: number };

const twoSumProblem: Problem<TwoSumInput, number[] | null> = {
  name: "Two Sum",
  category: "arrays-strings-hash-tables",
  generateInput: (size) => {
    const nums = Array.from(
      { length: size },
      () => Math.floor(Math.random() * 10_000),
    );
    const i = Math.floor(size * 0.3);
    const j = Math.floor(size * 0.7);
    return { nums, target: nums[i] + nums[j] };
  },
  variants: withRuns(variantMetas(TwoSum),
    ({ nums, target }) => TwoSum.bruteForce(nums, target),
    ({ nums, target }) => TwoSum.hashMap(nums, target),
    ({ nums, target }) => TwoSum.twoPointers(nums, target),
  ),
};

const zeroMatrixProblem: Problem<number[][], number[][]> = {
  name: "Zero Matrix",
  category: "arrays-strings-hash-tables",
  generateInput: (size) => {
    const k = Math.ceil(Math.sqrt(size));
    return Array.from(
      { length: k },
      () =>
        Array.from(
          { length: k },
          () => (Math.random() < 0.1 ? 0 : Math.floor(Math.random() * 9) + 1),
        ),
    );
  },
  variants: withRuns(variantMetas(ZeroMatrix),
    (matrix) => ZeroMatrix.bruteForce(matrix.map((row) => [...row])),
    (matrix) => ZeroMatrix.withSets(matrix.map((row) => [...row])),
    (matrix) => ZeroMatrix.inPlace(matrix.map((row) => [...row])),
  ),
};

// --- linked lists ---

const removeDups = new RemoveDuplicates<number>();

const removeDuplicatesProblem: Problem<number[], void> = {
  name: "Remove Duplicates",
  category: "linked-lists",
  generateInput: (size) =>
    Array.from(
      { length: size },
      () => Math.floor(Math.random() * Math.ceil(size * 0.7)),
    ),
  variants: withRuns(variantMetas(RemoveDuplicates),
    (values) => removeDups.withoutAdditionalMemory(buildList(values)!),
    (values) => removeDups.hashSet(buildList(values)!),
  ),
};

type NthNodeInput = { values: number[]; n: number };

const nthNodeToLast = new NthNodeToLast<number>();

const nthNodeToLastProblem: Problem<NthNodeInput, Node<number> | null> = {
  name: "Nth Node to Last",
  category: "linked-lists",
  generateInput: (size) => ({
    values: Array.from(
      { length: size },
      () => Math.floor(Math.random() * 1_000),
    ),
    n: Math.max(1, Math.floor(size / 3)),
  }),
  variants: withRuns(variantMetas(NthNodeToLast),
    ({ values, n }) => nthNodeToLast.arrayIndex(buildList(values)!, n),
    ({ values, n }) => nthNodeToLast.twoPass(buildList(values)!, n),
    ({ values, n }) => nthNodeToLast.runner(buildList(values)!, n),
  ),
};

type MergeTwoSortedInput = { list1Values: number[]; list2Values: number[] };

const mergeTwoSorted = new MergeTwoSorted<number>();

const mergeTwoSortedProblem: Problem<MergeTwoSortedInput, Node<number> | null> =
  {
    name: "Merge Two Sorted",
    category: "linked-lists",
    generateInput: (size) => {
      const half = Math.floor(size / 2);
      const list1Values = Array.from(
        { length: half },
        () => Math.floor(Math.random() * 10_000),
      ).sort(
        compareNumber,
      );
      const list2Values = Array.from(
        { length: size - half },
        () => Math.floor(Math.random() * 10_000),
      ).sort(compareNumber);
      return { list1Values, list2Values };
    },
    variants: withRuns(variantMetas(MergeTwoSorted),
      ({ list1Values, list2Values }) => mergeTwoSorted.bruteForce(buildList(list1Values), buildList(list2Values)),
      ({ list1Values, list2Values }) => mergeTwoSorted.twoPointer(buildList(list1Values), buildList(list2Values)),
    ),
  };

type AddTwoNumbersInput = { list1Values: number[]; list2Values: number[] };

const addTwoNumbers = new AddTwoNumbers();

const addTwoNumbersProblem: Problem<AddTwoNumbersInput, Node<number>> = {
  name: "Add Two Numbers",
  category: "linked-lists",
  generateInput: (size) => {
    const half = Math.floor(size / 2);
    const list1Values = Array.from(
      { length: half },
      () => Math.floor(Math.random() * 10),
    );
    const list2Values = Array.from(
      { length: size - half },
      () => Math.floor(Math.random() * 10),
    );
    return { list1Values, list2Values };
  },
  variants: withRuns(variantMetas(AddTwoNumbers),
    ({ list1Values, list2Values }) => addTwoNumbers.byConversion(buildList(list1Values)!, buildList(list2Values)!),
    ({ list1Values, list2Values }) => addTwoNumbers.withCarry(buildList(list1Values)!, buildList(list2Values)!),
  ),
};

const swapNodesInPairs = new SwapNodesInPairs<number>();

const swapNodesInPairsProblem: Problem<number[], Node<number> | null> = {
  name: "Swap Nodes in Pairs",
  category: "linked-lists",
  generateInput: (size) =>
    Array.from({ length: size }, () => Math.floor(Math.random() * 1_000)),
  variants: withRuns(variantMetas(SwapNodesInPairs),
    (values) => swapNodesInPairs.recursive(buildList(values)),
    (values) => swapNodesInPairs.iterative(buildList(values)),
  ),
};

// deno-lint-ignore no-explicit-any
export const registry: Problem<any, any>[] = [
  searchProblem,
  sortProblem,
  isUniqueProblem,
  concatProblem,
  groupAnagramsProblem,
  twoSumProblem,
  zeroMatrixProblem,
  removeDuplicatesProblem,
  nthNodeToLastProblem,
  mergeTwoSortedProblem,
  addTwoNumbersProblem,
  swapNodesInPairsProblem,
];
