import {
  AppShell,
  Group,
  Title,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { IconUser, IconSun, IconMoon, IconMenu2 } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NavigationDrawer from "./NavigationDrawer";

export default function Navbar() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const navigate = useNavigate();
  const [drawerOpened, setDrawerOpened] = useState(false);

  return (
    <>
      <NavigationDrawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
      />

      <AppShell.Header
        withBorder
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
      >
        <Group h="100%" px="md" justify="space-between">
          <ActionIcon
            variant="subtle"
            size="lg"
            onClick={() => setDrawerOpened(true)}
          >
            <IconMenu2 />
          </ActionIcon>

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
    </>
  );
}
