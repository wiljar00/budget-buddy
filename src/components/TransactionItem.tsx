import {
  Paper,
  Stack,
  Group,
  Text,
  ActionIcon,
  TextInput,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";

interface TransactionItemProps {
  description: string;
  amount: number;
  date: Date;
  index: number;
  type: "income" | "expense";
  onDelete: (index: number) => void;
  onEdit: (index: number, newDescription: string) => void;
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
  const [isEditing, setIsEditing] = useState(false);
  const [editingDescription, setEditingDescription] = useState(description);

  const handleEdit = (newDescription: string) => {
    if (newDescription.trim()) {
      onEdit(index, newDescription);
    }
    setIsEditing(false);
    setEditingDescription(description);
  };

  return (
    <Paper
      shadow="sm"
      radius="md"
      p="md"
      withBorder
      bg={type === "income" ? "green.0" : "red.0"}
    >
      <Stack gap="xs">
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
            />
          ) : (
            <Text
              fw={500}
              style={{ cursor: "pointer" }}
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
            onClick={() => onDelete(index)}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
        <Group justify="space-between">
          <Text c="dimmed">{date.toLocaleDateString()}</Text>
          <Text fw={500} c={type === "income" ? "green" : "red"}>
            ${amount.toFixed(2)}
          </Text>
        </Group>
      </Stack>
    </Paper>
  );
}
