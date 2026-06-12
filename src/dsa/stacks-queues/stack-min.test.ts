import { assertEquals } from "@std/assert";
import { StackMin } from "./stack-min.ts";

Deno.test("stack min", () => {
  const stack = new StackMin<number>();

  assertEquals(stack.min(), null);

  stack.push(3);
  assertEquals(stack.min(), 3);

  stack.push(2);
  assertEquals(stack.min(), 2);

  stack.pop();
  assertEquals(stack.min(), 3);
});
