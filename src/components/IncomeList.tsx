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
import IncomeForm from "./IncomeForm";
import { useState } from "react";

interface IncomeEntry {
  description: string;
  amount: number;
  date: Date;
}

export default function IncomeList() {
  const [entries, setEntries] = useState<IncomeEntry[]>([]);
  const navigate = useNavigate();

  const handleAddIncome = (entry: IncomeEntry) => {
    setEntries([...entries, entry]);
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
                <Text fw={500}>{entry.description}</Text>
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
