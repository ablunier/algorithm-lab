import { assertEquals } from "@std/assert";
import { NthNodeToLast } from "./nth-node-to-last.ts";
import { ListNode } from "../node.ts";

Deno.test("nth node to last", () => {
  const nthNode = new NthNodeToLast();

  const list = new ListNode<number>(1);
  list.next = new ListNode<number>(2);
  list.next.next = new ListNode<number>(4);
  list.next.next.next = new ListNode<number>(6);

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
