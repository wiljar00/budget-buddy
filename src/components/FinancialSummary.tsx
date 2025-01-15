import {
  Grid,
  Container,
  Accordion,
  Text,
  Stack,
  Paper,
  Group,
  Button,
} from "@mantine/core";
import { useEffect, useState } from "react";
import FinancialCard from "./FinancialCard";
import { loadIncome } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import { loadExpenses } from "../utils/storage";

interface Transaction {
  type: "income" | "expense";
  description: string;
  amount: number;
  date: Date;
  index: number;
}

export default function FinancialSummary() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const navigate = useNavigate();

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

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <Container size="md">
      <Grid gutter="md">
        <Grid.Col span={12}>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/transactions")}
          >
            <FinancialCard
              title="Current Balance"
              amount={`$${balance.toFixed(2)}`}
              description="Current balance"
              color="blue.7"
              isLarge
            />
          </div>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/expenses")}
          >
            <FinancialCard
              title="Expenses"
              amount={`$${totalExpenses.toFixed(2)}`}
              description="Total expenses this month"
              color="red.7"
            />
          </div>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/income")}
          >
            <FinancialCard
              title="Income"
              amount={`$${totalIncome.toFixed(2)}`}
              description="Total income this month"
              color="green.7"
            />
          </div>
        </Grid.Col>
      </Grid>

      <Accordion mt="xl" variant="separated">
        <Accordion.Item value="recent-transactions">
          <Accordion.Control>
            <Text fw={600} size="lg">
              Recent Transactions
            </Text>
          </Accordion.Control>
          <Accordion.Panel>
            <Stack gap="sm">
              {transactions.slice(0, 5).map((transaction, i) => (
                <Paper
                  key={i}
                  p="md"
                  radius="sm"
                  withBorder
                  bg={transaction.type === "income" ? "green.0" : "red.0"}
                >
                  <Group justify="space-between" wrap="nowrap">
                    <Text fw={500}>{transaction.description}</Text>
                    <Group gap="lg" wrap="nowrap">
                      <Text size="sm" c="dimmed">
                        {transaction.date.toLocaleDateString()}
                      </Text>
                      <Text
                        fw={500}
                        c={transaction.type === "income" ? "green.7" : "red.7"}
                      >
                        ${transaction.amount.toFixed(2)}
                      </Text>
                    </Group>
                  </Group>
                </Paper>
              ))}
              {transactions.length > 5 && (
                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  onClick={() => navigate("/transactions")}
                  mt="sm"
                >
                  View all transactions
                </Button>
              )}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
