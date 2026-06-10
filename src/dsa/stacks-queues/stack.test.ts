import { assertEquals, assertThrows } from "@std/assert";
import { Stack } from "./stack.ts";

Deno.test("stack - isEmpty returns true on new stack", () => {
  const stack = new Stack<number>();
  assertEquals(stack.isEmpty(), true);
});

Deno.test("stack - isEmpty returns false after push", () => {
  const stack = new Stack<number>();
  stack.push(1);
  assertEquals(stack.isEmpty(), false);
});

Deno.test("stack - peek returns top element without removing it", () => {
  const stack = new Stack<number>();
  stack.push(1);
  stack.push(2);
  assertEquals(stack.peek(), 2);
  assertEquals(stack.isEmpty(), false);
});

Deno.test("stack - pop returns elements in LIFO order", () => {
  const stack = new Stack<number>();
  stack.push(1);
  stack.push(2);
  stack.push(3);
  assertEquals(stack.pop(), 3);
  assertEquals(stack.pop(), 2);
  assertEquals(stack.pop(), 1);
});

Deno.test("stack - isEmpty returns true after all elements popped", () => {
  const stack = new Stack<number>();
  stack.push(1);
  stack.pop();
  assertEquals(stack.isEmpty(), true);
});

Deno.test("stack - pop throws on empty stack", () => {
  const stack = new Stack<number>();
  assertThrows(() => stack.pop(), Error, "Empty stack");
});

Deno.test("stack - peek throws on empty stack", () => {
  const stack = new Stack<number>();
  assertThrows(() => stack.peek(), Error, "Empty stack");
});

Deno.test("stack - push after pop maintains correct order", () => {
  const stack = new Stack<number>();
  stack.push(1);
  stack.push(2);
  stack.pop();
  stack.push(3);
  assertEquals(stack.pop(), 3);
  assertEquals(stack.pop(), 1);
  assertEquals(stack.isEmpty(), true);
});

Deno.test("stack - size returns correct quantity", () => {
  const stack = new Stack<number>();

  assertEquals(stack.size(), 0);
  stack.push(1);
  stack.push(2);
  assertEquals(stack.size(), 2);
  stack.pop();
  assertEquals(stack.size(), 1);
});
