import styled from "@emotion/styled";

export const StyledDisplay = styled.div<{
    gameOver: boolean
}>`
    display: flex;
    align-items: center;
    margin: 0 0 2.5em 0;
    padding: 2.5em;
    border: .1em solid #333;
    min-height: 3.5em;
    width: 100%;
    border-radius: 2.5em;
    color: ${props => props.gameOver ? "red" : "#999"};
    background-color: #000;
    font-family: Pixel, Arial, Helvetica, sans-serif;
    font-size: .8rem;
`;