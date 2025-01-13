import { Grid, Container } from "@mantine/core";
import FinancialCard from "./FinancialCard";
import { useNavigate } from "react-router-dom";

export default function FinancialSummary() {
  const navigate = useNavigate();

  return (
    <Container size="md">
      <Grid gutter="md">
        <Grid.Col span={12}>
          <FinancialCard
            title="Balance"
            amount="$1,460.00"
            description="Current balance"
            color="blue.7"
            isLarge
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <FinancialCard
            title="Expenses"
            amount="$2,540.00"
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
              amount="$4,000.00"
              description="Total income this month"
              color="green.7"
            />
          </div>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
