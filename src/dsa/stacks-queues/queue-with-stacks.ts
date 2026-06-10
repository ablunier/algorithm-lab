import { Stack } from "./stack.ts";
import { variant } from "../../decorators.ts";

export class QueueWithStacks<T> {
  private firstStack = new Stack<T>();
  private secondStack = new Stack<T>();

  @variant({
    name: "Queue with two Stacks - add",
    bigO: { time: "O(1)", space: "O(n)" },
  })
  public add(value: T): void {
    this.firstStack.push(value);
  }

  public peek(): T {
    this.shiftStacks();
    return this.secondStack.peek();
  }

  @variant({
    name: "Queue with two Stacks - remove",
    bigO: { time: "O(n)", space: "O(n)" },
  })
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
