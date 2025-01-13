import { Container, Title, Stack, Group, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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

  const handleDelete = async (index: number) => {
    const newEntries = await deleteIncome(index, entries);
    setEntries(newEntries);
  };

  const handleEdit = async (index: number, newDescription: string) => {
    const entries = await loadIncome();
    entries[index].description = newDescription;
    await saveIncome(entries);
    setEntries(entries);
  };

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Group justify="space-between" align="center">
          <Title order={2}>Income Entries</Title>
          <Button variant="light" onClick={() => navigate("/")}>
            Back to Dashboard
          </Button>
        </Group>
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
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
