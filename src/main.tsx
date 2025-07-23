import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SymbolProvider } from "./context/SymbolContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SymbolProvider>
      <App />
    </SymbolProvider>
  </StrictMode>
);
