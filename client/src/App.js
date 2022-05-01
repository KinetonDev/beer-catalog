import React from "react"
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./router/AppRouter";
import {StyledEngineProvider} from "@mui/styled-engine";
import {IntlProvider} from "react-intl";
import {useSelector} from "react-redux";
import {selectLocale} from "./redux/selectors";
import {LOCALES} from "./lang/locales";
import {messages} from "./lang/messages";

function App() {
    const locale = useSelector(state => selectLocale(state));

      return (
          <IntlProvider locale={locale} messages={messages[locale]} defaultLocale={LOCALES.ENGLISH}>
              <StyledEngineProvider injectFirst>
                  <BrowserRouter>
                      <AppRouter/>
                  </BrowserRouter>
              </StyledEngineProvider>
          </IntlProvider>
      );
}

export default App;
