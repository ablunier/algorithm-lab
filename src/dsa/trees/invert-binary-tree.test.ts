import { assertEquals } from "@std/assert";
import { InvertBinaryTree } from "./invert-binary-tree.ts";
import { Node } from "./node.ts";

Deno.test("invert binary tree — recursive", () => {
  const root = new Node<number>(4);
  root.left = new Node<number>(2);
  root.right = new Node<number>(7);
  root.left.left = new Node<number>(1);
  root.left.right = new Node<number>(3);
  root.right.left = new Node<number>(6);
  root.right.right = new Node<number>(9);

  const invertBinaryTree = new InvertBinaryTree<number>();

  const newRoot = invertBinaryTree.invertTree(root);

  assertEquals(newRoot?.value, 4);
  assertEquals(newRoot?.left?.value, 7);
  assertEquals(newRoot?.right?.value, 2);
  assertEquals(newRoot?.left?.left?.value, 9);
  assertEquals(newRoot?.left?.right?.value, 6);
  assertEquals(newRoot?.right?.left?.value, 3);
  assertEquals(newRoot?.right?.right?.value, 1);
});

Deno.test("invert binary tree — iterative (BFS)", () => {
  const root = new Node<number>(4);
  root.left = new Node<number>(2);
  root.right = new Node<number>(7);
  root.left.left = new Node<number>(1);
  root.left.right = new Node<number>(3);
  root.right.left = new Node<number>(6);
  root.right.right = new Node<number>(9);

  const invertBinaryTree = new InvertBinaryTree<number>();

  const newRoot = invertBinaryTree.invertTreeIterative(root);

  assertEquals(newRoot?.value, 4);
  assertEquals(newRoot?.left?.value, 7);
  assertEquals(newRoot?.right?.value, 2);
  assertEquals(newRoot?.left?.left?.value, 9);
  assertEquals(newRoot?.left?.right?.value, 6);
  assertEquals(newRoot?.right?.left?.value, 3);
  assertEquals(newRoot?.right?.right?.value, 1);
});
