import { ListNode } from "../node.ts";

export class Queue<T> {
  private first: ListNode<T> | null = null;
  private last: ListNode<T> | null = null;

  public add(value: T) {
    const newLast = new ListNode<T>(value);
    if (this.last !== null) {
      this.last.next = newLast;
    }

    this.last = newLast;

    if (this.first === null) {
      this.first = this.last;
    }
  }

  public remove(): T {
    if (this.first === null) {
      throw new Error("Empty queue");
    }

    const firstValue = this.first.value;
    this.first = this.first.next;

    return firstValue;
  }

  public peek(): T {
    if (this.first === null) {
      throw new Error("Empty queue");
    }

    return this.first.value;
  }

  public isEmpty(): boolean {
    return this.first === null;
  }
}
