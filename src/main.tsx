import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { Global } from "@emotion/react";

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
    >
      <Global
        styles={{
          body: {
            backgroundColor: "#f0f0f0",
          },
        }}
      />
      <App />
    </MantineProvider>
  </StrictMode>
);
