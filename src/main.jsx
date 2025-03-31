import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import "./css/modal.css";
import App from "./components/App";
import React from "react";
const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("HTML Must Have An Element With ID as `root`");
}
createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);
