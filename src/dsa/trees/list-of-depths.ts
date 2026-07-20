import { DoublyLinkedList } from "../linked-lists/linked-list.ts";
import { TreeNode } from "./node.ts";

/*
 * Implement an algorithm that returns a linked list with the nodes at each level. If the tree has
 * N levels, the algorithm should return N linked lists.
 *
 * Example:
 *  Input:
 *        4
 *     2     7
 *   1   3  6  9
 *
 *  Output:
 *    4
 *    2->7
 *    1->3->6->9
 */
export class ListOfDepths<T> {
  public listOfDepths(
    root: TreeNode<T>,
  ): DoublyLinkedList<TreeNode<T>>[] | null {
    if (root === null) {
      return null;
    }

    const result: DoublyLinkedList<TreeNode<T>>[] = [];

    let current = new DoublyLinkedList<TreeNode<T>>();
    current.appendToTail(root);

    while (current.head !== null) {
      result.push(current);
      const parents = current;
      current = new DoublyLinkedList<TreeNode<T>>();

      for (const node of parents) {
        if (node.left !== null) {
          current.appendToTail(node.left);
        }

        if (node.right !== null) {
          current.appendToTail(node.right);
        }
      }
    }

    return result;
  }
}
