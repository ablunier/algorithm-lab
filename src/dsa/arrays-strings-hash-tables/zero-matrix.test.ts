import { assertEquals } from "@std/assert";
import { ZeroMatrix } from "./zero-matrix.ts";

Deno.test("zero matrix", () => {
  const matrix: number[][] = [
    [2, 1, 3, 0, 2],
    [7, 4, 1, 3, 8],
    [4, 0, 1, 2, 1],
    [9, 3, 4, 1, 9],
  ];

  const zeroedMatrix: number[][] = [
    [0, 0, 0, 0, 0],
    [7, 0, 1, 0, 8],
    [0, 0, 0, 0, 0],
    [9, 0, 4, 0, 9],
  ];

  assertEquals(
    ZeroMatrix.bruteForce(matrix.map((row) => [...row])),
    zeroedMatrix,
  );
  assertEquals(
    ZeroMatrix.withSets(matrix.map((row) => [...row])),
    zeroedMatrix,
  );
  assertEquals(
    ZeroMatrix.inPlace(matrix.map((row) => [...row])),
    zeroedMatrix,
  );
});
