import styled from "@emotion/styled";

import bg from "../../images/bg.png";

export const TetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  background-image: url(${bg});
  background-size: cover;
  overflow: hidden;
  outline: none;
`;
export const StyledTetris = styled.div`
  display: flex;
  width: min(700px, 100vw - 1em);
  margin: 0 auto;
  justify-content: center;

  > aside {
    padding: max(0.5em, 1vw);
  }
`;
