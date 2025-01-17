import {
  Button,
  Container,
  Paper,
  Text,
  Stack,
  Code,
  Group,
} from "@mantine/core";
import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  console.error("VITE_API_URL environment variable is not set");
}

export default function MongoDBTest() {
  const [testResult, setTestResult] = useState<string>("");
  const [errorDetails, setErrorDetails] = useState<string>("");
  const [requestDetails, setRequestDetails] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTest = async () => {
    if (!API_BASE_URL) {
      setTestResult("Configuration Error ❌");
      setErrorDetails(
        "API URL is not configured. Please check environment variables."
      );
      return;
    }

    setIsLoading(true);
    setErrorDetails("");
    const requestInfo = {
      url: `${API_BASE_URL}/test-connection`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      timestamp: new Date().toISOString(),
    };
    setRequestDetails(JSON.stringify(requestInfo, null, 2));

    try {
      const response = await fetch(`${API_BASE_URL}/test-connection`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTestResult(
        data.success ? "Connection successful! ✅" : "Connection failed! ❌"
      );
      setErrorDetails(JSON.stringify(data, null, 2));
    } catch (error) {
      setTestResult("Connection failed! ❌");
      setErrorDetails(
        error instanceof Error
          ? `${error.name}: ${error.message}`
          : "Unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size="sm" mt="xl">
      <Paper p="md" withBorder>
        <Stack>
          <Text size="xl" fw={500}>
            MongoDB Connection Test
          </Text>
          {!API_BASE_URL && (
            <Paper withBorder p="xs" bg="yellow.1">
              <Text c="yellow.9" fw={500}>
                ⚠️ API URL not configured
              </Text>
              <Text size="sm">
                The API URL environment variable (VITE_API_URL) is not set.
              </Text>
            </Paper>
          )}
          <Group>
            <Button onClick={handleTest} loading={isLoading} color="blue">
              Test Connection
            </Button>
            <Button
              onClick={async () => {
                if (!API_BASE_URL) {
                  setTestResult("Configuration Error ❌");
                  setErrorDetails(
                    "API URL is not configured. Please check environment variables."
                  );
                  return;
                }

                setIsLoading(true);
                setErrorDetails("");

                const requestInfo = {
                  url: `${API_BASE_URL}/test-data`,
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  timestamp: new Date().toISOString(),
                };
                setRequestDetails(JSON.stringify(requestInfo, null, 2));

                try {
                  const response = await fetch(`${API_BASE_URL}/test-data`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                  });
                  if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  const data = await response.json();
                  setTestResult(
                    response.ok
                      ? "Test data added successfully! ✅"
                      : "Failed to add test data ❌"
                  );
                  setErrorDetails(JSON.stringify(data, null, 2));
                } catch (error) {
                  setTestResult("Failed to add test data ❌");
                  setErrorDetails(
                    error instanceof Error
                      ? `${error.name}: ${error.message}`
                      : "Failed to add test data"
                  );
                } finally {
                  setIsLoading(false);
                }
              }}
              loading={isLoading}
              color="green"
            >
              Add Test Data
            </Button>
          </Group>

          {requestDetails && (
            <Paper withBorder p="xs" bg="blue.0">
              <Text size="sm" fw={500} mb={5}>
                Request Details:
              </Text>
              <Code block>{requestDetails}</Code>
            </Paper>
          )}

          {testResult && (
            <Text
              c={testResult.includes("successful") ? "green" : "red"}
              fw={500}
            >
              {testResult}
            </Text>
          )}

          {errorDetails && (
            <Paper withBorder p="xs" bg="red.1">
              <Text size="sm" fw={500} mb={5}>
                Response Details:
              </Text>
              <Code block>{errorDetails}</Code>
            </Paper>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}
