import { assertEquals } from "@std/assert";
import { NthNodeToLast } from "./nth-node-to-last.ts";
import { Node } from "./linked-list.ts";

Deno.test("nth node to last", () => {
  const nthNode = new NthNodeToLast();

  const list = new Node<number>(1);
  list.next = new Node<number>(2);
  list.next.next = new Node<number>(4);
  list.next.next.next = new Node<number>(6);

  assertEquals(nthNode.arrayIndex(list, 1)?.value, 6);
  assertEquals(nthNode.arrayIndex(list, 2)?.value, 4);
  assertEquals(nthNode.arrayIndex(list, 3)?.value, 2);
  assertEquals(nthNode.arrayIndex(list, 4)?.value, 1);
  assertEquals(nthNode.arrayIndex(list, 5), null);

  assertEquals(nthNode.twoPass(list, 1)?.value, 6);
  assertEquals(nthNode.twoPass(list, 2)?.value, 4);
  assertEquals(nthNode.twoPass(list, 3)?.value, 2);
  assertEquals(nthNode.twoPass(list, 4)?.value, 1);
  assertEquals(nthNode.twoPass(list, 5), null);

  assertEquals(nthNode.runner(list, 1)?.value, 6);
  assertEquals(nthNode.runner(list, 2)?.value, 4);
  assertEquals(nthNode.runner(list, 3)?.value, 2);
  assertEquals(nthNode.runner(list, 4)?.value, 1);
  assertEquals(nthNode.runner(list, 5), null);
});
