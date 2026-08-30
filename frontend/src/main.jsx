import { StrictMode } from "react";
import { Toaster } from 'react-hot-toast';
import { createRoot } from "react-dom/client";

import "./components/index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster position="top-right" reverseOrder={false} />
  </StrictMode>
);