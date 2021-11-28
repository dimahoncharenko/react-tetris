export type TetrominosTypes = "J" | "T" | "L" | "O" | "I" | "S" | "Z";

export type TETROMINOS = {
    [key in string]: {
        shape: (string | number)[][]
        color: string
    }
}

export const TETROMINOS: TETROMINOS = {
    0: {
        shape: [
            [0]
        ],
        color: "0, 0, 0"
    },
    "T": {
        shape: [
            [0,0,0],
            ["T","T","T"],
            [0,"T",0],
        ],
        color: "0, 0, 0"
    },
    "S": {
        shape: [
            [0,0,0],
            [0,"S","S"],
            ["S","S",0],
        ],
        color: "0, 0, 0"
    },
    "Z": {
        shape: [
            [0,0,0],
            ["Z","Z",0],
            [0,"Z","Z"],
        ],
        color: "0, 0, 0"
    },
    "J": {
        shape: [
            [0,"J",0],
            [0,"J",0],
            ["J","J",0],
        ],
        color: "0, 0, 0"
    },
    "L": {
        shape: [
            [0,"L",0],
            [0,"L",0],
            [0,"L","L"],
        ],
        color: "0, 0, 0"
    },
    "O": {
        shape: [
            ["O","O"],
            ["O","O"],
        ],
        color: "0, 0, 0"
    },
    "I": {
        shape: [
            [0,"I",0, 0],
            [0,"I",0, 0],
            [0,"I",0, 0],
            [0,"I",0, 0]
        ],
        color: "0, 0, 0"
    }
};

export const randomTetromino = () => {
    const tetrominos = "SZOITLJ";

    const randomType = tetrominos[Math.floor(Math.random() * tetrominos.length)];

    return TETROMINOS[randomType].shape;
}