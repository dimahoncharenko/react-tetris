import { useCallback, useState } from "react";
import { checkCollision, STAGE_WIDTH } from "../gameHelper";

import { randomTetromino, TETROMINOS } from "../tetrominos";

export type State = {
    pos: {
        x: number
        y: number
    }
    tetromino: (string | number)[][]
    collided: boolean
}

type UpdatePlayerPosArgument = {
    x?: State["pos"]["x"]
    y?: State["pos"]["y"]
    collided?: State["collided"]
}


const usePlayer = () => {
    const [player, setPlayer] = useState<State>({
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false
    });

    const rotate = (matrix: State["tetromino"], dir: number) => {
        const rotatedTetro = matrix.map((_, index) => matrix.map(col => col[index]));
        if (dir > 0) return rotatedTetro.map(row => row.reverse());
        return rotatedTetro.reverse();
    };

    const playerRotate = (stage: State["tetromino"], dir: number) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        const pos = clonedPlayer.pos.x;
        let offset = 1;
        while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
            clonedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -dir);
                clonedPlayer.pos.x = pos;
                return;
            }
        }

        setPlayer(clonedPlayer);
    };  

    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: {x: STAGE_WIDTH / 2 - 2, y: 0},
            collided: false,
            tetromino: randomTetromino().shape
        });
    }, []);

    const updatePlayerPos = ({ x = 0, y = 0, collided = false }: UpdatePlayerPosArgument) => {
        setPlayer(prev => ({
            ...prev,
            pos: { x: prev.pos.x += x, y: prev.pos.y += y},
            collided
        }));
    };

    return { player, resetPlayer, updatePlayerPos, playerRotate };
};

export default usePlayer;