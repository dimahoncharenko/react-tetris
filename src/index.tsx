import ReactDOM from "react-dom";
import { Global } from "@emotion/react";

import App from "./App";
import { globalStyles } from "./components/styles/global";

ReactDOM.render(
  <>
    <Global styles={globalStyles} />
    <App />
  </>,
  document.getElementById("root")
);
