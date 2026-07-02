import { variant } from "../../decorators.ts";
import { Node } from "./node.ts";

export class InvertBinaryTree<T> {
  @variant({ name: "Recursive", bigO: { time: "O(n)", space: "O(h)" } })
  public invertTree(root: Node<T> | null) {
    if (root === null) {
      return null;
    }

    const tmp = root.left;
    root.left = this.invertTree(root.right);
    root.right = this.invertTree(tmp);

    return root;
  }

  @variant({ name: "Iterative (BFS)", bigO: { time: "O(n)", space: "O(n)" } })
  public invertTreeIterative(root: Node<T> | null) {
    const queue: Node<T>[] = [];
    if (root !== null) queue.push(root);

    while (queue.length > 0) {
      const node = queue.shift()!;
      const tmp = node.left;
      node.left = node.right;
      node.right = tmp;

      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }

    return root;
  }
}
