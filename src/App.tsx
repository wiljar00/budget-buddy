import { BrowserRouter, Routes, Route } from "react-router-dom";
import FinancialSummary from "./components/FinancialSummary";
import IncomeList from "./components/IncomeList";
import Navbar from "./components/Navbar";
import { AppShell } from "@mantine/core";
import ExpenseList from "./components/ExpenseList";
import Footer from "./components/Footer";
import TransactionHistory from "./components/TransactionHistory";
import MongoDBTest from "./components/MongoDBTest";

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
            <Route path="/transactions" element={<TransactionHistory />} />
            <Route path="/mongodb-test" element={<MongoDBTest />} />
          </Routes>
        </AppShell.Main>
        <AppShell.Footer>
          <Footer />
        </AppShell.Footer>
      </AppShell>
    </BrowserRouter>
  );
}
