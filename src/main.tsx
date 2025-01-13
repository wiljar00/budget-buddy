import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider
      theme={{
        // Define your theme overrides here
        colors: {
          // Example: custom color
          brand: ["#f0f", "#0ff", "#ff0"],
        },
      }}
      styles={{
        // Global styles
        global: {
          body: {
            backgroundColor: "#f0f0f0",
          },
        },
      }}
    >
      <App />
    </MantineProvider>
  </StrictMode>
);
