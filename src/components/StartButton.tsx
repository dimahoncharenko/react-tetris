import { StyledStartButton } from "./styledComponents/StyledStartButton"

export type StartButtonProps = {
    callback?: (...args: any[]) => any
}

const StartButton = ({ callback }: StartButtonProps) => (
    <StyledStartButton onClick={callback}>Start Game</StyledStartButton>
);

export default StartButton;