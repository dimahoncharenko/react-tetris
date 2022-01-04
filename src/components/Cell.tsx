import { memo } from "react";

import { TETROMINOS, Shapes } from "./utils/Tetrominos";

// Styled components
import { StyledCell } from "./styles/StyledCell";

type Props = {
  type: Shapes | 0;
};

const Cell = ({ type }: Props) => (
  <>
    <StyledCell type={type} color={TETROMINOS[type].color} />
  </>
);

export default memo(Cell);
