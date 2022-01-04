import { StyledStartButton } from "./styles/StyledStartButton";

type Props = {
  callback: () => void;
};

export const StartButton = ({ callback }: Props) => (
  <StyledStartButton onClick={callback}>Start!</StyledStartButton>
);
