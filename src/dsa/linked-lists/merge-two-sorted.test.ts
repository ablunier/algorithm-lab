import { assertEquals } from "@std/assert";
import { MergeTwoSorted } from "./merge-two-sorted.ts";
import { ListNode } from "../node.ts";

Deno.test("merge two sorted lists - brute force", () => {
  const mergeTwoSorted = new MergeTwoSorted<number>();

  const list1 = new ListNode<number>(1);
  list1.next = new ListNode<number>(2);
  list1.next.next = new ListNode<number>(4);
  list1.next.next.next = new ListNode<number>(6);

  const list2 = new ListNode<number>(2);
  list2.next = new ListNode<number>(3);
  list2.next.next = new ListNode<number>(5);

  const sortedList = mergeTwoSorted.bruteForce(list1, list2);

  assertEquals(sortedList?.value, 1);
  assertEquals(sortedList?.next?.value, 2);
  assertEquals(sortedList?.next?.next?.value, 2);
  assertEquals(sortedList?.next?.next?.next?.value, 3);
  assertEquals(sortedList?.next?.next?.next?.next?.value, 4);
  assertEquals(sortedList?.next?.next?.next?.next?.next?.value, 5);
  assertEquals(sortedList?.next?.next?.next?.next?.next?.next?.value, 6);
});

Deno.test("merge two sorted lists - two pointer", () => {
  const mergeTwoSorted = new MergeTwoSorted<number>();

  const list1 = new ListNode<number>(1);
  list1.next = new ListNode<number>(2);
  list1.next.next = new ListNode<number>(4);
  list1.next.next.next = new ListNode<number>(6);

  const list2 = new ListNode<number>(2);
  list2.next = new ListNode<number>(3);
  list2.next.next = new ListNode<number>(5);

  const sortedList = mergeTwoSorted.twoPointer(list1, list2);

  assertEquals(sortedList?.value, 1);
  assertEquals(sortedList?.next?.value, 2);
  assertEquals(sortedList?.next?.next?.value, 2);
  assertEquals(sortedList?.next?.next?.next?.value, 3);
  assertEquals(sortedList?.next?.next?.next?.next?.value, 4);
  assertEquals(sortedList?.next?.next?.next?.next?.next?.value, 5);
  assertEquals(sortedList?.next?.next?.next?.next?.next?.next?.value, 6);
});

Deno.test("merge two sorted lists - strings", () => {
  const mergeTwoSorted = new MergeTwoSorted<string>();

  const list1 = new ListNode<string>("a");
  list1.next = new ListNode<string>("b");
  list1.next.next = new ListNode<string>("d");
  list1.next.next.next = new ListNode<string>("f");

  const list2 = new ListNode<string>("b");
  list2.next = new ListNode<string>("c");
  list2.next.next = new ListNode<string>("e");

  const sortedList = mergeTwoSorted.twoPointer(list1, list2);

  assertEquals(sortedList?.value, "a");
  assertEquals(sortedList?.next?.value, "b");
  assertEquals(sortedList?.next?.next?.value, "b");
  assertEquals(sortedList?.next?.next?.next?.value, "c");
  assertEquals(sortedList?.next?.next?.next?.next?.value, "d");
  assertEquals(sortedList?.next?.next?.next?.next?.next?.value, "e");
  assertEquals(sortedList?.next?.next?.next?.next?.next?.next?.value, "f");
});
