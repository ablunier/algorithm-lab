import { Stack } from "./stack.ts";

export class QueueWithStacks<T> {
  private firstStack = new Stack<T>();
  private secondStack = new Stack<T>();

  // O(1) time, O(n) space
  public add(value: T): void {
    this.firstStack.push(value);
  }

  public peek(): T {
    this.shiftStacks();
    return this.secondStack.peek();
  }

  // O(n) time, O(n) space
  public remove(): T {
    this.shiftStacks();
    return this.secondStack.pop();
  }

  private shiftStacks(): void {
    if (this.secondStack.isEmpty()) {
      while (!this.firstStack.isEmpty()) {
        this.secondStack.push(this.firstStack.pop());
      }
    }
  }

  public isEmpty(): boolean {
    return this.firstStack.isEmpty() || this.secondStack.isEmpty();
  }

  public size(): number {
    return this.firstStack.size() + this.secondStack.size();
  }
}
