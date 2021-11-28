import { memo } from "react";

import { StyledCell } from "./styledComponents/StyledCell";
import { TETROMINOS } from "../tetrominos";

export type CellProps = {
    type: string
}

const Cell = ({ type }: CellProps) => (
    <StyledCell type={type} color={TETROMINOS[type].color} />
);

export default memo(Cell);