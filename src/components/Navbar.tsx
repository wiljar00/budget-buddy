import {
  AppShell,
  Group,
  Title,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { IconUser, IconSun, IconMoon } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const navigate = useNavigate();

  return (
    <AppShell.Header
      withBorder
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
    >
      <Group h="100%" px="md" justify="space-between">
        <Title
          order={3}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Budget Buddy
        </Title>
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
