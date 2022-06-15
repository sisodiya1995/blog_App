import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import { BrowserRouter } from "react-router-dom";
import "./stylesheet/style.css";
import ErrorBoundary from "./components/Errorboundry";
ReactDOM.render(
  <BrowserRouter>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </BrowserRouter>,

  document.getElementById("root")
);
