import { css } from "@emotion/react"

export default css`
    :root
    {
        box-sizing: border-box;
    }

    body 
    {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    *,
    *::before,
    *::after
    {
        box-sizing: inherit;
    }

    @font-face {
        font-family: "Pixel";
        src: url("fonts/Pixel-LCD-7.woff") format("woff");
    }
`;