import styled from "@emotion/styled";

export const StyledStage = styled.div<{
    height: number
    width: number
}>`
    display: grid;
    grid-template-rows: repeat(
        ${props => props.height}, 
        calc(25vw / ${props => props.width})
    );
    grid-template-columns: repeat(${props => props.width}, 1fr);
    gap: .068em;
    border: .1em solid #333;
    width: 100%;
    max-width: 25vw;
    background-color: #111;
`;