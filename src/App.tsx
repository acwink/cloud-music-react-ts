import React from "react";
import { useRoutes } from "react-router-dom";

import { GlobalStyle } from "./style";
import { IconStyle } from "./assets/iconfont/iconfont";
import routes from "./routes/index";
import { Data } from "./application/Singers/data";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <IconStyle />
      <Data>{useRoutes(routes)}</Data>
    </div>
  );
}

export default App;
