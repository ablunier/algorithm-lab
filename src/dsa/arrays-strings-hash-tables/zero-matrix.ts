import { variant } from "../../decorators.ts";

export class ZeroMatrix {
  @variant({ name: "Brute force", bigO: { time: "O(r·c·(r+c))", space: "O(1)" } })
  public static bruteForce(matrix: number[][]): number[][] {
    const SENTINEL = NaN;

    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] === 0) {
          for (let c = 0; c < matrix[row].length; c++) {
            if (matrix[row][c] !== 0) matrix[row][c] = SENTINEL;
          }
          for (let r = 0; r < matrix.length; r++) {
            if (matrix[r][col] !== 0) matrix[r][col] = SENTINEL;
          }
        }
      }
    }

    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (Number.isNaN(matrix[row][col])) matrix[row][col] = 0;
      }
    }

    return matrix;
  }

  @variant({ name: "With sets", bigO: { time: "O(r·c)", space: "O(r+c)" } })
  public static withSets(matrix: number[][]): number[][] {
    const zeroRows = new Set<number>();
    const zeroCols = new Set<number>();

    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] === 0) {
          zeroRows.add(row);
          zeroCols.add(col);
        }
      }
    }

    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (zeroRows.has(row)) {
          matrix[row][col] = 0;
        } else if (zeroCols.has(col)) {
          matrix[row][col] = 0;
        }
      }
    }

    return matrix;
  }

  @variant({ name: "In place", bigO: { time: "O(r·c)", space: "O(1)" } })
  public static inPlace(matrix: number[][]): number[][] {
    const hasZeroInFirstRow = this.hasZeroInFirstRow(matrix);
    const hasZeroInFirstCol = this.hasZeroInFirstCol(matrix);

    this.checkForZeroes(matrix);

    this.processRows(matrix);
    this.processCols(matrix);

    if (hasZeroInFirstRow) {
      this.setRowToZero(matrix, 0);
    }
    if (hasZeroInFirstCol) {
      this.setColToZero(matrix, 0);
    }

    return matrix;
  }

  private static hasZeroInFirstRow(matrix: number[][]): boolean {
    for (let i = 0; i < matrix[0].length; i++) {
      if (matrix[0][i] === 0) {
        return true;
      }
    }

    return false;
  }

  private static hasZeroInFirstCol(matrix: number[][]): boolean {
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i][0] === 0) {
        return true;
      }
    }

    return false;
  }

  private static checkForZeroes(matrix: number[][]): void {
    for (let row = 1; row < matrix.length; row++) {
      for (let col = 1; col < matrix[row].length; col++) {
        if (matrix[row][col] === 0) {
          matrix[row][0] = 0;
          matrix[0][col] = 0;
        }
      }
    }
  }

  private static processRows(matrix: number[][]): void {
    for (let row = 1; row < matrix.length; row++) {
      if (matrix[row][0] === 0) {
        this.setRowToZero(matrix, row);
      }
    }
  }

  private static processCols(matrix: number[][]): void {
    for (let col = 1; col < matrix[0].length; col++) {
      if (matrix[0][col] === 0) {
        this.setColToZero(matrix, col);
      }
    }
  }

  private static setRowToZero(matrix: number[][], row: number): void {
    for (let col = 0; col < matrix[row].length; col++) {
      matrix[row][col] = 0;
    }
  }

  private static setColToZero(matrix: number[][], col: number): void {
    for (let row = 0; row < matrix.length; row++) {
      matrix[row][col] = 0;
    }
  }
}
