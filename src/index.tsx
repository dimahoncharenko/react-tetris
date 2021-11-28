import ReactDOM from 'react-dom';
import { Global } from "@emotion/react";

import App from './App';
import globalStyles from "./styles/global";

ReactDOM.render(
    <>
      <Global styles={globalStyles}/>
      <App />
    </>,
  document.getElementById('root')
);

