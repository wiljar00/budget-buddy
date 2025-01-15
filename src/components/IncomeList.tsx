import { Container, Stack } from "@mantine/core";
import IncomeForm from "./IncomeForm";
import { useState, useEffect } from "react";
import {
  loadIncome,
  saveIncome,
  IncomeEntry,
  deleteIncome,
} from "../utils/storage";
import TransactionItem from "./TransactionItem";

export default function IncomeList() {
  const [entries, setEntries] = useState<IncomeEntry[]>([]);

  useEffect(() => {
    loadIncome().then(setEntries);
  }, []);

  const handleAddIncome = async (entry: IncomeEntry) => {
    try {
      const newEntries = [...entries, entry];
      await saveIncome(newEntries);
      setEntries(newEntries);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  const handleDelete = async (_type: "income" | "expense", index: number) => {
    await deleteIncome(index, entries);
    const updatedEntries = await loadIncome();
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
    const entries = await loadIncome();
    entries[index].description = newDescription;
    await saveIncome(entries);
    setEntries(entries);
  };

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <IncomeForm onSubmit={handleAddIncome} />
        <Stack gap="md">
          {entries.map((entry, index) => (
            <TransactionItem
              key={index}
              description={entry.description}
              amount={entry.amount}
              date={entry.date}
              index={index}
              type="income"
              onDelete={async (type: "income" | "expense", idx: number) =>
                handleDelete(type, idx)
              }
              onEdit={async (
                type: "income" | "expense",
                idx: number,
                desc: string
              ) => handleEdit(type, idx, desc)}
            />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
