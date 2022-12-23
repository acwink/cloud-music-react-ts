import React from "react";
import { useState } from "react";

import { GlobalStyle } from "./style";
import { IconStyle } from "./assets/iconfont/iconfont";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <GlobalStyle />
      <IconStyle />
      <i className="iconfont">&#xe62b;</i>
    </div>
  );
}

export default App;
