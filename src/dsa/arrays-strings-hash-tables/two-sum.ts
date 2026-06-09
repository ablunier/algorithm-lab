import { variant } from "../../decorators.ts";

export class TwoSum {
  @variant({ name: "Brute force", bigO: { time: "O(n²)", space: "O(1)" } })
  public static bruteForce(nums: number[], target: number): number[] | null {
    if (!this.hasEnoughElements(nums)) {
      return null;
    }

    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] === target) {
          return [i, j];
        }
      }
    }

    return null;
  }

  @variant({ name: "Hash map", bigO: { time: "O(n)", space: "O(n)" } })
  public static hashMap(nums: number[], target: number): number[] | null {
    if (!this.hasEnoughElements(nums)) {
      return null;
    }

    const complementMap = new Map<number, number>();

    for (let i = 0; i < nums.length; i++) {
      if (complementMap.has(nums[i])) {
        return [complementMap.get(nums[i])!, i];
      }

      const complement = target - nums[i];
      complementMap.set(complement, i);
    }

    return null;
  }

  @variant({ name: "Two pointers", bigO: { time: "O(n log n)", space: "O(n)" } })
  public static twoPointers(nums: number[], target: number): number[] | null {
    if (!this.hasEnoughElements(nums)) {
      return null;
    }

    if (this.isSorted(nums)) {
      return this.twoPointersSearch(nums, nums.map((_, i) => i), target);
    }

    const indexed = nums.map((val, i) => [val, i] as [number, number]);
    indexed.sort((a, b) => a[0] - b[0]);

    return this.twoPointersSearch(
      indexed.map(([val]) => val),
      indexed.map(([, i]) => i),
      target,
    );
  }

  private static twoPointersSearch(
    sorted: number[],
    originalIndices: number[],
    target: number,
  ): number[] | null {
    let lo = 0;
    let hi = sorted.length - 1;

    while (lo < hi) {
      const sum = sorted[lo] + sorted[hi];
      if (sum === target) {
        return [originalIndices[lo], originalIndices[hi]].sort((a, b) => a - b);
      }

      if (sum < target) {
        lo++;
      } else {
        hi--;
      }
    }

    return null;
  }

  private static isSorted(nums: number[]): boolean {
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] < nums[i - 1]) return false;
    }
    return true;
  }

  private static hasEnoughElements(nums: number[]): boolean {
    return nums.length >= 2;
  }
}
