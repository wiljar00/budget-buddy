import {
  Paper,
  Stack,
  Group,
  Text,
  ActionIcon,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";

interface TransactionItemProps {
  description: string;
  amount: number;
  date: Date;
  index: number;
  type: "income" | "expense";
  onDelete: (type: "income" | "expense", index: number) => void;
  onEdit: (
    type: "income" | "expense",
    index: number,
    description: string
  ) => void;
}

export default function TransactionItem({
  description,
  amount,
  date,
  index,
  type,
  onDelete,
  onEdit,
}: TransactionItemProps) {
  const { colorScheme } = useMantineColorScheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editingDescription, setEditingDescription] = useState(description);

  const getBgColor = () => {
    if (colorScheme === "dark") {
      return type === "income" ? "dark.4" : "dark.3";
    }
    return type === "income" ? "teal.1" : "red.1";
  };

  const handleEdit = (newDescription: string) => {
    if (newDescription.trim()) {
      onEdit(type, index, newDescription);
    }
    setIsEditing(false);
    setEditingDescription(description);
  };

  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <Paper
      shadow="sm"
      radius="md"
      p="xs"
      withBorder
      bg={getBgColor()}
      style={{
        backgroundColor: `var(--mantine-color-${getBgColor().replace(
          ".",
          "-"
        )})`,
      }}
    >
      <Stack gap="0">
        <Group justify="space-between">
          {isEditing ? (
            <TextInput
              value={editingDescription}
              onChange={(e) => setEditingDescription(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleEdit(editingDescription);
                } else if (e.key === "Escape") {
                  setIsEditing(false);
                  setEditingDescription(description);
                }
              }}
              onBlur={() => handleEdit(editingDescription)}
              autoFocus
              size="xs"
            />
          ) : (
            <Text
              fw={500}
              style={{ cursor: "pointer" }}
              size="sm"
              onClick={() => {
                setIsEditing(true);
                setEditingDescription(description);
              }}
            >
              {description}
            </Text>
          )}
          <ActionIcon
            color="red"
            variant="subtle"
            onClick={() => onDelete(type, index)}
            size="sm"
          >
            <IconTrash size={14} />
          </ActionIcon>
        </Group>
        <Group justify="space-between">
          <Text c="dimmed" size="xs">
            {formattedDate}
          </Text>
          <Text
            fw={500}
            c={type === "income" ? "teal.4" : "red.4"}
            style={{ fontSize: "0.9rem" }}
          >
            ${amount.toFixed(2)}
          </Text>
        </Group>
      </Stack>
    </Paper>
  );
}
