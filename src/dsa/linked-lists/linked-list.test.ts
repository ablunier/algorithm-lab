import { assertEquals } from "@std/assert";
import { DoublyLinkedList, SingleLinkedList } from "./linked-list.ts";

Deno.test("single linked list", () => {
  const list = new SingleLinkedList<number>();

  assertEquals(list.dump(), "END");

  list.appendToTail(1);
  list.appendToTail(2);
  list.appendToTail(3);
  assertEquals(list.dump(), "1 -> 2 -> 3 -> END");

  list.appendToTail(4);
  list.appendToTail(5);
  assertEquals(list.dump(), "1 -> 2 -> 3 -> 4 -> 5 -> END");

  list.deleteNode(1);
  assertEquals(list.dump(), "2 -> 3 -> 4 -> 5 -> END");

  list.deleteNode(3);
  assertEquals(list.dump(), "2 -> 4 -> 5 -> END");

  list.deleteNode(5);
  assertEquals(list.dump(), "2 -> 4 -> END");
});

Deno.test("doubly linked list", () => {
  const list = new DoublyLinkedList<number>();

  assertEquals(list.dump(), "END");

  list.appendToTail(1);
  list.appendToTail(2);
  list.appendToTail(3);
  assertEquals(list.dump(), "1 -> 2 -> 3 -> END");

  list.prependToHead(0);
  assertEquals(list.dump(), "0 -> 1 -> 2 -> 3 -> END");

  list.deleteNode(2);
  assertEquals(list.dump(), "0 -> 1 -> 3 -> END");

  list.deleteNode(0);
  assertEquals(list.dump(), "1 -> 3 -> END");

  list.deleteNode(3);
  assertEquals(list.dump(), "1 -> END");

  list.deleteNode(99);
  assertEquals(list.dump(), "1 -> END");

  list.deleteNode(1);
  assertEquals(list.dump(), "END");
});
