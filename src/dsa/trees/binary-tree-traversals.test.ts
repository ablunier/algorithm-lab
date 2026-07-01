import { Node } from "./node.ts";
import { BinaryTreeTraversals } from "./binary-tree-traversals.ts";

/**
 *       1
 *      / \
 *     2   3
 *    / \   \
 *   4   5   6
 *  /   /
 * 7    8
 */
Deno.test("binary tree traversals", () => {
  const root = new Node<number>(1);
  root.left = new Node<number>(2);
  root.right = new Node<number>(3);

  root.left.left = new Node<number>(4);
  root.left.right = new Node<number>(5);

  root.right.right = new Node<number>(6);

  root.left.left.left = new Node<number>(7);

  root.left.right.left = new Node<number>(8);

  const traversals = new BinaryTreeTraversals<number>();

  console.log("IN-ORDER TRAVERSAL:");
  traversals.inOrderTraversal(root);

  console.log("\nPRE-ORDER TRAVERSAL:");
  traversals.preOrderTraversal(root);

  console.log("\nPOST-ORDER TRAVERSAL:");
  traversals.postOrderTraversal(root);
});
