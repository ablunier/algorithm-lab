import { Node, Primitive } from "./linked-list.ts";

export class NthNodeToLast<T extends Primitive> {
  // O(n) time, O(n) space
  public arrayIndex(head: Node<T>, n: number): Node<T> | null {
    const nodes: Node<T>[] = [];

    let current: Node<T> | null = head;
    while (current !== null) {
      nodes.push(current);
      current = current.next;
    }

    const index = nodes.length - n;
    return index >= 0 ? nodes[index] : null;
  }

  // O(n) time, O(1) space
  public twoPass(head: Node<T>, n: number): Node<T> | null {
    let length = 0;
    let current: Node<T> | null = head;
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

  // O(n) time, O(1) space
  public runner(head: Node<T>, n: number): Node<T> | null {
    let pos1: Node<T> | null = head;
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
