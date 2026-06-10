import { assertEquals } from "@std/assert";
import { SwapNodesInPairs } from "./swap-nodes-in-pairs.ts";
import { Node } from "../node.ts";

function buildList(): Node<number> {
  const list = new Node<number>(1);
  list.next = new Node<number>(2);
  list.next.next = new Node<number>(4);
  list.next.next.next = new Node<number>(6);
  list.next.next.next.next = new Node<number>(8);

  return list;
}

function assertSwapped(result: Node<number> | null) {
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
