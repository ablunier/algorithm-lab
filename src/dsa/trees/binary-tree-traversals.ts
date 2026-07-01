import { Node } from "./node.ts";

export class BinaryTreeTraversals<T> {
  public inOrderTraversal(node: Node<T> | null): void {
    if (node !== null) {
      this.inOrderTraversal(node.left);
      console.log(node.value);
      this.inOrderTraversal(node.right);
    }
  }

  public preOrderTraversal(node: Node<T> | null): void {
    if (node !== null) {
      console.log(node.value);
      this.preOrderTraversal(node.left);
      this.preOrderTraversal(node.right);
    }
  }

  public postOrderTraversal(node: Node<T> | null): void {
    if (node !== null) {
      this.postOrderTraversal(node.left);
      this.postOrderTraversal(node.right);
      console.log(node.value);
    }
  }
}
