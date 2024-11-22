import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

const appDiv = document.getElementById("app");

if (appDiv) {
  const root = createRoot(appDiv); // React 18+ API
  root.render(<App />);
}
