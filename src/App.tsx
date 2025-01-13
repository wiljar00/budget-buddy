import { AppShell } from "@mantine/core";
import Navbar from "./components/Navbar";
import FinancialSummary from "./components/FinancialSummary";

function App() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <Navbar />
      <AppShell.Main>
        <FinancialSummary />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
