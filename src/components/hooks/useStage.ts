import { useState, useEffect } from "react";

// Util functions
import { Stage, createStage, createCell } from "../utils/gameUtils";

// Tetrominos' functions
import { Tetromino } from "./useTetromino";

export const useStage = (tetromino: Tetromino, resetTetromino: () => void) => {
  const [stage, setStage] = useState<Stage>(createStage());
  const [clearedRows, setClearedRows] = useState(0);

  // handle clearing of rows when it's full
  const sweepRows = (stage: Stage) =>
    stage.reduce<Stage>((acc, row) => {
      if (row.every((cell) => cell[0] !== 0)) {
        const newRow: typeof row = Array(row.length).fill(
          createCell(0, "empty")
        );

        setClearedRows((state) => state + 1);
        acc.unshift(newRow);
        return acc;
      }

      acc.push(row);
      return acc;
    }, []);

  useEffect(() => {
    setClearedRows(0);
    const updateStage = (prevStage: Stage) => {
      // Deep clone and flush the stage
      const newStage: Stage = Array.from(prevStage).map((row) =>
        row.map((cell) => (cell[1] === "empty" ? createCell(0, "empty") : cell))
      );

      // draw the stage
      for (let row = 0; row < tetromino.shape.length; row++) {
        for (let cell = 0; cell < tetromino.shape[row].length; cell++) {
          if (tetromino.shape[row][cell] !== 0) {
            newStage[row + tetromino.pos.y][cell + tetromino.pos.x] = [
              tetromino.shape[row][cell],
              tetromino.isCollided ? "merged" : "empty",
            ];
          }
        }
      }

      // handle a tetromino's collision
      if (tetromino.isCollided) {
        resetTetromino();
        return sweepRows(newStage);
      }

      return newStage;
    };

    setStage(updateStage);
  }, [tetromino, resetTetromino]);

  return {
    stage,
    setStage,
    clearedRows,
  };
};
