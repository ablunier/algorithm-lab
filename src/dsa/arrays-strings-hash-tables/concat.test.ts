import { assertEquals } from "@std/assert";
import { Concat } from "./concat.ts";

Deno.test("concat", () => {
  const words = [
    "the",
    "quick",
    "brown",
    "fox",
    "jumps",
    "over",
    "the",
    "lazy",
    "dog",
  ];

  const sentence = "the quick brown fox jumps over the lazy dog";

  assertEquals(Concat.naive(words, " "), sentence);
  assertEquals(Concat.pushAndJoin(words, " "), sentence);
});
