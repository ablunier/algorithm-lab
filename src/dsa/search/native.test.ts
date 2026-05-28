import { assertEquals } from "@std/assert";
import { NativeSearch } from "./native.ts";
import { toSortedArray } from "../../types.ts";

const numCmp = (a: number, b: number) => a - b;
const strCmp = (a: string, b: string) => a.localeCompare(b);

Deno.test("native search", () => {
  const arr = toSortedArray([1, 3, 5, 7, 9], numCmp);

  assertEquals(NativeSearch.run(arr, 1, numCmp), 0);
  assertEquals(NativeSearch.run(arr, 9, numCmp), 4);
  assertEquals(NativeSearch.run(arr, 5, numCmp), 2);
  assertEquals(NativeSearch.run(arr, 4, numCmp), null);
  assertEquals(NativeSearch.run([], 1, numCmp), null);

  const words = toSortedArray(["apple", "banana", "cherry"], strCmp);
  assertEquals(NativeSearch.run(words, "banana", strCmp), 1);
  assertEquals(NativeSearch.run(words, "grape", strCmp), null);
});
