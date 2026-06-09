import { Node } from "./linked-list.ts";
import { variant } from "../../decorators.ts";

export class SwapNodesInPairs<T> {
  @variant({ name: "Recursive", bigO: { time: "O(n)", space: "O(n)" } })
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

  @variant({ name: "Iterative", bigO: { time: "O(n)", space: "O(1)" } })
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
