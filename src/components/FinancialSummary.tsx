import { Grid, Container } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import FinancialCard from "./FinancialCard";

export default function FinancialSummary() {
  const isMobile = useMediaQuery("(max-width: 48em)");

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
          <FinancialCard
            title="Income"
            amount="$4,000.00"
            description="Total income this month"
            color="green.7"
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
