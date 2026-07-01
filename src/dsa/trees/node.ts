export class Node<T> {
  left: Node<T> | null = null;
  right: Node<T> | null = null;

  constructor(public value: T) {}
}
