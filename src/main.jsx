import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import DeferredMsalProvider from "./Components/DeferredMsalProvider";
// Bundled rather than linked from a CDN: the CDN link was swapped in with
// onload, so every page painted unstyled first and then re-flowed (FOUC/CLS).
// Vite merges it into the render-blocking stylesheet, keeping the same
// cascade order - Bootstrap first, app styles after.
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <DeferredMsalProvider>
          <App />
        </DeferredMsalProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
