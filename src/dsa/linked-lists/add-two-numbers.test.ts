import { assertEquals } from "@std/assert";
import { AddTwoNumbers } from "./add-two-numbers.ts";
import { ListNode } from "../node.ts";

Deno.test("add two numbers", () => {
  const addTwoNumbers = new AddTwoNumbers();

  const list1 = new ListNode<number>(1);
  list1.next = new ListNode<number>(2);
  list1.next.next = new ListNode<number>(4);
  list1.next.next.next = new ListNode<number>(6);

  const list2 = new ListNode<number>(5);
  list2.next = new ListNode<number>(2);
  list2.next.next = new ListNode<number>(8);

  const byConversionResult = addTwoNumbers.byConversion(list1, list2);

  assertEquals(byConversionResult.value, 6);
  assertEquals(byConversionResult.next?.value, 4);
  assertEquals(byConversionResult.next?.next?.value, 2);
  assertEquals(byConversionResult.next?.next?.next?.value, 7);

  const withCarryResult = addTwoNumbers.withCarry(list1, list2);

  assertEquals(withCarryResult.value, 6);
  assertEquals(withCarryResult.next?.value, 4);
  assertEquals(withCarryResult.next?.next?.value, 2);
  assertEquals(withCarryResult.next?.next?.next?.value, 7);
});
