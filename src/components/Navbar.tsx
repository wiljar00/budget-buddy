import {
  AppShell,
  Group,
  Title,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { IconUser, IconSun, IconMoon } from "@tabler/icons-react";

export default function Navbar() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <AppShell.Header
      withBorder
      bg={dark ? "dark.8" : "white"}
      style={{ boxShadow: "0 3px 3px rgba(0,0,0,0.1)" }}
    >
      <Group h="100%" px="md" justify="space-between">
        <Title order={1}>Budget Buddy App</Title>
        <Group>
          <ActionIcon
            variant="subtle"
            size="lg"
            onClick={() => toggleColorScheme()}
          >
            {dark ? <IconSun /> : <IconMoon />}
          </ActionIcon>
          <ActionIcon variant="subtle" size="lg">
            <IconUser />
          </ActionIcon>
        </Group>
      </Group>
    </AppShell.Header>
  );
}
