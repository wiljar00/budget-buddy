import {
  AppShell,
  Group,
  Title,
  ActionIcon,
  useMantineColorScheme,
  Drawer,
  Stack,
  Button,
} from "@mantine/core";
import { IconUser, IconSun, IconMoon, IconMenu2 } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const navigate = useNavigate();
  const [drawerOpened, setDrawerOpened] = useState(false);

  return (
    <>
      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        title="Navigation"
      >
        <Stack gap="md">
          <Button
            variant="light"
            onClick={() => {
              navigate("/");
              setDrawerOpened(false);
            }}
            fullWidth
          >
            Dashboard
          </Button>
          <Button
            variant="light"
            color="green"
            onClick={() => {
              navigate("/income");
              setDrawerOpened(false);
            }}
            fullWidth
          >
            Income
          </Button>
          <Button
            variant="light"
            color="red"
            onClick={() => {
              navigate("/expenses");
              setDrawerOpened(false);
            }}
            fullWidth
          >
            Expenses
          </Button>
          <Button
            variant="light"
            color="blue"
            onClick={() => {
              navigate("/transactions");
              setDrawerOpened(false);
            }}
            fullWidth
          >
            Transactions
          </Button>
        </Stack>
      </Drawer>

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
