import {
  Box,
  VStack,
  Text,
  List,
  ListItem,
  Flex,
  Badge,
} from '@chakra-ui/react'

function TransactionList() {
  const transactions = [
    { id: 1, description: 'Groceries', amount: 150, type: 'expense' },
    { id: 2, description: 'Salary', amount: 1000, type: 'income' },
    { id: 3, description: 'Internet Bill', amount: 50, type: 'expense' },
  ]

  return (
    <Box 
      p={6} 
      bg="white" 
      borderRadius="xl" 
      boxShadow="md"
      border="1px"
      borderColor="gray.200"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Recent Transactions
      </Text>
      <List spacing={4}>
        {transactions.map((transaction) => (
          <ListItem 
            key={transaction.id}
            p={4}
            bg="gray.50"
            borderRadius="lg"
          >
            <Flex justify="space-between" align="center">
              <Text fontSize="lg">{transaction.description}</Text>
              <Flex align="center" gap={3}>
                <Text fontSize="lg" fontWeight="bold">
                  ${transaction.amount}
                </Text>
                <Badge
                  colorScheme={transaction.type === 'expense' ? 'red' : 'green'}
                  fontSize="md"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  {transaction.type}
                </Badge>
              </Flex>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default TransactionList 