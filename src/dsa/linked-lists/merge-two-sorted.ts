import type { SortablePrimitive } from "../../types.ts";
import { ListNode } from "../node.ts";
import { variant } from "../../decorators.ts";

export class MergeTwoSorted<T extends SortablePrimitive> {
  @variant({ name: "Brute force", bigO: { time: "O(n log n)", space: "O(n)" } })
  public bruteForce(list1: ListNode<T> | null, list2: ListNode<T> | null): ListNode<T> {
    const valuesToSort: T[] = [];

    while (list1 !== null) {
      valuesToSort.push(list1.value);
      list1 = list1.next;
    }
    while (list2 !== null) {
      valuesToSort.push(list2.value);
      list2 = list2.next;
    }

    valuesToSort.sort();

    const head = new ListNode<T>(valuesToSort.shift() as T);

    let current = head;
    for (const value of valuesToSort) {
      current.next = new ListNode<T>(value);
      current = current.next;
    }

    return head;
  }

  @variant({ name: "Two pointer", bigO: { time: "O(n)", space: "O(1)" } })
  public twoPointer(
    list1: ListNode<T> | null,
    list2: ListNode<T> | null,
  ): ListNode<T> | null {
    const dummy = new ListNode<T>(null as unknown as T);

    let current = dummy;
    while (list1 !== null && list2 !== null) {
      if (list1.value <= list2.value) {
        current.next = list1;
        list1 = list1.next;
      } else {
        current.next = list2;
        list2 = list2.next;
      }

      current = current.next;
    }

    if (list1 === null) {
      this.appendToList(current, list2);
    } else {
      this.appendToList(current, list1);
    }

    return dummy.next;
  }

  private appendToList(
    current: ListNode<T>,
    listToAppend: ListNode<T> | null,
  ): void {
    while (listToAppend !== null) {
      current.next = listToAppend;
      listToAppend = listToAppend.next;
      current = current.next;
    }
  }
}
