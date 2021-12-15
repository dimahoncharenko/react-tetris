import { TetrominoState } from "./hooks/useTetromino";
import { Stage } from "./Stage";

export type TetrominoShapes = 0 | "T" | "J" | "L" | "O" | "Z" | "S" | "I";
export type Tetrominos = {
  [P in TetrominoShapes]: {
    shape: TetrominoShapes[][];
    color: string;
  };
};

export const STAGE_HEIGHT = 20;
export const STAGE_WIDTH = 12;

export const tuple = <T extends unknown[]>(...args: T): T => {
  return args;
};

export const createStage = (): Stage =>
  Array.from(
    Array(STAGE_HEIGHT).fill(Array(STAGE_WIDTH).fill(tuple(0, "empty")))
  );

export const TETROMINOS: Tetrominos = {
  0: {
    shape: [[0]],
    color: "0, 0, 0",
  },
  I: {
    shape: [
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
    ],
    color: "4, 239, 194",
  },
  J: {
    shape: [
      [0, "J", 0],
      [0, "J", 0],
      ["J", "J", 0],
    ],
    color: "231, 59, 120",
  },
  L: {
    shape: [
      [0, "L", 0],
      [0, "L", 0],
      [0, "L", "L"],
    ],
    color: "134, 137, 106",
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"],
    ],
    color: "142, 100, 162",
  },
  S: {
    shape: [
      [0, 0, 0],
      [0, "S", "S"],
      ["S", "S", 0],
    ],
    color: "214, 72, 59",
  },
  T: {
    shape: [
      [0, 0, 0],
      [0, "T", 0],
      ["T", "T", "T"],
    ],
    color: "228, 190, 54",
  },
  Z: {
    shape: [
      [0, 0, 0],
      ["Z", "Z", 0],
      [0, "Z", "Z"],
    ],
    color: "34, 243, 107",
  },
};

export const randomTetromino = () => {
  const shapes: TetrominoShapes[] = ["L", "I", "J", "O", "S", "T", "Z"];

  const randomShape: TetrominoShapes =
    shapes[Math.floor(Math.random() * shapes.length)];

  return TETROMINOS[randomShape].shape;
};

export const checkCollision = (
  stage: Stage,
  tetromino: TetrominoState,
  { x: moveX, y: moveY }: TetrominoState["pos"]
) => {
  for (let y = 0; y < tetromino.shape.length; y++) {
    for (let x = 0; x < tetromino.shape[y].length; x++) {
      if (tetromino.shape[y][x] !== 0) {
        if (
          !stage[y + tetromino.pos.y + moveY] ||
          !stage[y + tetromino.pos.y + moveY][x + tetromino.pos.x + moveX] ||
          stage[y + tetromino.pos.y + moveY][x + tetromino.pos.x + moveX][1] ===
            "merged"
        ) {
          return true;
        }
      }
    }
  }

  return false;
};

export const rotate = (matrix: any[][], dir: -1 | 1) => {
  const rotated = matrix.map((_, index) => matrix.map((cell) => cell[index]));

  if (dir > 0) return rotated.map((row) => row.reverse());
  return rotated.reverse();
};
