import Cell from "./Cell";
import { StyledStage } from "./styledComponents/StyledStage";

export type StageProps = {
    stage: any[][]
}

const Stage = ({ stage }: StageProps) => (
    <StyledStage width={stage[0].length} height={stage.length}>
        {stage.map(row => row.map((cell, index) => <Cell key={index} type={cell[0]}/>))}
    </StyledStage>
);

export default Stage;