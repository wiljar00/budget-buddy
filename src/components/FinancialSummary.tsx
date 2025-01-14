import { Grid, Container, Accordion, Text } from "@mantine/core";
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

      <Accordion mt="xl">
        <Accordion.Item value="recent-transactions">
          <Accordion.Control>Recent Transactions</Accordion.Control>
          <Accordion.Panel>
            {transactions.slice(0, 5).map((transaction, i) => (
              <Grid
                key={i}
                p="xs"
                bg={transaction.type === "income" ? "green.0" : "red.0"}
              >
                <Grid.Col span={6}>
                  <Text fw={500}>{transaction.description}</Text>
                </Grid.Col>
                <Grid.Col span={3}>
                  <Text c="dimmed">
                    {transaction.date.toLocaleDateString()}
                  </Text>
                </Grid.Col>
                <Grid.Col span={3}>
                  <Text
                    fw={500}
                    c={transaction.type === "income" ? "green" : "red"}
                    ta="right"
                  >
                    ${transaction.amount.toFixed(2)}
                  </Text>
                </Grid.Col>
              </Grid>
            ))}
            {transactions.length > 5 && (
              <Text
                mt="md"
                ta="center"
                c="blue"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/transactions")}
              >
                View all transactions →
              </Text>
            )}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
