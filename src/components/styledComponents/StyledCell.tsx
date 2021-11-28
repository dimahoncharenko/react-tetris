import styled from "@emotion/styled";

export const StyledCell = styled.div<{
    type: string | number
}>`
    width: auto;
    background: rgba(${props => props.color}, 0.8);
    border-style: solid;
    border-width: ${props => props.type === 0 ? "0px" : "4px"};
    border-bottom-color: rgba(${props => props.color}, 0.1);
    border-right-color: rgba(${props => props.color}, 1);
    border-top-color: rgba(${props => props.color}, 1);
    border-left-color: rgba(${props => props.color}, 0.3);
`;