import { assertEquals } from "@std/assert";
import { IsUnique } from "./is-unique.ts";

Deno.test("isUnique", () => {
  assertEquals(IsUnique.bruteForce("abcde"), true);
  assertEquals(IsUnique.bruteForce("aAbBcCdDeE"), true);
  assertEquals(IsUnique.bruteForce("abcded"), false);

  assertEquals(IsUnique.sortThenScan("abcde"), true);
  assertEquals(IsUnique.sortThenScan("aAbBcCdDeE"), true);
  assertEquals(IsUnique.sortThenScan("abcded"), false);

  assertEquals(IsUnique.hashSet("abcde"), true);
  assertEquals(IsUnique.hashSet("aAbBcCdDeE"), true);
  assertEquals(IsUnique.hashSet("abcded"), false);
});
