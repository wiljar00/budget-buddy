import {
  Container,
  Title,
  Stack,
  Paper,
  Text,
  Group,
  Button,
  ActionIcon,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";
import { useState, useEffect } from "react";
import {
  loadExpenses,
  saveExpenses,
  ExpenseEntry,
  deleteExpense,
} from "../utils/storage";
import { IconTrash } from "@tabler/icons-react";

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
                <Group justify="space-between">
                  <Text fw={500}>{entry.description}</Text>
                  <ActionIcon
                    color="red"
                    variant="subtle"
                    onClick={() => handleDelete(index)}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
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
