import { StrictMode } from "react";

//importa moódulo de injeção no DOM do navegador
import { createRoot } from "react-dom/client";

import "./index.css";

//componente principal
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
