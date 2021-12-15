import { StyledStartButton } from "./styled/StyledStartButton";

type Props = {
  callback: () => void;
};

const StartButton = ({ callback }: Props) => (
  <StyledStartButton onClick={callback}>Start Game</StyledStartButton>
);

export default StartButton;
