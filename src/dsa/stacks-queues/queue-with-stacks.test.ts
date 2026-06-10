import { assert, assertEquals, assertFalse } from "@std/assert";
import { QueueWithStacks } from "./queue-with-stacks.ts";

Deno.test("queue with stacks", () => {
  const queue = new QueueWithStacks<number>();

  assertEquals(queue.size(), 0);
  queue.add(1);
  queue.add(2);
  queue.add(3);
  assertEquals(queue.remove(), 1);
  assertEquals(queue.peek(), 2);
  assertEquals(queue.size(), 2);
  queue.add(4);
  assertFalse(queue.isEmpty());
  assertEquals(queue.remove(), 2);
  assertEquals(queue.remove(), 3);
  assertEquals(queue.remove(), 4);
  assert(queue.isEmpty());
});
