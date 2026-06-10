import { Node } from "../node.ts";

export class Stack<T> {
  private top: Node<T> | null = null;

  public push(value: T) {
    const newTop = new Node<T>(value);
    newTop.next = this.top;
    this.top = newTop;
  }

  public pop(): T {
    if (this.top === null) {
      throw Error("Empty stack");
    }

    const topValue = this.top?.value;
    this.top = this.top?.next;

    return topValue;
  }

  public peek(): T {
    if (this.top === null) {
      throw Error("Empty stack");
    }

    return this.top?.value;
  }

  public isEmpty(): boolean {
    return this.top === null;
  }
}
