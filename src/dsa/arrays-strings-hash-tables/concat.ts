/**
 * Given an array of words and a separator, join them into a single string.
 *
 * Note: modern engines (V8, SpiderMonkey) sometimes optimize `+=` loops internally via rope
 * structures, so real-world benchmarks may not show a full n² curve — but the theoretical
 * worst-case complexity remains O(n²).
 */
export class Concat {
  // O(n²·w) time, O(L) space — n = word count, w = avg word length, L = output length
  public static naive(words: string[], glue: string): string {
    let concat = "";

    for (const word of words) {
      concat += `${word}${glue}`;
    }

    return concat.slice(0, glue.length * -1);
  }

  // O(n + L) time, O(n + L) space
  public static pushAndJoin(words: string[], glue: string): string {
    const concat = [];

    for (const word of words) {
      concat.push(word);
    }

    return concat.join(glue);
  }
}
