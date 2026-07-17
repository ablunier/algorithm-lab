import { assertEquals } from "@std/assert";
import { RemoveDuplicates } from "./remove-duplicates.ts";
import { ListNode } from "../node.ts";

Deno.test("remove duplicates - without additional memory", () => {
  const removeDuplicates = new RemoveDuplicates<number>();

  const head = new ListNode<number>(1);
  head.next = new ListNode<number>(2);
  head.next.next = new ListNode<number>(3);
  head.next.next.next = new ListNode<number>(3);
  head.next.next.next.next = new ListNode<number>(4);
  head.next.next.next.next.next = new ListNode<number>(1);

  removeDuplicates.withoutAdditionalMemory(head);

  assertEquals(1, head.value);
  assertEquals(2, head.next.value);
  assertEquals(3, head.next.next.value);
  assertEquals(4, head.next.next.next.value);
  assertEquals(null, head.next.next.next.next);
});

Deno.test("remove duplicates - hash set", () => {
  const removeDuplicates = new RemoveDuplicates<number>();

  const head = new ListNode<number>(1);
  head.next = new ListNode<number>(2);
  head.next.next = new ListNode<number>(3);
  head.next.next.next = new ListNode<number>(3);
  head.next.next.next.next = new ListNode<number>(4);
  head.next.next.next.next.next = new ListNode<number>(1);

  removeDuplicates.hashSet(head);

  assertEquals(1, head.value);
  assertEquals(2, head.next.value);
  assertEquals(3, head.next.next.value);
  assertEquals(4, head.next.next.next.value);
  assertEquals(null, head.next.next.next.next);
});
