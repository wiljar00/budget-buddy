import { Menu, ActionIcon, Text } from "@mantine/core";
import { IconUser, IconLogout } from "@tabler/icons-react";
import { useAuth } from "../context/AuthContext";

export default function UserMenu() {
  const { user, logout } = useAuth();

  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <ActionIcon variant="subtle" size="lg">
          <IconUser style={{ width: "70%", height: "70%" }} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        <Menu.Item>
          <Text size="sm" fw={500}>
            {user?.email}
          </Text>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          color="red"
          leftSection={<IconLogout size={14} />}
          onClick={logout}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
