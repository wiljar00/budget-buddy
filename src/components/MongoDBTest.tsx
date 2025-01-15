import { Button, Container, Paper, Text, Stack, Code } from "@mantine/core";
import { useState } from "react";

export default function MongoDBTest() {
  const [testResult, setTestResult] = useState<string>("");
  const [errorDetails, setErrorDetails] = useState<string>("");
  const [requestDetails, setRequestDetails] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTest = async () => {
    setIsLoading(true);
    setErrorDetails("");
    const requestInfo = {
      url: "http://localhost:3000/api/test-connection",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      timestamp: new Date().toISOString(),
    };
    setRequestDetails(JSON.stringify(requestInfo, null, 2));

    try {
      const response = await fetch("http://localhost:3000/api/test-connection");
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
          <Button onClick={handleTest} loading={isLoading} color="blue">
            Test Connection
          </Button>

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
