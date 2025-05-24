import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { RegistrationProvider } from "./contexts/RegistrationContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RegistrationProvider>
          <App />
        </RegistrationProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
