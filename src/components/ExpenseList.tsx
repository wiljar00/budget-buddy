import { Container, Stack } from "@mantine/core";
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

  useEffect(() => {
    loadExpenses().then(setEntries);
  }, []);

  const handleAddExpense = async (entry: ExpenseEntry) => {
    const newEntries = [...entries, entry];
    setEntries(newEntries);
    await saveExpenses(newEntries);
  };

  const handleDelete = async (_type: "income" | "expense", index: number) => {
    await deleteExpense(index, entries);
    const updatedEntries = await loadExpenses();
    setEntries(
      updatedEntries.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    );
  };

  const handleEdit = async (
    _type: "income" | "expense",
    index: number,
    newDescription: string
  ) => {
    const entries = await loadExpenses();
    entries[index].description = newDescription;
    await saveExpenses(entries);
    setEntries(entries);
  };

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
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
              onDelete={async (type, idx) => handleDelete(type, idx)}
              onEdit={async (type, idx, desc) => handleEdit(type, idx, desc)}
            />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
