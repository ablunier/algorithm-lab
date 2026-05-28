/**
 * Given an array of words and a separator, join them into a single string.
 *
 * Note: modern engines (V8, SpiderMonkey) sometimes optimize `+=` loops internally via rope
 * structures, so real-world benchmarks may not show a full n² curve — but the theoretical
 * worst-case complexity remains O(n²).
 */
import type { VariantMeta } from "../../types.ts";

export class Concat {
  static readonly variants = {
    naive: { name: "Naive", bigO: { time: "O(n²·w)", space: "O(L)" } },
    pushAndJoin: {
      name: "Push and join",
      bigO: { time: "O(n+L)", space: "O(n+L)" },
    },
  } satisfies Record<string, VariantMeta>;

  public static naive(words: string[], glue: string): string {
    let concat = "";

    for (const word of words) {
      concat += `${word}${glue}`;
    }

    return concat.slice(0, glue.length * -1);
  }

  public static pushAndJoin(words: string[], glue: string): string {
    const concat = [];

    for (const word of words) {
      concat.push(word);
    }

    return concat.join(glue);
  }
}
