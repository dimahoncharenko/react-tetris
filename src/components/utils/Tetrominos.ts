export type Shapes = "T" | "O" | "L" | "Z" | "S" | "J" | "I";

export type TTETROMINOS = {
  [P in Shapes | 0]: {
    shape: (0 | Shapes)[][];
    color: string;
  };
};

export const TETROMINOS: TTETROMINOS = {
  0: {
    shape: [[0]],
    color: "0, 0, 0",
  },
  J: {
    shape: [
      [0, "J", 0],
      [0, "J", 0],
      ["J", "J", 0],
    ],
    color: "246, 166, 112",
  },
  L: {
    shape: [
      [0, "L", 0],
      [0, "L", 0],
      [0, "L", "L"],
    ],
    color: "138, 55, 209",
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"],
    ],
    color: "92, 171, 125",
  },
  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
      [0, 0, 0],
    ],
    color: "248, 39, 97",
  },
  T: {
    shape: [
      [0, "T", 0],
      ["T", "T", "T"],
      [0, 0, 0],
    ],
    color: "85, 83, 88",
  },
  Z: {
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
      [0, 0, 0],
    ],
    color: "255, 230, 109",
  },
  I: {
    shape: [
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
    ],
    color: "78, 205, 196",
  },
};

export const randomTetromino = () => {
  const shapes: Shapes[] = ["T", "O", "L", "J", "I", "Z", "S"];

  return TETROMINOS[shapes[Math.floor(Math.random() * shapes.length)]];
};
