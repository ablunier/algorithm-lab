import { TreeNode } from "./node.ts";

/*
 * Given the root of a binary tree, return its maximum depth.
 *
 * Example:
 *  Input:
 *         4
 *      2     7
 *    1   3
 *  8
 *
 *  Output: 4
 */
export class MaximumDepth<T> {
  public maxDepth(root: TreeNode<T> | null): number {
    if (root === null) {
      return 0;
    }

    const leftDepth = this.maxDepth(root.left);
    const rightDepth = this.maxDepth(root.right);

    return 1 + Math.max(leftDepth, rightDepth);
  }

  public maxDepthIterative(root: TreeNode<T> | null): number {
    if (root === null) {
      return 0;
    }

    let depth = 0;
    let queue: TreeNode<T>[] = [root];

    while (queue.length > 0) {
      depth++;
      const nextQueue: TreeNode<T>[] = [];

      for (const node of queue) {
        if (node.left) nextQueue.push(node.left);
        if (node.right) nextQueue.push(node.right);
      }

      queue = nextQueue;
    }

    return depth;
  }
}
