import type { Primitive } from "../../types.ts";
import { ListNode } from "../node.ts";
import { variant } from "../../decorators.ts";

export class NthNodeToLast<T extends Primitive> {
  @variant({ name: "Array index", bigO: { time: "O(n)", space: "O(n)" } })
  public arrayIndex(head: ListNode<T>, n: number): ListNode<T> | null {
    const nodes: ListNode<T>[] = [];

    let current: ListNode<T> | null = head;
    while (current !== null) {
      nodes.push(current);
      current = current.next;
    }

    const index = nodes.length - n;
    return index >= 0 ? nodes[index] : null;
  }

  @variant({ name: "Two pass", bigO: { time: "O(n)", space: "O(1)" } })
  public twoPass(head: ListNode<T>, n: number): ListNode<T> | null {
    let length = 0;
    let current: ListNode<T> | null = head;
    while (current !== null) {
      length++;
      current = current.next;
    }

    const target = length - n;
    if (target < 0) return null;

    current = head;
    for (let i = 0; i < target; i++) {
      current = current!.next;
    }
    return current;
  }

  @variant({ name: "Runner", bigO: { time: "O(n)", space: "O(1)" } })
  public runner(head: ListNode<T>, n: number): ListNode<T> | null {
    let pos1: ListNode<T> | null = head;
    let pos2 = head;

    for (let i = 0; i < n; i++) {
      if (pos1 === null) {
        return null;
      }

      pos1 = pos1.next;
    }

    while (pos1 !== null) {
      pos1 = pos1.next;
      pos2 = pos2.next!;
    }

    return pos2;
  }
}
