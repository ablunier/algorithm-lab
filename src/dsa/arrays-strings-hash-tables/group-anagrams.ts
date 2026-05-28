import type { VariantMeta } from "../../types.ts";

export class GroupAnagrams {
  static readonly variants = {
    bruteForce: {
      name: "Brute force",
      bigO: { time: "O(n²·k log k)", space: "O(n)" },
    },
    hashMapAscii: {
      name: "Hash map (ASCII)",
      bigO: { time: "O(n·k)", space: "O(n)" },
    },
    hashMapUniversal: {
      name: "Hash map (universal)",
      bigO: { time: "O(n·k log k)", space: "O(n)" },
    },
  } satisfies Record<string, VariantMeta>;

  public static bruteForce(words: string[]): string[][] {
    const visited = new Array(words.length).fill(false);
    const groups: string[][] = [];

    for (let i = 0; i < words.length; i++) {
      if (visited[i]) continue;

      const group = [words[i]];
      const sortedI = words[i].split("").sort().join("");

      for (let j = i + 1; j < words.length; j++) {
        if (!visited[j] && words[j].split("").sort().join("") === sortedI) {
          group.push(words[j]);
          visited[j] = true;
        }
      }

      groups.push(group);
    }

    return groups;
  }

  public static hashMapAscii(words: string[]): string[][] {
    const groups = new Map<string, string[]>();

    for (const word of words) {
      const key = GroupAnagrams.getAsciiAnagramHash(word);

      if (!groups.has(key)) {
        groups.set(key, []);
      }

      groups.get(key)!.push(word);
    }

    return Array.from(groups.values());
  }

  public static hashMapUniversal(words: string[]): string[][] {
    const groups = new Map<string, string[]>();

    for (const word of words) {
      const key = GroupAnagrams.getUniversalAnagramHash(word);

      if (!groups.has(key)) {
        groups.set(key, []);
      }

      groups.get(key)!.push(word);
    }

    return Array.from(groups.values());
  }

  private static getUniversalAnagramHash(word: string) {
    const counts = new Map<string, number>();

    for (const char of word.toLowerCase()) {
      counts.set(char, (counts.get(char) ?? 0) + 1);
    }

    const key = [...counts.entries()].sort().join("|");

    return key;
  }

  private static getAsciiAnagramHash(word: string): string {
    if ([...word].some((c) => c.charCodeAt(0) > 127)) {
      throw new Error(`Non-ASCII characters in word: "${word}"`);
    }

    const letterCount = new Array(26).fill(0);

    for (const character of word) {
      letterCount[character.toLowerCase().charCodeAt(0) - "a".charCodeAt(0)]++;
    }

    return letterCount.join("|");
  }
}
