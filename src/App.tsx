import { BrowserRouter, Routes, Route } from "react-router-dom";
import FinancialSummary from "./components/FinancialSummary";
import IncomeList from "./components/IncomeList";
import Navbar from "./components/Navbar";
import { AppShell, Text, Center } from "@mantine/core";
import ExpenseList from "./components/ExpenseList";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <AppShell header={{ height: 60 }} padding="md" footer={{ height: 40 }}>
        <Navbar />
        <AppShell.Main>
          <Routes>
            <Route path="/" element={<FinancialSummary />} />
            <Route path="/income" element={<IncomeList />} />
            <Route path="/expenses" element={<ExpenseList />} />
          </Routes>
        </AppShell.Main>
        <AppShell.Footer>
          <Footer />
        </AppShell.Footer>
      </AppShell>
    </BrowserRouter>
  );
}
