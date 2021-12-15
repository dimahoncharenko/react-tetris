import { css } from "@emotion/react"

export default css`
    :root
    {   
        --display-border-radius: .5em;

        box-sizing: border-box;
    }

    body 
    {
        margin: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    *,
    *::before,
    *::after
    {
        box-sizing: inherit;
    }
`;