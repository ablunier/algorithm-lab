import { ListNode } from "../node.ts";
import { variant } from "../../decorators.ts";

export class AddTwoNumbers {
  @variant({ name: "By conversion", bigO: { time: "O(n + m)", space: "O(n + m)" } })
  public byConversion(list1: ListNode<number>, list2: ListNode<number>): ListNode<number> {
    const toNumber = (node: ListNode<number>): number => {
      const digits: number[] = [];

      let current: ListNode<number> | null = node;

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

    const resultList = new ListNode<number>(Number(resultValues.pop()));

    let current: ListNode<number> | null = resultList;
    for (const digit of resultValues.reverse()) {
      current.next = new ListNode<number>(Number(digit));
      current = current.next;
    }

    return resultList;
  }

  @variant({ name: "With carry", bigO: { time: "O(n + m)", space: "O(n + m)" } })
  public withCarry(list1: ListNode<number>, list2: ListNode<number>): ListNode<number> {
    const result = new ListNode<number>(-1);
    let current = result;
    let carry = 0;
    let node1: ListNode<number> | null = list1;
    let node2: ListNode<number> | null = list2;

    while (node1 !== null || node2 !== null) {
      current.next = new ListNode<number>(-1);
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
      current.next = new ListNode<number>(carry);
    }

    return result.next!;
  }
}
