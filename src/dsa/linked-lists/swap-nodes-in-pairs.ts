import { VariantMeta } from "../../types.ts";
import { Node } from "./linked-list.ts";

/**
 * 1->2->4->6->8
 */
export class SwapNodesInPairs<T> {
  static readonly variants = {
    recursive: { name: "Recursive", bigO: { time: "O(n)", space: "O(n)" } },
    iterative: { name: "Iterative", bigO: { time: "O(n)", space: "O(1)" } },
  } satisfies Record<string, VariantMeta>;

  public recursive(head: Node<T> | null): Node<T> | null {
    if (head === null || head.next === null) {
      return head;
    }

    const tmp = head.next.next;
    head.next.next = head;
    head = head.next;
    head.next!.next = this.recursive(tmp);

    return head;
  }

  public iterative(head: Node<T> | null): Node<T> | null {
    if (head === null || head.next === null) {
      return head;
    }

    const dummy = new Node<T>(null!);
    dummy.next = head;
    let prev = dummy;
    let first = prev.next;
    let second = prev.next?.next ?? null;

    while (first !== null && second !== null) {
      const nodeFirst = first;
      const nodeSecond = second;

      prev.next = nodeSecond;
      nodeFirst.next = nodeSecond.next;
      nodeSecond.next = nodeFirst;

      prev = nodeFirst;
      first = nodeFirst.next;
      second = nodeFirst.next?.next ?? null;
    }

    return dummy.next;
  }
}
