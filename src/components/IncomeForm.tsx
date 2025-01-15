import {
  TextInput,
  NumberInput,
  Stack,
  Button,
  Group,
  Container,
  Paper,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import FinancialCard from "./FinancialCard";
import { useEffect, useState } from "react";
import { loadIncome } from "../utils/storage";
import PageHeader from "./PageHeader";

interface IncomeFormProps {
  onSubmit: (values: {
    description: string;
    amount: number;
    date: Date;
  }) => void;
}

export default function IncomeForm({ onSubmit }: IncomeFormProps) {
  const form = useForm({
    initialValues: {
      description: "",
      amount: 0,
      date: new Date(),
    },
    validate: {
      description: (value) =>
        value.length < 2 ? "Description must be at least 2 characters" : null,
      amount: (value) => (value <= 0 ? "Amount must be greater than 0" : null),
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    onSubmit(values);
    form.reset();
  });

  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    const loadTotal = async () => {
      const incomeData = await loadIncome();
      setTotalIncome(incomeData.reduce((sum, inc) => sum + inc.amount, 0));
    };
    loadTotal();
  }, []);

  return (
    <Container size="sm" mt="xl">
      <Stack>
        <PageHeader title="Income Entries" />

        <FinancialCard
          title="Total Income"
          amount={`$${totalIncome.toFixed(2)}`}
          description="Total income this month"
          color="teal.7"
          isLarge
        />

        <Paper p="md" withBorder>
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                label="Description"
                placeholder="Salary, Freelance work, etc."
                required
                {...form.getInputProps("description")}
              />

              <NumberInput
                label="Amount"
                placeholder="0.00"
                required
                min={0}
                prefix="$"
                decimalScale={2}
                fixedDecimalScale
                {...form.getInputProps("amount")}
              />

              <DateInput
                label="Date"
                placeholder="Pick a date"
                required
                valueFormat="MMMM D, YYYY"
                defaultValue={new Date()}
                hideOutsideDates
                {...form.getInputProps("date")}
                styles={{
                  calendarHeader: { display: "none" },
                }}
              />

              <Group justify="flex-end" mt="md">
                <Button type="submit" color="green">
                  Add Income
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </Container>
  );
}
