import { AppShell, Group, Title } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationDrawer from "./NavigationDrawer";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  return (
    <AppShell.Header withBorder>
      <Group h="100%" px="md" justify="space-between">
        <IconMenu2
          style={{ cursor: "pointer" }}
          onClick={() => setOpened(true)}
        />
        <Title
          order={3}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Budget Buddy
        </Title>
        <UserMenu />
      </Group>

      <NavigationDrawer opened={opened} onClose={() => setOpened(false)} />
    </AppShell.Header>
  );
}
