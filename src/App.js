import React from "react";
import "./App.css";
import Main from "./containers/Main";
import { ThemeProvider } from "styled-components";
import { chosenTheme } from "./theme";
import { GlobalStyles } from "./global";
import PortfolioChatbot from "./components/portfolioChatbot/PortfolioChatbot";

function App() {
  return (
    <ThemeProvider theme={chosenTheme}>
      <>
        <GlobalStyles />
        <div>
          <Main theme={chosenTheme} />
          <PortfolioChatbot />
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
