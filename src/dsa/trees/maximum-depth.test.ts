import { assertEquals } from "@std/assert/equals";
import { MaximumDepth } from "./maximum-depth.ts";
import { TreeNode } from "./node.ts";

Deno.test("maximum depth — recursive", () => {
  const maxDepth = new MaximumDepth<number>();

  const root = new TreeNode<number>(4);
  root.left = new TreeNode<number>(2);
  root.right = new TreeNode<number>(7);
  root.left.left = new TreeNode<number>(1);
  root.left.right = new TreeNode<number>(3);

  assertEquals(maxDepth.maxDepth(root), 3);

  root.left.left.left = new TreeNode<number>(8);
  assertEquals(maxDepth.maxDepth(root), 4);
});

Deno.test("maximum depth — iterative", () => {
  const maxDepth = new MaximumDepth<number>();

  const root = new TreeNode<number>(4);
  root.left = new TreeNode<number>(2);
  root.right = new TreeNode<number>(7);
  root.left.left = new TreeNode<number>(1);
  root.left.right = new TreeNode<number>(3);

  assertEquals(maxDepth.maxDepthIterative(root), 3);

  root.left.left.left = new TreeNode<number>(8);
  assertEquals(maxDepth.maxDepthIterative(root), 4);
});
