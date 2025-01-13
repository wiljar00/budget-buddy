import { AppShell, Group, Title, ActionIcon } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";

export default function Navbar() {
  return (
    <AppShell.Header>
      <Group h="100%" px="md" justify="space-between">
        <Title order={1}>Budget Buddy App</Title>
        <ActionIcon variant="subtle" size="lg">
          <IconUser />
        </ActionIcon>
      </Group>
    </AppShell.Header>
  );
}
