import { assertEquals } from "@std/assert";
import { TwoSum } from "./two-sum.ts";

Deno.test("two sum", () => {
  const nums: number[] = [9, 2, 5, 6];

  assertEquals(TwoSum.bruteForce(nums, 7), [1, 2]);
  assertEquals(TwoSum.bruteForce(nums, 100), null);

  assertEquals(TwoSum.hashMap(nums, 7), [1, 2]);
  assertEquals(TwoSum.hashMap(nums, 100), null);

  assertEquals(TwoSum.twoPointers(nums, 7), [1, 2]);
  assertEquals(TwoSum.twoPointers([2, 5, 6, 9], 7), [0, 1]);
  assertEquals(TwoSum.twoPointers(nums, 100), null);
});
