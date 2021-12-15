import styled from "@emotion/styled";

import { TetrominoShapes } from "../gameHelpers";

export const StyledCell = styled.div<{
  type: TetrominoShapes;
  color: string;
}>`
  background-color: rgb(${(props) => props.color});
  border-width: 0.2em;
  border-style: solid;
  border-left-color: rgba(${(props) => props.color}, 1);
  border-right-color: rgba(${(props) => props.color}, 0.1);
  border-top-color: rgba(${(props) => props.color}, 1);
  border-bottom-color: rgba(${(props) => props.color}, 0.3);
  padding: min(0.7vw, 1em);
`;
