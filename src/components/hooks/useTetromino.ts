import { useMemo, useCallback, useReducer } from "react";

// Util functions
import { TETROMINOS, Shapes, randomTetromino } from "../utils/Tetrominos";
import { STAGE_WIDTH, rotate, checkCollision, Stage } from "../utils/gameUtils";

export type Tetromino = {
  shape: (0 | Shapes)[][];
  isCollided: boolean;
  pos: {
    x: number;
    y: number;
  };
};

export const initialState: Tetromino = {
  shape: TETROMINOS[0].shape,
  isCollided: false,
  pos: {
    x: STAGE_WIDTH / 2 - 1,
    y: 0,
  },
};

export const ACTIONS = {
  SET_TETROMINO_POS: "SET_TETROMINO_POS",
  SET_STATE_FIXED: "SET_STATE_FIXED",
  RESET_TETROMINO: "RESET_TETROMINO",
  SET_TETROMINO_SHAPE: "SET_TETROMINO_SHAPE",
} as const;

type ActionsWithoutPayload = Pick<
  typeof ACTIONS,
  typeof ACTIONS["RESET_TETROMINO"] | typeof ACTIONS["SET_STATE_FIXED"]
>;

export type Action =
  | {
      type: typeof ACTIONS["SET_TETROMINO_SHAPE"];
      payload: Tetromino["shape"];
    }
  | {
      type: typeof ACTIONS["SET_TETROMINO_POS"];
      payload: Tetromino["pos"];
    }
  | {
      type: keyof ActionsWithoutPayload;
    };

export type Reducer = (state: Tetromino, action: Action) => Tetromino;

export const defaultReducer: Reducer = (state, action) => {
  switch (action.type) {
    case "RESET_TETROMINO":
      return {
        ...initialState,
        shape: randomTetromino().shape,
      };

    case "SET_STATE_FIXED":
      return {
        ...state,
        isCollided: true,
      };

    case "SET_TETROMINO_POS":
      return {
        ...state,
        pos: {
          x: state.pos.x + action.payload.x,
          y: state.pos.y + action.payload.y,
        },
      };

    case "SET_TETROMINO_SHAPE":
      return {
        ...state,
        shape: action.payload,
      };
    default:
      return state;
  }
};

export const useTetromino = (reducer = defaultReducer) => {
  const [tetromino, dispatch] = useReducer(reducer, initialState);

  const setTetrominoShape = (shape: Tetromino["shape"]) =>
    dispatch({ type: ACTIONS["SET_TETROMINO_SHAPE"], payload: shape });

  const setTetrominoPos = (pos: Tetromino["pos"]) =>
    dispatch({ type: ACTIONS["SET_TETROMINO_POS"], payload: pos });

  const setStateFixed = () => dispatch({ type: ACTIONS["SET_STATE_FIXED"] });

  const resetTetromino = useCallback(
    () => dispatch({ type: ACTIONS["RESET_TETROMINO"] }),
    []
  );

  const updatePos = (x: number, y: number, isCollided = false) => {
    setTetrominoPos({ x, y });
    if (isCollided) setStateFixed();
  };

  const rotateTetromino = (stage: Stage, dir: -1 | 1 = 1) => {
    // Deep clone
    const newShape: Tetromino = Object.create(tetromino);
    // rotate tetromino
    newShape.shape = rotate(newShape.shape);
    let offset = 1;
    const pos = newShape.pos.x;
    // handle the collision of a tetromino when it is rotating
    while (checkCollision(stage, newShape, { moveX: 0, moveY: 0 })) {
      newShape.pos.x += offset;
      offset = -(offset + (offset > -1 ? 1 : -1));
      // reset the position and shape of tetromino when offset is big enough
      if (offset > newShape.shape[0].length) {
        newShape.shape = rotate(newShape.shape, -1);
        newShape.pos.x = pos;
        break;
      }
    }
    setTetrominoShape(newShape.shape);
  };
  return {
    tetromino: useMemo(() => tetromino, [tetromino]),
    setTetrominoShape,
    setTetrominoPos,
    resetTetromino,
    setStateFixed,
    updatePos,
    rotateTetromino,
  };
};
