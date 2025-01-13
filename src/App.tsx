import { AppShell } from "@mantine/core";
import Navbar from "./components/Navbar";
import CardExample from "./components/card_example";

function App() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <Navbar />
      <AppShell.Main>
        <CardExample />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
