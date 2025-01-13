import { Grid, Container } from "@mantine/core";
import { useEffect, useState } from "react";
import FinancialCard from "./FinancialCard";
import { loadIncome, IncomeEntry } from "../utils/storage";
import { useNavigate } from "react-router-dom";

export default function FinancialSummary() {
  const [entries, setEntries] = useState<IncomeEntry[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadIncome().then(setEntries);
  }, []);

  const totalIncome = entries.reduce((sum, entry) => sum + entry.amount, 0);
  const expenses = 2540.0; // TODO: Add expenses functionality
  const balance = totalIncome - expenses;

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
          <FinancialCard
            title="Expenses"
            amount={`$${expenses.toFixed(2)}`}
            description="Total expenses this month"
            color="red.7"
          />
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
