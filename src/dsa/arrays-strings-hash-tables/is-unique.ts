/**
 * Given a string, determine if it has all unique characters.
 *
 * The only way to optimize this further to O(1) would be to limit the character set to a fixed
 * size (e.g., ASCII), and early return false if the string length exceeds that size. However,
 * in general, we cannot guarantee O(1) time complexity for this problem without additional
 * constraints on the input.
 */

import type { VariantMeta } from "../../types.ts";

export class IsUnique {
  static readonly variants = {
    bruteForce: { name: "Brute force", bigO: { time: "O(n²)", space: "O(1)" } },
    sortThenScan: {
      name: "Sort then scan",
      bigO: { time: "O(n log n)", space: "O(n)" },
    },
    hashSet: { name: "Hash set", bigO: { time: "O(n)", space: "O(n)" } },
  } satisfies Record<string, VariantMeta>;

  public static bruteForce(s: string): boolean {
    const chars = [...s];

    for (let i = 0; i < chars.length; i++) {
      for (let j = i + 1; j < chars.length; j++) {
        if (chars[i] === chars[j]) {
          return false;
        }
      }
    }

    return true;
  }

  public static sortThenScan(s: string): boolean {
    const sorted = [...s].sort();

    for (let i = 0; i < sorted.length - 1; i++) {
      if (sorted[i] === sorted[i + 1]) {
        return false;
      }
    }

    return true;
  }

  public static hashSet(s: string): boolean {
    const seen = new Set<string>();

    for (const char of s) {
      if (seen.has(char)) {
        return false;
      }

      seen.add(char);
    }

    return true;
  }
}
