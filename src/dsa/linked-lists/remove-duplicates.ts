import type { Primitive } from "../../types.ts";
import { ListNode } from "../node.ts";
import { variant } from "../../decorators.ts";

export class RemoveDuplicates<T extends Primitive> {
  @variant({ name: "Without additional memory", bigO: { time: "O(n²)", space: "O(1)" } })
  public withoutAdditionalMemory(head: ListNode<T>): void {
    let current = head;

    while (current !== null && current.next !== null) {
      let runner = current;

      while (runner !== null && runner.next !== null) {
        if (current.value === runner.next.value) {
          runner.next = runner.next.next;
        } else {
          runner = runner.next;
        }
      }

      current = current.next;
    }
  }

  @variant({ name: "Hash set", bigO: { time: "O(n)", space: "O(n)" } })
  public hashSet(head: ListNode<T>): void {
    if (head === null) {
      return;
    }

    const seen = new Set<T>();
    let current = head;
    seen.add(current.value);

    while (current !== null && current.next !== null) {
      if (seen.has(current.next.value)) {
        current.next = current.next.next;
      }

      if (current.next !== null) {
        seen.add(current.next.value);

        current = current.next;
      }
    }
  }
}
