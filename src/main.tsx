import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import App from "./App";
import theme from "./assets/theme/global-style";
import store from "./store/index";
import Loading from "@/baseUI/loading";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </Provider>
    </ThemeProvider>
  </HashRouter>
);
