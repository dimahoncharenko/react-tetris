import { StyledCell } from "./styled/StyledCell";
import { TETROMINOS, TetrominoShapes } from "./gameHelpers";

type Props = {
  type: TetrominoShapes;
};

const Cell = ({ type }: Props) => {
  return <StyledCell type={type} color={TETROMINOS[type].color}></StyledCell>;
};

export default Cell;
