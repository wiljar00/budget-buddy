import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  Stack,
  Text,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [error, setError] = useState("");
  const { login } = useAuth();

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
      await login(values.email, values.password);
      localStorage.setItem("userEmail", values.email);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Login failed. Please try again.");
      }
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

            <Group justify="center">
              <Text size="sm">
                Don't have an account?{" "}
                <Link to="/register" style={{ textDecoration: "none" }}>
                  Register
                </Link>
              </Text>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
