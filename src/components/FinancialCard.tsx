import { Paper, Text, Title } from "@mantine/core";

interface FinancialCardProps {
  title: string;
  amount: string;
  description: string;
  color: string;
  isLarge?: boolean;
}

export default function FinancialCard({
  title,
  amount,
  description,
  color,
  isLarge = false,
}: FinancialCardProps) {
  return (
    <Paper shadow="sm" radius="md" p={isLarge ? "xl" : "md"} withBorder>
      <Title order={3} c={color} ta="center">
        {title}
      </Title>
      <Text fz={isLarge ? "2.5rem" : "xl"} fw={700} ta="center">
        {amount}
      </Text>
      <Text fz="sm" c="dimmed" ta="center">
        {description}
      </Text>
    </Paper>
  );
}
