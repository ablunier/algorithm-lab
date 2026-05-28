import { assertEquals } from "@std/assert";
import { SelectionSort } from "./selection.ts";
import { toSortedArray } from "../../types.ts";

const numCmp = (a: number, b: number) => a - b;
const strCmp = (a: string, b: string) => a.localeCompare(b);

Deno.test("selection sort", () => {
  assertEquals(SelectionSort.run([3, 1, 4, 1, 5, 9, 2, 6], numCmp), toSortedArray([1, 1, 2, 3, 4, 5, 6, 9], numCmp));
  assertEquals(SelectionSort.run([1, 2, 3], numCmp), toSortedArray([1, 2, 3], numCmp));
  assertEquals(SelectionSort.run([3, 2, 1], numCmp), toSortedArray([1, 2, 3], numCmp));
  assertEquals(SelectionSort.run([42], numCmp), toSortedArray([42], numCmp));
  assertEquals(SelectionSort.run([], numCmp), toSortedArray([], numCmp));
  assertEquals(SelectionSort.run(["banana", "apple", "cherry"], strCmp), toSortedArray(["apple", "banana", "cherry"], strCmp));
});
