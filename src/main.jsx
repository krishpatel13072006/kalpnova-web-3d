import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";
import "./styles/theme.css";
import { initLenis } from "./lib/lenis";

initLenis(); // ✅ correct place

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

// ✅ Trigger for pre-renderer
window.__PRERENDER_READY__ = true;
document.dispatchEvent(new Event('custom-render-trigger'));
