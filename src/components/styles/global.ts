import { css } from "@emotion/react";

import bg from "../../images/bg.png";

export const globalStyles = css`
  :root {
    box-sizing: border-box;
  }

  *,
  *::after,
  *::before {
    box-sizing: inherit;
  }

  body {
    background-image: url(${bg});
    background-repeat: no-repeat;
    background-size: cover;
  }
`;
