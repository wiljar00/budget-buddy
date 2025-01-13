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
    <AppShell.Header>
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
