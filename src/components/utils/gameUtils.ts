// Types
import { Shapes } from "./Tetrominos";
import { Tetromino } from "../hooks/useTetromino";

type NextSteps = {
  moveX: number;
  moveY: number;
};

export type Stage = [Shapes | 0, "empty" | "merged"][][];

export const STAGE_HEIGHT = 20;
export const STAGE_WIDTH = 12;

export const createCell = (
  type: Shapes | 0,
  state: "empty" | "merged"
): [Shapes | 0, "empty" | "merged"] => {
  return [type, state];
};

export const createStage = (): Stage =>
  Array.from(
    Array(STAGE_HEIGHT).fill(
      Array.from(Array(STAGE_WIDTH).fill(createCell(0, "empty")))
    )
  );

export const checkCollision = (
  stage: Stage,
  tetromino: Tetromino,
  { moveX, moveY }: NextSteps
) => {
  for (let row = 0; row < tetromino.shape.length; row++) {
    for (let cell = 0; cell < tetromino.shape[row].length; cell++) {
      if (tetromino.shape[row][cell] !== 0) {
        if (
          !stage[row + tetromino.pos.y + moveY] ||
          !stage[row + tetromino.pos.y + moveY][
            cell + tetromino.pos.x + moveX
          ] ||
          stage[row + tetromino.pos.y + moveY][
            cell + tetromino.pos.x + moveX
          ][1] === "merged"
        ) {
          return true;
        }
      }
    }
  }

  return false;
};

export const rotate = (matrix: any[][], dir: -1 | 1 = 1) => {
  const rotated = matrix.map((_, index) => matrix.map((row) => row[index]));

  if (dir > -1) return rotated.map((row) => row.reverse());
  return rotated.reverse();
};
