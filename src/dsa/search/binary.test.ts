import { assertEquals } from "@std/assert";
import { BinarySearch } from "./binary.ts";
import { toSortedArray } from "../../types.ts";

const numCmp = (a: number, b: number) => a - b;
const strCmp = (a: string, b: string) => a.localeCompare(b);

Deno.test("binary search", () => {
  const arr = toSortedArray([1, 3, 5, 7, 9], numCmp);

  assertEquals(BinarySearch.run(arr, 1, numCmp), 0);
  assertEquals(BinarySearch.run(arr, 9, numCmp), 4);
  assertEquals(BinarySearch.run(arr, 5, numCmp), 2);
  assertEquals(BinarySearch.run(arr, 4, numCmp), null);
  assertEquals(BinarySearch.run(toSortedArray([], numCmp), 1, numCmp), null);

  const words = toSortedArray(["apple", "banana", "cherry"], strCmp);
  assertEquals(BinarySearch.run(words, "banana", strCmp), 1);
  assertEquals(BinarySearch.run(words, "grape", strCmp), null);
});
