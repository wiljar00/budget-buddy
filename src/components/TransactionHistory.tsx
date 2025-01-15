import { Container, Stack, Group, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  loadIncome,
  loadExpenses,
  deleteIncome,
  deleteExpense,
  saveIncome,
  saveExpenses,
} from "../utils/storage";
import FinancialCard from "./FinancialCard";
import TransactionItem from "./TransactionItem";
import PageHeader from "./PageHeader";

interface Transaction {
  type: "income" | "expense";
  description: string;
  amount: number;
  date: Date;
  index: number;
}

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const navigate = useNavigate();

  // Calculate balance
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  useEffect(() => {
    const loadTransactions = async () => {
      const incomeEntries = await loadIncome();
      const expenseEntries = await loadExpenses();

      const allTransactions = [
        ...incomeEntries.map((entry, index) => ({
          type: "income" as const,
          ...entry,
          index,
        })),
        ...expenseEntries.map((entry, index) => ({
          type: "expense" as const,
          ...entry,
          index,
        })),
      ].sort((a, b) => b.date.getTime() - a.date.getTime());

      setTransactions(allTransactions);
    };

    loadTransactions();
  }, []);

  const handleDelete = async (type: "income" | "expense", index: number) => {
    if (type === "income") {
      const incomeEntries = await loadIncome();
      await deleteIncome(index, incomeEntries);
    } else {
      const expenseEntries = await loadExpenses();
      await deleteExpense(index, expenseEntries);
    }

    // Reload all transactions
    const incomeEntries = await loadIncome();
    const expenseEntries = await loadExpenses();
    const updatedTransactions = [
      ...incomeEntries.map((entry, idx) => ({
        type: "income" as const,
        ...entry,
        index: idx,
      })),
      ...expenseEntries.map((entry, idx) => ({
        type: "expense" as const,
        ...entry,
        index: idx,
      })),
    ].sort((a, b) => b.date.getTime() - a.date.getTime());

    setTransactions(updatedTransactions);
  };

  const handleEdit = async (
    type: "income" | "expense",
    index: number,
    newDescription: string
  ) => {
    if (type === "income") {
      const incomeEntries = await loadIncome();
      incomeEntries[index].description = newDescription;
      await saveIncome(incomeEntries);
    } else {
      const expenseEntries = await loadExpenses();
      expenseEntries[index].description = newDescription;
      await saveExpenses(expenseEntries);
    }

    // Reload transactions
    const incomeEntries = await loadIncome();
    const expenseEntries = await loadExpenses();
    const updatedTransactions = [
      ...incomeEntries.map((entry, idx) => ({
        type: "income" as const,
        ...entry,
        index: idx,
      })),
      ...expenseEntries.map((entry, idx) => ({
        type: "expense" as const,
        ...entry,
        index: idx,
      })),
    ].sort((a, b) => b.date.getTime() - a.date.getTime());

    setTransactions(updatedTransactions);
  };

  return (
    <Container size="sm" mt="xl">
      <Stack>
        <PageHeader title="Transaction History" />

        <FinancialCard
          title="Current Balance"
          amount={`$${balance.toFixed(2)}`}
          description="Current balance"
          color="blue.7"
          isLarge
        />

        <Group justify="center">
          <Button
            variant="light"
            color="teal"
            onClick={() => navigate("/income")}
          >
            Add Income
          </Button>
          <Button
            variant="light"
            color="red"
            onClick={() => navigate("/expenses")}
          >
            Add Expense
          </Button>
        </Group>

        {transactions.map((transaction, index) => (
          <TransactionItem
            key={index}
            {...transaction}
            index={index}
            onDelete={() => handleDelete(transaction.type, index)}
            onEdit={handleEdit}
          />
        ))}
      </Stack>
    </Container>
  );
}
