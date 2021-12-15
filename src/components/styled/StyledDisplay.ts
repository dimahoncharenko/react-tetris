import styled from "@emotion/styled";

export const StyledDisplay = styled.div`
  display: flex;
  color: white;
  background-color: black;
  border: 0.1em solid white;
  border-radius: 1em;
  padding: max(0.3em, 0.5vw);
  font-size: clamp(0.5rem, 2vw + 0.1rem, 1rem);
  margin-bottom: 0.5em;

  > * {
    margin: auto;
  }
`;
