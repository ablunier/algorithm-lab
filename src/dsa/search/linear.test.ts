import { assertEquals } from "@std/assert";
import { LinearSearch } from "./linear.ts";
import { toSortedArray } from "../../types.ts";

const numCmp = (a: number, b: number) => a - b;
const strCmp = (a: string, b: string) => a.localeCompare(b);

Deno.test("linear search", () => {
  const arr = toSortedArray([1, 3, 5, 7, 9], numCmp);

  assertEquals(LinearSearch.run(arr, 1, numCmp), 0);
  assertEquals(LinearSearch.run(arr, 9, numCmp), 4);
  assertEquals(LinearSearch.run(arr, 5, numCmp), 2);
  assertEquals(LinearSearch.run(arr, 4, numCmp), null);
  assertEquals(LinearSearch.run([], 1, numCmp), null);

  const words = toSortedArray(["apple", "banana", "cherry"], strCmp);
  assertEquals(LinearSearch.run(words, "banana", strCmp), 1);
  assertEquals(LinearSearch.run(words, "grape", strCmp), null);
});
