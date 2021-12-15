import { useState, useEffect } from "react";

import { Stage } from "../Stage";
import { createStage, STAGE_WIDTH, tuple } from "../gameHelpers";

import { TetrominoState } from "./useTetromino";

type UseStageArg = {
  tetromino: TetrominoState;
  resetTetromino: () => void;
};

export const useStage = ({ tetromino, resetTetromino }: UseStageArg) => {
  const [stage, setStage] = useState<Stage>(createStage());
  const [clearedRows, setClearedRows] = useState(0);

  const sweepRows = (stage: Stage) => {
    return stage.reduce<Stage>((acc, row) => {
      if (row.every((cell) => cell[1] === "merged")) {
        acc.unshift(Array(STAGE_WIDTH).fill(tuple(0, "clear")));
        setClearedRows((prev) => prev + 1);
        return acc;
      }
      acc.push(row);
      return acc;
    }, []);
  };

  useEffect(() => {
    setClearedRows(0);

    const updateStage = (prev: Stage) => {
      const newStage: Stage = Array.from(prev).map((row) =>
        row.map((cell) => (cell[1] === "clear" ? tuple(0, "clear") : cell))
      );

      for (let y = 0; y < tetromino.shape.length; y++) {
        for (let x = 0; x < tetromino.shape[y].length; x++) {
          if (tetromino.shape[y][x] !== 0) {
            newStage[y + tetromino.pos.y][x + tetromino.pos.x] = [
              tetromino.shape[y][x],
              tetromino.collided ? "merged" : "clear",
            ];
          }
        }
      }

      if (tetromino.collided) {
        resetTetromino();
        return sweepRows(newStage);
      }

      return newStage;
    };

    setStage(updateStage);
  }, [tetromino, resetTetromino]);

  return { stage, setStage, clearedRows };
};
