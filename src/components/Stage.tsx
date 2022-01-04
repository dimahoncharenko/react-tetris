import { Stage as TStage } from "./utils/gameUtils";

import Cell from "./Cell";

// Styled components
import { StyledStage } from "./styles/StyledStage";

type Props = {
  stage: TStage;
};

export const Stage = ({ stage }: Props) => {
  return (
    <StyledStage className="stage">
      {stage.map((row) =>
        row.map((cell, index) => <Cell key={index} type={cell[0]} />)
      )}
    </StyledStage>
  );
};
