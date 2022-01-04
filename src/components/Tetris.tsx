import { useState, useEffect, useCallback } from "react";

// Components
import { Display } from "./Display";
import { Stage } from "./Stage";
import { StartButton } from "./StartButton";

// Styled components
import { StyledTetris } from "./styles/StyledTetris";

// Util function
import { createStage, checkCollision } from "./utils/gameUtils";

// Hooks
import { useStage } from "./hooks/useStage";
import { useTetromino } from "./hooks/useTetromino";
import { useInterval } from "./hooks/useInterval";
import { useGameStatus, defaultReducer } from "./hooks/useGameStatus";

export const Tetris = () => {
  const [dropTime, setDropTime] = useState<null | number>(null);
  const { resetTetromino, tetromino, updatePos, rotateTetromino } =
    useTetromino();
  const { stage, setStage, clearedRows } = useStage(tetromino, resetTetromino);
  const [isGameOver, setGameOver] = useState(false);
  const { resetLevel, resetRows, resetScore, gameStatus } = useGameStatus(
    defaultReducer,
    clearedRows
  );

  const startGame = () => {
    resetRows();
    resetLevel();
    resetScore();
    setDropTime(1000);
    setGameOver(false);
    setStage(createStage());
    resetTetromino();
  };

  const moveTetromino = useCallback(
    (x: number, y: number) => {
      if (!checkCollision(stage, tetromino, { moveX: x, moveY: y })) {
        updatePos(x, y);
      }
    },
    [stage, tetromino, updatePos]
  );

  const dropTetromino = useCallback(() => {
    if (!checkCollision(stage, tetromino, { moveX: 0, moveY: 1 })) {
      updatePos(0, 1);
    } else {
      if (tetromino.pos.y < 1) {
        setDropTime(null);
        setGameOver(true);
      } else {
        updatePos(0, 0, true);
      }
    }
  }, [updatePos, tetromino, stage]);

  const handleKeyUp = useCallback(() => {
    setDropTime(1000 / gameStatus.level + 250);
  }, [gameStatus.level]);

  const handleKeyDown = useCallback(
    ({ key }: KeyboardEvent) => {
      if (isGameOver) return;
      switch (key) {
        case "ArrowLeft":
          moveTetromino(-1, 0);
          break;
        case "ArrowRight":
          moveTetromino(1, 0);
          break;
        case "ArrowUp":
          rotateTetromino(stage);
          break;
        case "ArrowDown":
          setDropTime(null);
          dropTetromino();
          break;
      }
    },
    [
      dropTetromino,
      setDropTime,
      isGameOver,
      moveTetromino,
      rotateTetromino,
      stage,
    ]
  );

  useEffect(() => {
    const body = document.querySelector("body");

    if (body) {
      body.addEventListener("keydown", handleKeyDown);
      body.addEventListener("keyup", handleKeyUp);
    }

    return () => {
      body?.removeEventListener("keydown", handleKeyDown);
      body?.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useInterval(() => {
    dropTetromino();
  }, dropTime);

  return (
    <StyledTetris>
      <Stage stage={stage} />
      <aside>
        {isGameOver ? (
          <Display message="Game Over!" />
        ) : (
          <>
            <Display message={`Score: ${gameStatus.score}`} />
            <Display message={`Level: ${gameStatus.level}`} />
            <Display message={`Rows: ${gameStatus.rows}`} />
          </>
        )}
        <StartButton callback={startGame} />
      </aside>
    </StyledTetris>
  );
};
