import { SortablePrimitive } from "../../types.ts";
import { Node } from "../node.ts";
import { Stack } from "./stack.ts";

// O(1) time for push, pop and min; O(n) space
export class StackMin<T extends SortablePrimitive> extends Stack<T> {
  private minNode: Node<T> | null = null;

  public override push(value: T) {
    super.push(value);

    if (this.minNode === null || value < this.minNode.value) {
      const newMin = new Node<T>(value);
      newMin.next = this.minNode;
      this.minNode = newMin;
    }
  }

  public override pop(): T {
    const value = super.pop();

    if (this.minNode !== null && value === this.minNode.value) {
      this.minNode = this.minNode.next;
    }

    return value;
  }

  public min(): T | null {
    return this.minNode !== null ? this.minNode.value : null;
  }
}
