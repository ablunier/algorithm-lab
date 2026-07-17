import { assertEquals } from "@std/assert";
import { SwapNodesInPairs } from "./swap-nodes-in-pairs.ts";
import { ListNode } from "../node.ts";

function buildList(): ListNode<number> {
  const list = new ListNode<number>(1);
  list.next = new ListNode<number>(2);
  list.next.next = new ListNode<number>(4);
  list.next.next.next = new ListNode<number>(6);
  list.next.next.next.next = new ListNode<number>(8);

  return list;
}

function assertSwapped(result: ListNode<number> | null) {
  assertEquals(result?.value, 2);
  assertEquals(result?.next?.value, 1);
  assertEquals(result?.next?.next?.value, 6);
  assertEquals(result?.next?.next?.next?.value, 4);
  assertEquals(result?.next?.next?.next?.next?.value, 8);
}

const swap = new SwapNodesInPairs<number>();

Deno.test("swap nodes in pairs - recursive", () => {
  assertSwapped(swap.recursive(buildList()));
});

Deno.test("swap nodes in pairs - iterative", () => {
  assertSwapped(swap.iterative(buildList()));
});
