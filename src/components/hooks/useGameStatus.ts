import { useEffect, useReducer } from "react";

export const ACTIONS = {
  UP_LEVEL: "UP_LEVEL",
  ADD_SCORE: "ADD_SCORE",
  ADD_ROWS: "ADD_ROWS",
  RESET_LEVEL: "RESET_LEVEL",
  RESET_ROWS: "RESET_ROWS",
  RESET_SCORE: "RESET_SCORE",
} as const;

export const initialState = {
  rows: 0,
  level: 1,
  score: 0,
};

type WithoutPayload = Pick<
  typeof ACTIONS,
  | typeof ACTIONS["RESET_LEVEL"]
  | typeof ACTIONS["RESET_ROWS"]
  | typeof ACTIONS["RESET_SCORE"]
  | typeof ACTIONS["UP_LEVEL"]
>;

type Action =
  | {
      type: typeof ACTIONS["ADD_ROWS"] | typeof ACTIONS["ADD_SCORE"];
      payload: number;
    }
  | {
      type: keyof WithoutPayload;
    };

export type Reducer = (
  state: typeof initialState,
  action: Action
) => typeof initialState;

const arrayOfscore = [50, 100, 300, 900, 4500];

export const defaultReducer: Reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ROWS":
      return {
        ...state,
        rows: state.rows + action.payload,
      };
    case "ADD_SCORE":
      return {
        ...state,
        score:
          state.score +
          arrayOfscore[Math.min(action.payload, arrayOfscore.length - 1)] *
            state.level,
      };
    case "RESET_LEVEL":
      return {
        ...state,
        level: 1,
      };
    case "UP_LEVEL":
      return {
        ...state,
        level: state.level + 1,
      };
    case "RESET_SCORE":
      return {
        ...state,
        score: 0,
      };
    case "RESET_ROWS":
      return {
        ...state,
        rows: 0,
      };
    default:
      return state;
  }
};

export const useGameStatus = (
  reducer = defaultReducer,
  clearedRows: number
) => {
  const [gameStatus, dispatch] = useReducer(reducer, initialState);

  const addScore = (score: number) =>
    dispatch({ type: ACTIONS.ADD_SCORE, payload: score });

  const addRows = (rows: number) =>
    dispatch({ type: ACTIONS.ADD_ROWS, payload: rows });

  const upLevel = () => dispatch({ type: ACTIONS.UP_LEVEL });

  const resetLevel = () => dispatch({ type: ACTIONS.RESET_LEVEL });
  const resetScore = () => dispatch({ type: ACTIONS.RESET_SCORE });
  const resetRows = () => dispatch({ type: ACTIONS.RESET_ROWS });

  useEffect(() => {
    if (clearedRows > 0) {
      addScore(clearedRows - 1);
      addRows(clearedRows);

      if ((gameStatus.rows + clearedRows) % 10 === 0) {
        upLevel();
      }
    }
  }, [clearedRows, gameStatus]);

  return {
    gameStatus,
    addRows,
    addScore,
    upLevel,
    resetLevel,
    resetRows,
    resetScore,
  };
};
