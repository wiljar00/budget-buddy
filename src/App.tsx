import { AppShell } from "@mantine/core";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <Navbar />
      <AppShell.Main>
        <AppShell.Section>
          <p>Hello </p>
        </AppShell.Section>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
