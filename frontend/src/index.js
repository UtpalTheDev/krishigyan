import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ReducerProvider } from "./Reducer-context";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
// SetupMockServer();
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ReducerProvider>
      <Router>
        <App />
      </Router>
    </ReducerProvider>
  </StrictMode>,
  rootElement
);
