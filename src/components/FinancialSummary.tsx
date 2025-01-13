import { Grid, Container } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
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

        {isMobile ? (
          <Grid.Col span={12}>
            <Carousel
              slideSize="100%"
              height={150}
              align="start"
              slideGap="md"
              withIndicators
            >
              <Carousel.Slide>
                <FinancialCard
                  title="Expenses"
                  amount="$2,540.00"
                  description="Total expenses this month"
                  color="red.7"
                />
              </Carousel.Slide>
              <Carousel.Slide>
                <FinancialCard
                  title="Income"
                  amount="$4,000.00"
                  description="Total income this month"
                  color="green.7"
                />
              </Carousel.Slide>
            </Carousel>
          </Grid.Col>
        ) : (
          <>
            <Grid.Col span={6}>
              <FinancialCard
                title="Expenses"
                amount="$2,540.00"
                description="Total expenses this month"
                color="red.7"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <FinancialCard
                title="Income"
                amount="$4,000.00"
                description="Total income this month"
                color="green.7"
              />
            </Grid.Col>
          </>
        )}
      </Grid>
    </Container>
  );
}
