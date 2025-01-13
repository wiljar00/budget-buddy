import { BrowserRouter, Routes, Route } from "react-router-dom";
import FinancialSummary from "./components/FinancialSummary";
import IncomeList from "./components/IncomeList";
import Navbar from "./components/Navbar";
import { AppShell } from "@mantine/core";

export default function App() {
  return (
    <BrowserRouter>
      <AppShell header={{ height: 60 }} padding="md">
        <Navbar />
        <AppShell.Main>
          <Routes>
            <Route path="/" element={<FinancialSummary />} />
            <Route path="/income" element={<IncomeList />} />
          </Routes>
        </AppShell.Main>
      </AppShell>
    </BrowserRouter>
  );
}
