import { StyledDisplay } from "./styledComponents/StyledDisplay";

export type DisplayProps = {
    text: string
    gameOver?: boolean
}

const Display = ({ text, gameOver = false }: DisplayProps) => (
    <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
);

export default Display;
