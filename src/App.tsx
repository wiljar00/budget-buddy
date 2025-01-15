import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Register from "./components/Register";
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
      <AuthProvider>
        <AppShell header={{ height: 60 }} padding="md" footer={{ height: 40 }}>
          <Navbar />
          <AppShell.Main>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <FinancialSummary />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/income"
                element={
                  <ProtectedRoute>
                    <IncomeList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/expenses"
                element={
                  <ProtectedRoute>
                    <ExpenseList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transactions"
                element={
                  <ProtectedRoute>
                    <TransactionHistory />
                  </ProtectedRoute>
                }
              />
              <Route path="/mongodb-test" element={<MongoDBTest />} />
            </Routes>
          </AppShell.Main>
          <AppShell.Footer>
            <Footer />
          </AppShell.Footer>
        </AppShell>
      </AuthProvider>
    </BrowserRouter>
  );
}
