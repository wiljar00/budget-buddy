import { Button, Container, Paper, Text, Stack, Code } from "@mantine/core";
import { useState } from "react";
import { testMongoConnection } from "../utils/api_service";

export default function MongoDBTest() {
  const [testResult, setTestResult] = useState<string>("");
  const [errorDetails, setErrorDetails] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTest = async () => {
    setIsLoading(true);
    setErrorDetails("");
    try {
      const success = await testMongoConnection();
      setTestResult(
        success ? "Connection successful! ✅" : "Connection failed! ❌"
      );
      if (!success) {
        setErrorDetails("Connection test returned false");
      }
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
                Error Details:
              </Text>
              <Code block>{errorDetails}</Code>
            </Paper>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}
