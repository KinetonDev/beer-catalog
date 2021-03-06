import React from "react"
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store/store";
import AppRouter from "./router/AppRouter";
import {StyledEngineProvider} from "@mui/styled-engine";

function App() {
  return (
      <Provider store={store}>
          <StyledEngineProvider injectFirst>
              <BrowserRouter>
                  <AppRouter/>
              </BrowserRouter>
          </StyledEngineProvider>
      </Provider>
  );
}

export default App;
