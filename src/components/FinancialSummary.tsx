import { Container, Grid, Stack, Button, Accordion, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadIncome, loadExpenses } from "../utils/storage";
import FinancialCard from "./FinancialCard";
import TransactionItem from "./TransactionItem";

interface Transaction {
  description: string;
  amount: number;
  date: Date;
  type: "income" | "expense";
}

export default function FinancialSummary() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const incomeData = await loadIncome();
        const expensesData = await loadExpenses();

        const allTransactions = [
          ...incomeData.map((inc) => ({
            ...inc,
            date: new Date(inc.date),
            type: "income" as const,
          })),
          ...expensesData.map((exp) => ({
            ...exp,
            date: new Date(exp.date),
            type: "expense" as const,
          })),
        ].sort((a, b) => b.date.getTime() - a.date.getTime());

        setTransactions(allTransactions);
        setTotalIncome(incomeData.reduce((sum, inc) => sum + inc.amount, 0));
        setTotalExpenses(
          expensesData.reduce((sum, exp) => sum + exp.amount, 0)
        );
      } catch (error) {
        console.error("Error loading transactions:", error);
      }
    };

    loadTransactions();
  }, []);

  const balance = totalIncome - totalExpenses;

  return (
    <Container size="sm" mt="xl">
      <Stack>
        <Grid>
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
          <Grid.Col span={{ base: 12, sm: 6 }}>
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
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/income")}
            >
              <FinancialCard
                title="Income"
                amount={`$${totalIncome.toFixed(2)}`}
                description="Total income this month"
                color="teal.7"
              />
            </div>
          </Grid.Col>
        </Grid>

        <Accordion variant="separated">
          <Accordion.Item value="recent">
            <Accordion.Control>
              <Text fw={500}>Recent Transactions</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack>
                {transactions.slice(0, 5).map((transaction, index) => (
                  <TransactionItem
                    key={index}
                    description={transaction.description}
                    amount={transaction.amount}
                    date={transaction.date}
                    type={transaction.type}
                    index={index}
                    onDelete={() => {}} // No-op since we don't want deletion here
                    onEdit={() => {}} // No-op since we don't want editing here
                  />
                ))}
                {transactions.length > 5 && (
                  <Button
                    variant="light"
                    color="blue"
                    onClick={() => navigate("/transactions")}
                  >
                    View all transactions
                  </Button>
                )}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Stack>
    </Container>
  );
}
