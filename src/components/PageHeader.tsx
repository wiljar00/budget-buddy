import { Group, Button, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <Group justify="space-between">
      <Button
        variant="subtle"
        color="blue"
        onClick={() => navigate("/")}
        leftSection={<IconArrowLeft size={16} />}
      >
        Back to Dashboard
      </Button>
      <Text size="xl" fw={500}>
        {title}
      </Text>
      <div style={{ width: 130 }} /> {/* Spacer for alignment */}
    </Group>
  );
}
