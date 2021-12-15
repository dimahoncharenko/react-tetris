import { TetrominoShapes } from "./gameHelpers";
import Cell from "./Cell";
import { StyledStage } from "./styled/StyledStage";

export type CellType = "clear" | "merged";
export type Stage = [TetrominoShapes, CellType][][];

type Props = {
  stage: Stage;
};

const StageComponent = ({ stage }: Props) => {
  return (
    <StyledStage>
      {stage.map((row) =>
        row.map((cell, index) => <Cell key={index} type={cell[0]} />)
      )}
    </StyledStage>
  );
};

export default StageComponent;
