import { useState, useMemo, useCallback } from "react";

import {
  Tetrominos,
  TETROMINOS,
  STAGE_WIDTH,
  randomTetromino,
  rotate,
  checkCollision,
} from "../gameHelpers";
import { Stage } from "../Stage";

export type TetrominoState = {
  collided: boolean;
  shape: Tetrominos["0"]["shape"];
  pos: {
    x: number;
    y: number;
  };
};

export const useTetromino = () => {
  const [tetromino, setTetromino] = useState<TetrominoState>({
    collided: false,
    shape: TETROMINOS[0].shape,
    pos: {
      x: 0,
      y: 0,
    },
  });

  const updatePosTetromino = (x: number, y: number, collided = false) => {
    setTetromino((prev) => ({
      shape: prev.shape,
      pos: {
        x: (prev.pos.x += x),
        y: (prev.pos.y += y),
      },
      collided,
    }));
  };

  const resetTetromino = useCallback(() => {
    setTetromino({
      collided: false,
      pos: {
        x: STAGE_WIDTH / 2 - 2,
        y: 0,
      },
      shape: randomTetromino(),
    });
  }, []);

  const rotateTetromino = (stage: Stage) => {
    const newTetromino: TetrominoState = Object.create(tetromino);

    newTetromino.shape = rotate(newTetromino.shape, 1);

    const pos = newTetromino.pos.x;
    let offset = 1;

    while (checkCollision(stage, newTetromino, { x: 0, y: 0 })) {
      newTetromino.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));

      if (offset > newTetromino.shape[0].length) {
        newTetromino.shape = rotate(newTetromino.shape, -1);
        newTetromino.pos.x = pos;
      }
    }

    setTetromino(newTetromino);
  };

  return {
    tetromino: useMemo(() => tetromino, [tetromino]),
    resetTetromino,
    updatePosTetromino,
    rotateTetromino,
  };
};
