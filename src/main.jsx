import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./assets/index.css";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error("HTML Must Have An Element With ID as `root`");
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);
