import styled from "@emotion/styled";

import { STAGE_HEIGHT, STAGE_WIDTH } from "../gameHelpers";

export const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(${STAGE_HEIGHT}, minmax(2vw, 1fr));
  grid-template-columns: repeat(${STAGE_WIDTH}, minmax(2vw, 1fr));
  gap: 0.1em;
`;
