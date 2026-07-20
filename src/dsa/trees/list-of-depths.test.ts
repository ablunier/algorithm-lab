import { assertEquals } from "@std/assert/equals";
import { ListOfDepths } from "./list-of-depths.ts";
import { TreeNode } from "./node.ts";

Deno.test("list of depths", () => {
  const root = new TreeNode<number>(4);
  root.left = new TreeNode<number>(2);
  root.right = new TreeNode<number>(7);
  root.left.left = new TreeNode<number>(1);
  root.left.right = new TreeNode<number>(3);
  root.right.left = new TreeNode<number>(6);
  root.right.right = new TreeNode<number>(9);

  const listOfDepths = new ListOfDepths<number>();
  const result = listOfDepths.listOfDepths(root);

  if (result === null) {
    throw new Error("expected a non-null result");
  }

  assertEquals(result.length, 3);

  assertEquals(result[0].head?.value.value, 4);
  assertEquals(result[0].head?.next, null);

  assertEquals(result[1].head?.value.value, 2);
  assertEquals(result[1].head?.next?.value.value, 7);
  assertEquals(result[1].head?.next?.next, null);

  assertEquals(result[2].head?.value.value, 1);
  assertEquals(result[2].head?.next?.value.value, 3);
  assertEquals(result[2].head?.next?.next?.value.value, 6);
  assertEquals(result[2].head?.next?.next?.next?.value.value, 9);
  assertEquals(result[2].head?.next?.next?.next?.next, null);
});
