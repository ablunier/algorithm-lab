import { Stack } from "./stack.ts";

export class ValidParenthesis {
  private openClosePairs = new Map<string, string>();

  constructor() {
    this.openClosePairs.set("(", ")");
    this.openClosePairs.set("{", "}");
    this.openClosePairs.set("[", "]");
  }

  // O(n) time, O(n) space
  public isValid(input: string): boolean {
    const stack = new Stack<string>();

    for (const char of input) {
      if (char === "(" || char === "{" || char === "[") {
        stack.push(this.getOpposite(char));
      } else {
        if (stack.isEmpty() || stack.pop() !== char) {
          return false;
        }
      }
    }

    return stack.isEmpty();
  }

  private getOpposite(char: string): string {
    if (char === "(") return ")";
    if (char === "{") return "}";
    if (char === "[") return "]";

    return "";
  }

  // O(n) time, O(n) space
  public isValidHashMap(input: string): boolean {
    const stack = new Stack<string>();

    for (const char of input) {
      if (this.openClosePairs.has(char)) {
        stack.push(char);
      } else {
        if (stack.isEmpty() || this.openClosePairs.get(stack.pop()) !== char) {
          return false;
        }
      }
    }

    return stack.isEmpty();
  }
}
