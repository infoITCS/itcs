import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import DeferredMsalProvider from "./Components/DeferredMsalProvider";
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
