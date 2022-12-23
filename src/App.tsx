import React from "react";
import { useRoutes } from "react-router-dom";

import { GlobalStyle } from "./style";
import { IconStyle } from "./assets/iconfont/iconfont";
import routes from "./routes/index";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <IconStyle />
      {useRoutes(routes)}
    </div>
  );
}

export default App;
