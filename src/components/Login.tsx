import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  Stack,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6 ? "Password must be at least 6 characters" : null,
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      // TODO: Replace with actual authentication
      if (
        values.email === "test@example.com" &&
        values.password === "password"
      ) {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("An error occurred during login");
    }
  });

  return (
    <Container size="xs" mt={100}>
      <Paper radius="md" p="xl" withBorder>
        <Title order={2} ta="center" mb="lg">
          Welcome to Budget Buddy
        </Title>

        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              {...form.getInputProps("password")}
            />

            {error && (
              <Text c="red" size="sm">
                {error}
              </Text>
            )}

            <Button type="submit" fullWidth>
              Sign in
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
