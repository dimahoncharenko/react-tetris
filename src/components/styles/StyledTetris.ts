import styled from "@emotion/styled";

export const StyledTetris = styled.div`
  display: flex;
  max-width: min(calc(80% - 1em), 800px);
  margin: 0 auto;
  padding: max(0.3em, 1vw);
  justify-content: center;

  > aside {
    margin-left: max(1vw, 0.3em);
  }
`;
