import { Container, Title, Stack, Group, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";
import { useState, useEffect } from "react";
import {
  loadExpenses,
  saveExpenses,
  ExpenseEntry,
  deleteExpense,
} from "../utils/storage";
import TransactionItem from "./TransactionItem";

export default function ExpenseList() {
  const [entries, setEntries] = useState<ExpenseEntry[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadExpenses().then(setEntries);
  }, []);

  const handleAddExpense = async (entry: ExpenseEntry) => {
    const newEntries = [...entries, entry];
    setEntries(newEntries);
    await saveExpenses(newEntries);
  };

  const handleDelete = async (index: number) => {
    const newEntries = await deleteExpense(index, entries);
    setEntries(newEntries);
  };

  const handleEdit = async (index: number, newDescription: string) => {
    const entries = await loadExpenses();
    entries[index].description = newDescription;
    await saveExpenses(entries);
    setEntries(entries);
  };

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Group justify="space-between" align="center">
          <Title order={2}>Expense Entries</Title>
          <Button variant="light" onClick={() => navigate("/")}>
            Back to Dashboard
          </Button>
        </Group>
        <ExpenseForm onSubmit={handleAddExpense} />
        <Stack gap="md">
          {entries.map((entry, index) => (
            <TransactionItem
              key={index}
              description={entry.description}
              amount={entry.amount}
              date={entry.date}
              index={index}
              type="expense"
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
