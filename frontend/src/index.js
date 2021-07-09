import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ReducerProvider } from "./reducer-context/Reducer-context";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { LoginProvider } from "./reducer-context/LoginContext";
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <LoginProvider>
        <ReducerProvider>
          <App />
        </ReducerProvider>
      </LoginProvider>
    </Router>
  </StrictMode>,
  rootElement
);
