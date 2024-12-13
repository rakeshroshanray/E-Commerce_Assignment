import React from "react";
import ReactDOM from "react-dom";
import './index.css'
import App from './App.jsx'

import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <SnackbarProvider maxSnack={1} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
    <App />
  </SnackbarProvider>,
  document.getElementById("root")
);
