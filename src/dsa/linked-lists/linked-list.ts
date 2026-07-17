import { ListNode } from "../node.ts";

abstract class BaseLinkedList<T> {
  head: ListNode<T> | null = null;

  public dump(): string {
    const parts: string[] = [];

    let current = this.head;

    while (current !== null) {
      parts.push(`${current.value}`);
      current = current.next;
    }

    parts.push("END");

    return parts.join(" -> ");
  }
}

export class SingleLinkedList<T> extends BaseLinkedList<T> {
  public appendToTail(value: T): void {
    if (this.head === null) {
      this.head = new ListNode(value);
      return;
    }

    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }

    current.next = new ListNode(value);
  }

  public deleteNode(value: T): void {
    if (this.head === null) {
      return;
    }

    if (this.head.value === value) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    while (current.next !== null) {
      if (current.next.value === value) {
        current.next = current.next.next;
        return;
      }

      current = current.next;
    }
  }
}

export class DoublyLinkedList<T> extends BaseLinkedList<T> {
  tail: ListNode<T> | null = null;

  public appendToTail(value: T): void {
    const node = new ListNode(value);

    if (this.tail === null) {
      this.head = node;
      this.tail = node;
      return;
    }

    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;
  }

  public prependToHead(value: T): void {
    const node = new ListNode(value);

    if (this.head === null) {
      this.head = node;
      this.tail = node;
      return;
    }

    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }

  public deleteNode(value: T): void {
    let current = this.head;

    while (current !== null) {
      if (current.value !== value) {
        current = current.next;
        continue;
      }

      if (current.prev !== null) {
        current.prev.next = current.next;
      } else {
        this.head = current.next;
      }

      if (current.next !== null) {
        current.next.prev = current.prev;
      } else {
        this.tail = current.prev;
      }

      return;
    }
  }
}
