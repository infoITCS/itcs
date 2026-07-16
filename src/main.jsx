import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { MsalProvider } from "@azure/msal-react";
import msalInstance, { initializeMsal } from "./config/msalConfig";
import "./index.css";
import App from "./App.jsx";

const root = createRoot(document.getElementById("root"));

const LoadingScreen = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "#130d24",
      color: "#fff",
      fontFamily: "system-ui, sans-serif",
    }}
  >
    Loading...
  </div>
);

const renderApp = () => {
  root.render(
    <StrictMode>
      <HelmetProvider>
        <MsalProvider instance={msalInstance}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MsalProvider>
      </HelmetProvider>
    </StrictMode>
  );
};

root.render(<LoadingScreen />);

initializeMsal()
  .then(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (token && (user?.role === "admin" || user?.role === "author")) {
      if (window.location.pathname === "/login") {
        window.history.replaceState(null, "", "/admin");
      }
    }
  })
  .catch((error) => {
    console.error("MSAL initialization error:", error);
  })
  .finally(renderApp);
