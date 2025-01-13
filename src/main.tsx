import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider
      theme={{
        colors: {
          brand: [
            "#f0f",
            "#0ff",
            "#ff0",
            "#f0f",
            "#0ff",
            "#ff0",
            "#f0f",
            "#0ff",
            "#ff0",
            "#f0f",
          ],
        },
      }}
      defaultColorScheme="light"
    >
      <App />
    </MantineProvider>
  </StrictMode>
);
