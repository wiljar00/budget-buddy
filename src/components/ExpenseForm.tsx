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
import { useState, useEffect } from "react";
import { loadExpenses } from "../utils/storage";
import PageHeader from "./PageHeader";

interface ExpenseFormProps {
  onSubmit: (values: {
    description: string;
    amount: number;
    date: Date;
  }) => void;
}

export default function ExpenseForm({ onSubmit }: ExpenseFormProps) {
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

  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const loadTotal = async () => {
      const expenseData = await loadExpenses();
      setTotalExpenses(expenseData.reduce((sum, exp) => sum + exp.amount, 0));
    };
    loadTotal();
  }, []);

  return (
    <Container size="md" mt="xl">
      <Stack>
        <PageHeader title="Expense Entries" />

        <FinancialCard
          title="Total Expenses"
          amount={`$${totalExpenses.toFixed(2)}`}
          description="Total expenses this month"
          color="red.7"
          isLarge
        />

        <Paper p="md" withBorder>
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                label="Description"
                placeholder="Rent, Utilities, etc."
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
                <Button type="submit" color="red">
                  Add Expense
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </Container>
  );
}
