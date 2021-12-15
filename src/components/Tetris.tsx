// Styled components
import { TetrisWrapper, StyledTetris } from "./styled/StyledTetris";

// Components
import Display from "./Display";
import StartButton from "./StartButton";
import Stage from "./Stage";

// Hooks
import { useTetromino } from "./hooks/useTetromino";
import { useStage } from "./hooks/useStage";
import { useInterval } from "./hooks/useInterval";
import { useGameStatus } from "./hooks/useGameStatus";

// Util functions
import { checkCollision, createStage } from "./gameHelpers";
import { useState } from "react";

const Tetris = () => {
  const { tetromino, resetTetromino, updatePosTetromino, rotateTetromino } =
    useTetromino();
  const { stage, setStage, clearedRows } = useStage({
    tetromino,
    resetTetromino,
  });
  const [dropTime, setDropTime] = useState<null | number>(1000);
  const [isGameOver, setGameOver] = useState(false);
  const { gameStatus, addRows, addScore, increaseLevel, resetGameStatus } =
    useGameStatus(clearedRows);

  const handleKeyUp = ({ key }: React.KeyboardEvent<HTMLDivElement>) => {
    if (key === "ArrowDown") {
      setDropTime(1000);
    }
  };

  const keyController = ({ key }: React.KeyboardEvent<HTMLDivElement>) => {
    if (isGameOver) return;
    switch (key) {
      case "ArrowDown":
        dropTetromino(1);
        setDropTime(null);
        break;
      case "ArrowUp":
        rotateTetromino(stage);
        break;
      case "ArrowLeft":
        moveTetromino(-1, 0);
        break;
      case "ArrowRight":
        moveTetromino(1, 0);
        break;
    }
  };

  const moveTetromino = (x: number, y: number, collided = false) => {
    if (!checkCollision(stage, tetromino, { x, y })) {
      updatePosTetromino(x, y, collided);
    }
  };

  const dropTetromino = (y: number, collided = false) => {
    if (!checkCollision(stage, tetromino, { x: 0, y })) {
      updatePosTetromino(0, y, collided);
    } else {
      if (tetromino.pos.y < 1) {
        setGameOver(true);
      }
      updatePosTetromino(0, 0, true);
      console.log(50 * gameStatus.level);
      setDropTime((prev) => prev! - 50 * gameStatus.level);
    }
  };

  const startGame = () => {
    setGameOver(false);
    setStage(createStage());
    resetGameStatus();
    resetTetromino();
  };

  useInterval(() => {
    if (isGameOver) return;
    dropTetromino(1);
  }, dropTime);

  return (
    <TetrisWrapper
      role="button"
      tabIndex={0}
      onKeyDown={(e) => keyController(e)}
      onKeyUp={(e) => handleKeyUp(e)}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {isGameOver ? (
            <Display message={"Game Over!"} />
          ) : (
            <>
              <Display message={`Rows: ${gameStatus.rows}`} />
              <Display message={`Level: ${gameStatus.level}`} />
              <Display message={`Scores: ${gameStatus.score}`} />
            </>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </TetrisWrapper>
  );
};

export default Tetris;
