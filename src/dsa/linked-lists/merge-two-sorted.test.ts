import { assertEquals } from "@std/assert";
import { MergeTwoSorted } from "./merge-two-sorted.ts";
import { Node } from "./linked-list.ts";

Deno.test("merge two sorted lists - brute force", () => {
  const mergeTwoSorted = new MergeTwoSorted<number>();

  const list1 = new Node<number>(1);
  list1.next = new Node<number>(2);
  list1.next.next = new Node<number>(4);
  list1.next.next.next = new Node<number>(6);

  const list2 = new Node<number>(2);
  list2.next = new Node<number>(3);
  list2.next.next = new Node<number>(5);

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

  const list1 = new Node<number>(1);
  list1.next = new Node<number>(2);
  list1.next.next = new Node<number>(4);
  list1.next.next.next = new Node<number>(6);

  const list2 = new Node<number>(2);
  list2.next = new Node<number>(3);
  list2.next.next = new Node<number>(5);

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

  const list1 = new Node<string>("a");
  list1.next = new Node<string>("b");
  list1.next.next = new Node<string>("d");
  list1.next.next.next = new Node<string>("f");

  const list2 = new Node<string>("b");
  list2.next = new Node<string>("c");
  list2.next.next = new Node<string>("e");

  const sortedList = mergeTwoSorted.twoPointer(list1, list2);

  assertEquals(sortedList?.value, "a");
  assertEquals(sortedList?.next?.value, "b");
  assertEquals(sortedList?.next?.next?.value, "b");
  assertEquals(sortedList?.next?.next?.next?.value, "c");
  assertEquals(sortedList?.next?.next?.next?.next?.value, "d");
  assertEquals(sortedList?.next?.next?.next?.next?.next?.value, "e");
  assertEquals(sortedList?.next?.next?.next?.next?.next?.next?.value, "f");
});
