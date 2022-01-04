import styled from "@emotion/styled";

export const StyledStartButton = styled.button`
  border: 0;
  background-color: black;
  color: white;
  padding: max(0.8vw, 0.5em);
  border: 0.1em solid slategray;
  border-radius: 0.5em;
  font-size: clamp(0.6rem, 1vw + 0.1rem, 1rem);
  width: 100%;
  transition: transform 0.2s ease-out;
  cursor: pointer;

  &:active {
    transform: scale(0.95);
  }
`;
