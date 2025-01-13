import {
  Paper,
  TextInput,
  NumberInput,
  Stack,
  Button,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";

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

  return (
    <Paper shadow="sm" radius="md" p="xl" withBorder>
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
  );
}
