export class Node<T> {
  prev: Node<T> | null = null;
  next: Node<T> | null = null;

  constructor(public value: T) {}
}
