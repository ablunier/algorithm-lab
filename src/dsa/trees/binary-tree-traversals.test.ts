import { TreeNode } from "./node.ts";
import { BinaryTreeTraversals } from "./binary-tree-traversals.ts";

/**
 *       1
 *      / \
 *     2   3
 *    / \   \
 *   4   5   6
 *  /   /
 * 7   8
 */
Deno.test("binary tree traversals", () => {
  const root = new TreeNode<number>(1);
  root.left = new TreeNode<number>(2);
  root.right = new TreeNode<number>(3);

  root.left.left = new TreeNode<number>(4);
  root.left.right = new TreeNode<number>(5);

  root.right.right = new TreeNode<number>(6);

  root.left.left.left = new TreeNode<number>(7);

  root.left.right.left = new TreeNode<number>(8);

  const traversals = new BinaryTreeTraversals<number>();

  console.log("IN-ORDER TRAVERSAL:");
  traversals.inOrderTraversal(root);

  console.log("\nPRE-ORDER TRAVERSAL:");
  traversals.preOrderTraversal(root);

  console.log("\nPOST-ORDER TRAVERSAL:");
  traversals.postOrderTraversal(root);
});
