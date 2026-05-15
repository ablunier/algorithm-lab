import { assertEquals, assertThrows } from "@std/assert";
import { GroupAnagrams } from "./group-anagrams.ts";

Deno.test("group anagrams", () => {
  const input = ["eat", "tea", "tan", "ate", "nat", "bat"];
  const expected = [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]];

  assertEquals(GroupAnagrams.bruteForce(input), expected);
  assertEquals(GroupAnagrams.hashMapAscii(input), expected);
  assertEquals(GroupAnagrams.hashMapUniversal(input), expected);
});

Deno.test("group anagrams hash map fails with non ASCII characters", () => {
  assertThrows(
    () => GroupAnagrams.hashMapAscii(["café", "tea"]),
    Error,
    `Non-ASCII characters in word: "café"`,
  );
});
