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
import { useNavigate, Link } from "react-router-dom";
import { register } from "../utils/api_service";

export default function Register() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6 ? "Password must be at least 6 characters" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      await register(values.email, values.password);
      setError(""); // Clear any previous errors
      const successMessage =
        "Account created successfully! Redirecting to login...";
      setError(successMessage);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  });

  return (
    <Container size="xs" mt={100}>
      <Paper radius="md" p="xl" withBorder>
        <Title order={2} ta="center" mb="lg">
          Create an Account
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

            <PasswordInput
              required
              label="Confirm Password"
              placeholder="Confirm your password"
              {...form.getInputProps("confirmPassword")}
            />

            {error && (
              <Text
                c={error.includes("successfully") ? "green" : "red"}
                size="sm"
              >
                {error}
              </Text>
            )}

            <Button type="submit" fullWidth>
              Register
            </Button>

            <Group justify="center">
              <Text size="sm">
                Already have an account?{" "}
                <Link to="/login" style={{ textDecoration: "none" }}>
                  Login
                </Link>
              </Text>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
