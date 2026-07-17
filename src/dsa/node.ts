export class ListNode<T> {
  prev: ListNode<T> | null = null;
  next: ListNode<T> | null = null;

  constructor(public value: T) {}
}
