import { assertEquals, assertThrows } from "@std/assert";
import { Queue } from "./queue.ts";

Deno.test("queue - isEmpty returns true on new queue", () => {
  const queue = new Queue<number>();
  assertEquals(queue.isEmpty(), true);
});

Deno.test("queue - isEmpty returns false after add", () => {
  const queue = new Queue<number>();
  queue.add(1);
  assertEquals(queue.isEmpty(), false);
});

Deno.test("queue - peek returns first element without removing it", () => {
  const queue = new Queue<number>();
  queue.add(1);
  queue.add(2);
  assertEquals(queue.peek(), 1);
  assertEquals(queue.isEmpty(), false);
});

Deno.test("queue - remove returns elements in FIFO order", () => {
  const queue = new Queue<number>();
  queue.add(1);
  queue.add(2);
  queue.add(3);
  assertEquals(queue.remove(), 1);
  assertEquals(queue.remove(), 2);
  assertEquals(queue.remove(), 3);
});

Deno.test("queue - isEmpty returns true after all elements removed", () => {
  const queue = new Queue<number>();
  queue.add(1);
  queue.remove();
  assertEquals(queue.isEmpty(), true);
});

Deno.test("queue - remove throws on empty queue", () => {
  const queue = new Queue<number>();
  assertThrows(() => queue.remove(), Error, "Empty queue");
});

Deno.test("queue - peek throws on empty queue", () => {
  const queue = new Queue<number>();
  assertThrows(() => queue.peek(), Error, "Empty queue");
});

Deno.test("queue - add after remove maintains correct order", () => {
  const queue = new Queue<number>();
  queue.add(1);
  queue.add(2);
  queue.remove();
  queue.add(3);
  assertEquals(queue.remove(), 2);
  assertEquals(queue.remove(), 3);
  assertEquals(queue.isEmpty(), true);
});
