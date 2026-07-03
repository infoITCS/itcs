import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import msalInstance, { initializeMsal } from "./config/msalConfig";
import "./index.css";
import App from "./App.jsx";

const root = createRoot(document.getElementById("root"));

initializeMsal()
  .catch((error) => {
    console.error("MSAL initialization error:", error);
  })
  .finally(() => {
    root.render(
      <StrictMode>
        <MsalProvider instance={msalInstance}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MsalProvider>
      </StrictMode>
    );
  });
