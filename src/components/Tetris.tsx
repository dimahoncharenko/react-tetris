import { useState } from "react";

import { createStage, checkCollision } from "../gameHelper";

// Components 
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import { StyledTetris, StyledTetrisWrapper } from "./styledComponents/StyledTetris";

// Hooks
import usePlayer from "../hooks/usePlayer";
import useStage from "../hooks/useStage";
import { useInterval } from "../hooks/useInterval";
import { useGameStatus } from "../hooks/useGameStatus";

const Tetris = () => {
    const [dropTime, setDropTime] = useState<null | number>(null);
    const [isGameOver, setGameOver] = useState(false);
    const { player, resetPlayer, updatePlayerPos, playerRotate } = usePlayer();
    const { stage, setStage, rowsCleared } = useStage(player, resetPlayer);
    const { score, setLevel, setRows, setScore, rows, level } = useGameStatus(rowsCleared);
    
    const drop = () => {
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            setDropTime(1000 / (level + 1) + 200);
        }

        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
            if (player.pos.y < 1) {
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    }

    const keyUp = ({ key }: React.KeyboardEvent<HTMLDivElement>) => {
        if (!isGameOver) {
            if (key === "ArrowDown") {
                setDropTime(1000);
            }
        }
    };

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    }

    const startGame = () => {
        setStage(createStage());
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setLevel(0);
        setRows(0);
    }

    const movePlayer = (dir: number) => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    }

    const move = ({ key }: React.KeyboardEvent<HTMLDivElement>) => {
        if (!isGameOver) {
            if (key === "ArrowLeft") {
                movePlayer(-1);
            } else if (key === "ArrowRight") {
                movePlayer(1);
            } else if (key === "ArrowDown") {
                dropPlayer();
            } else if (key === "ArrowUp") {
                playerRotate(stage, 1);
            }
        }
    }

    useInterval(() => {
        drop();
    }, dropTime);   

    return (
        <StyledTetrisWrapper 
            role="button" 
            tabIndex={0} 
            onKeyDown={e => move(e)}
            onKeyUp={e => keyUp(e)}
            >
            <StyledTetris>
                <Stage stage={stage}/>
                <aside>
                    <div>
                        {isGameOver ? (<Display gameOver={isGameOver} text="Game Over!" />) : (
                            <>
                                <Display text={`Score: ${score}`}/>
                                <Display text={`Rows: ${rows}`}/>
                                <Display text={`Level: ${level}`}/>
                            </>
                        )}
                    </div>
                    <StartButton callback={startGame}/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;