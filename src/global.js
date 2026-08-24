import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  html {
    background: #181817;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    min-height: 100vh;
    transition: background 0.25s linear, color 0.25s linear;
  }

  #root {
    width: 100%;
    max-width: 100%;
    min-height: 100vh;
    overflow-x: clip;
  }`;
