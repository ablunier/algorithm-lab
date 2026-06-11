import { SortablePrimitive } from "../../types.ts";
import { Stack } from "./stack.ts";

export class SortStack<T extends SortablePrimitive> {
  // O(n²) time, O(n) space
  public sort(stack: Stack<T>): Stack<T> {
    const sortedStack = new Stack<T>();

    while (!stack.isEmpty()) {
      const element = stack.pop();

      while (!sortedStack.isEmpty() && element > sortedStack.peek()) {
        stack.push(sortedStack.pop());
      }

      sortedStack.push(element);
    }

    return sortedStack;
  }
}
