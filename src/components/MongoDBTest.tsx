import { Button, Container, Paper, Text, Stack } from "@mantine/core";
import { useState } from "react";
import { testMongoConnection } from "../utils/api_service";

export default function MongoDBTest() {
  const [testResult, setTestResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTest = async () => {
    setIsLoading(true);
    try {
      const result = await testMongoConnection();
      setTestResult(
        result ? "Connection successful! ✅" : "Connection failed! ❌"
      );
    } catch (error) {
      setTestResult(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
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
        </Stack>
      </Paper>
    </Container>
  );
}
