import { Drawer, Stack, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

interface NavigationDrawerProps {
  opened: boolean;
  onClose: () => void;
}

export default function NavigationDrawer({
  opened,
  onClose,
}: NavigationDrawerProps) {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer opened={opened} onClose={onClose} title="Pages">
      <Stack gap="md">
        <Button variant="light" onClick={() => handleNavigation("/")} fullWidth>
          Dashboard
        </Button>
        <Button
          variant="light"
          color="green"
          onClick={() => handleNavigation("/income")}
          fullWidth
        >
          Income
        </Button>
        <Button
          variant="light"
          color="red"
          onClick={() => handleNavigation("/expenses")}
          fullWidth
        >
          Expenses
        </Button>
        <Button
          variant="light"
          color="blue"
          onClick={() => handleNavigation("/transactions")}
          fullWidth
        >
          Transactions
        </Button>
      </Stack>
    </Drawer>
  );
}
