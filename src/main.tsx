import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

try {
  const root = createRoot(rootElement);
  root.render(<App />);
} catch (error) {
  console.error("Error rendering app:", error);
  rootElement.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif;">
      <h1>Помилка завантаження додатку</h1>
      <p>${error instanceof Error ? error.message : String(error)}</p>
      <pre>${error instanceof Error ? error.stack : String(error)}</pre>
    </div>
  `;
}