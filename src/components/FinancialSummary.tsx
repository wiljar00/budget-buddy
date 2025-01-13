import { Grid, Container } from "@mantine/core";
import { useEffect, useState } from "react";
import FinancialCard from "./FinancialCard";
import { loadIncome, IncomeEntry } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import { loadExpenses, ExpenseEntry } from "../utils/storage";

export default function FinancialSummary() {
  const [incomeEntries, setIncomeEntries] = useState<IncomeEntry[]>([]);
  const [expenseEntries, setExpenseEntries] = useState<ExpenseEntry[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadIncome().then(setIncomeEntries);
    loadExpenses().then(setExpenseEntries);
  }, []);

  const totalIncome = incomeEntries.reduce(
    (sum, entry) => sum + entry.amount,
    0
  );
  const totalExpenses = expenseEntries.reduce(
    (sum, entry) => sum + entry.amount,
    0
  );
  const balance = totalIncome - totalExpenses;

  return (
    <Container size="md">
      <Grid gutter="md">
        <Grid.Col span={12}>
          <FinancialCard
            title="Balance"
            amount={`$${balance.toFixed(2)}`}
            description="Current balance"
            color="blue.7"
            isLarge
          />
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
    </Container>
  );
}
