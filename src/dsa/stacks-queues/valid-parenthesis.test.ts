import { assert, assertFalse } from "@std/assert";
import { ValidParenthesis } from "./valid-parenthesis.ts";

Deno.test("valid parenthesis", () => {
  const validParenthesis = new ValidParenthesis();

  assert(validParenthesis.isValid("([]){}"));
  assertFalse(validParenthesis.isValid("({)}"));
  assertFalse(validParenthesis.isValid("}(){"));
  assertFalse(validParenthesis.isValid("("));

  assert(validParenthesis.isValidHashMap("([]){}"));
  assertFalse(validParenthesis.isValidHashMap("({)}"));
  assertFalse(validParenthesis.isValidHashMap("}(){"));
  assertFalse(validParenthesis.isValidHashMap("("));
});
