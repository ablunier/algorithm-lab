import type { Primitive, VariantMeta } from "../../types.ts";
import { Node } from "./linked-list.ts";

export class RemoveDuplicates<T extends Primitive> {
  static readonly variants = {
    withoutAdditionalMemory: {
      name: "Without additional memory",
      bigO: { time: "O(n²)", space: "O(1)" },
    },
    hashSet: { name: "Hash set", bigO: { time: "O(n)", space: "O(n)" } },
  } satisfies Record<string, VariantMeta>;

  public withoutAdditionalMemory(head: Node<T>): void {
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

  public hashSet(head: Node<T>): void {
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
