import styled from "@emotion/styled";
import { Shapes } from "../utils/Tetrominos";

export const StyledCell = styled.div<{
  color: string;
  type: Shapes | 0;
}>`
  border: solid 0.08em;
  border-top-color: ${(props) => `rgba(${props.color}, .4)`};
  border-bottom-color: ${(props) => `rgba(${props.color}, .85)`};
  border-right-color: ${(props) => `rgba(${props.color}, .7)`};
  border-left-color: ${(props) => `rgba(${props.color}, .5)`};
  background-color: ${(props) => `rgba(${props.color}, .8)`};
`;
