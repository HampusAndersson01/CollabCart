import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.css";
import App from "./components/App";
import reportWebVitals from "./utils/reportWebVitals";
import { Analytics } from "@vercel/analytics/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>
);

reportWebVitals();
