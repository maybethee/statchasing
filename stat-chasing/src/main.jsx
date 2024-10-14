import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.jsx";
import "./styles/global.css";
import { ReplaysProvider } from "./components/ReplaysContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReplaysProvider>
      <App />
    </ReplaysProvider>
  </StrictMode>
);
