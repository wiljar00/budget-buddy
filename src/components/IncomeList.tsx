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
import IncomeForm from "./IncomeForm";
import { useState, useEffect } from "react";
import {
  loadIncome,
  saveIncome,
  IncomeEntry,
  deleteIncome,
} from "../utils/storage";
import { IconTrash } from "@tabler/icons-react";

export default function IncomeList() {
  const [entries, setEntries] = useState<IncomeEntry[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadIncome().then(setEntries);
  }, []);

  const handleAddIncome = async (entry: IncomeEntry) => {
    const newEntries = [...entries, entry];
    setEntries(newEntries);
    await saveIncome(newEntries);
  };

  const handleDelete = async (index: number) => {
    const newEntries = await deleteIncome(index, entries);
    setEntries(newEntries);
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
                  <Text fw={500} c="green">
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
