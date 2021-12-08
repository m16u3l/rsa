import React from "react";
import { MuiThemeProvider } from '@material-ui/core';
import theme from './utils/MuiTheme';
import RSAForm from "./components/RSAForm";

const App = () => (
  <MuiThemeProvider theme={theme}>
    <RSAForm />
  </MuiThemeProvider>
);

export default App;
