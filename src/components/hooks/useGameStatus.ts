import { useEffect, useMemo, useReducer } from "react";

const score_range = [50, 100, 300, 1200, 6000];

export const ACTIONS = {
  ADD_SCORE: "ADD_SCORE",
  INCREASE_LEVEL: "INCREASE_LEVEL",
  ADD_ROWS: "ADD_ROWS",
  RESET_GAME: "RESET_GAME",
} as const;

const initialState = {
  rows: 0,
  level: 1,
  score: 0,
};

type Action = {
  type: keyof typeof ACTIONS;
  payload: number;
};

export const defaultReducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case "ADD_ROWS":
      return {
        ...state,
        rows: state.rows + action.payload,
      };

    case "ADD_SCORE":
      return {
        ...state,
        score: state.score + action.payload,
      };

    case "INCREASE_LEVEL":
      return {
        ...state,
        level: state.level + action.payload,
      };

    case "RESET_GAME":
      return {
        level: 1,
        rows: 0,
        score: 0,
      };

    default:
      return state;
  }
};

export const useGameStatus = (
  clearedRows: number,
  reducer = defaultReducer
) => {
  const [gameStatus, dispatch] = useReducer(reducer, initialState);

  const addScore = (score: number) =>
    dispatch({ type: ACTIONS["ADD_SCORE"], payload: score });

  const increaseLevel = dispatch.bind(null, {
    type: ACTIONS["INCREASE_LEVEL"],
    payload: 1,
  });

  const addRows = (rowsCount: number) =>
    dispatch({ type: ACTIONS["ADD_ROWS"], payload: rowsCount });

  const resetGameStatus = dispatch.bind(null, {
    type: ACTIONS["RESET_GAME"],
    payload: 0,
  });

  useEffect(() => {
    if (clearedRows > 0) {
      addRows(clearedRows);
      addScore(score_range[clearedRows - 1] * gameStatus.level);
      if (gameStatus.rows > 10 * gameStatus.level) {
        increaseLevel();
      }
    }
  }, [clearedRows, gameStatus, increaseLevel]);

  return {
    gameStatus: useMemo(() => gameStatus, [gameStatus]),
    addRows,
    addScore,
    increaseLevel,
    resetGameStatus,
  };
};
