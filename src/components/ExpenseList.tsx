import {
  Container,
  Title,
  Stack,
  Paper,
  Text,
  Group,
  Button,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";
import { useState, useEffect } from "react";
import { loadExpenses, saveExpenses, ExpenseEntry } from "../utils/storage";

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
            <Paper key={index} shadow="sm" radius="md" p="md" withBorder>
              <Stack gap="xs">
                <Text fw={500}>{entry.description}</Text>
                <Group justify="space-between">
                  <Text c="dimmed">{entry.date.toLocaleDateString()}</Text>
                  <Text fw={500} c="red">
                    ${entry.amount.toFixed(2)}
                  </Text>
                </Group>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
