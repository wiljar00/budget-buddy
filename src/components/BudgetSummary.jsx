import { 
  Box, 
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'

function BudgetSummary() {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}> 
      <Box 
        bg="green.50" 
        p={6} 
        borderRadius="xl" 
        boxShadow="md"
        border="1px"
        borderColor="green.200"
      >
        <VStack align="stretch" spacing={1}>
          <Text fontSize="xl" color="gray.600">Total Income</Text>
          <Text fontSize="3xl" fontWeight="bold" color="green.500">$1,000</Text>
          <Text fontSize="sm" color="gray.500">This month</Text>
        </VStack>
      </Box>

      <Box 
        bg="red.50" 
        p={6} 
        borderRadius="xl" 
        boxShadow="md"
        border="1px"
        borderColor="red.200"
      >
        <VStack align="stretch" spacing={1}>
          <Text fontSize="xl" color="gray.600">Total Expenses</Text>
          <Text fontSize="3xl" fontWeight="bold" color="red.500">$500</Text>
          <Text fontSize="sm" color="gray.500">This month</Text>
        </VStack>
      </Box>

      <Box 
        bg="blue.50" 
        p={6} 
        borderRadius="xl" 
        boxShadow="md"
        border="1px"
        borderColor="blue.200"
      >
        <VStack align="stretch" spacing={1}>
          <Text fontSize="xl" color="gray.600">Balance</Text>
          <Text fontSize="3xl" fontWeight="bold" color="blue.500">$500</Text>
          <Text fontSize="sm" color="gray.500">Current balance</Text>
        </VStack>
      </Box>
    </SimpleGrid>
  )
}

export default BudgetSummary 