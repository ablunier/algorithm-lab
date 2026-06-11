import { assertEquals } from "@std/assert/equals";
import { SortStack } from "./sort-stack.ts";
import { Stack } from "./stack.ts";

Deno.test("sort stack", () => {
  const sort = new SortStack<number>();

  const stack = new Stack<number>();
  stack.push(1);
  stack.push(5);
  stack.push(2);
  stack.push(4);

  const sortedStack = sort.sort(stack);

  assertEquals(sortedStack.pop(), 1);
  assertEquals(sortedStack.pop(), 2);
  assertEquals(sortedStack.pop(), 4);
  assertEquals(sortedStack.pop(), 5);
});
