import styled from "@emotion/styled";
import { STAGE_HEIGHT, STAGE_WIDTH } from "../utils/gameUtils";

export const StyledStage = styled.div`
  display: grid;
  grid-template-columns: repeat(${STAGE_WIDTH}, min(1.5em, 7vw));
  grid-template-rows: repeat(${STAGE_HEIGHT}, min(1.5em, 7vw));
  background-color: black;
  border: 0.1em solid slategray;
`;
