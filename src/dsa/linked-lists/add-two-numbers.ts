import { Node } from "../node.ts";
import { variant } from "../../decorators.ts";

export class AddTwoNumbers {
  @variant({ name: "By conversion", bigO: { time: "O(n + m)", space: "O(n + m)" } })
  public byConversion(list1: Node<number>, list2: Node<number>): Node<number> {
    const toNumber = (node: Node<number>): number => {
      const digits: number[] = [];

      let current: Node<number> | null = node;

      while (current !== null) {
        digits.push(current.value);
        current = current.next;
      }

      return Number(digits.reverse().join(""));
    };

    const resultValues = Array.from(
      String(toNumber(list1) + toNumber(list2)),
      Number,
    );

    const resultList = new Node<number>(Number(resultValues.pop()));

    let current: Node<number> | null = resultList;
    for (const digit of resultValues.reverse()) {
      current.next = new Node<number>(Number(digit));
      current = current.next;
    }

    return resultList;
  }

  @variant({ name: "With carry", bigO: { time: "O(n + m)", space: "O(n + m)" } })
  public withCarry(list1: Node<number>, list2: Node<number>): Node<number> {
    const result = new Node<number>(-1);
    let current = result;
    let carry = 0;
    let node1: Node<number> | null = list1;
    let node2: Node<number> | null = list2;

    while (node1 !== null || node2 !== null) {
      current.next = new Node<number>(-1);
      current = current.next;
      let digit = carry;

      if (node1 !== null) {
        digit += node1.value;
        node1 = node1.next;
      }

      if (node2 !== null) {
        digit += node2.value;
        node2 = node2.next;
      }

      carry = Math.floor(digit / 10);
      digit = digit % 10;

      current.value = digit;
    }

    if (carry > 0) {
      current.next = new Node<number>(carry);
    }

    return result.next!;
  }
}
