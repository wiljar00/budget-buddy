import { Container, VStack, Heading } from '@chakra-ui/react'
import BudgetSummary from './components/BudgetSummary'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'

function App() {
  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading 
          textAlign="center" 
          size="xl" 
          color="blue.600"
          mb={6}
        >
          My Budget Tracker
        </Heading>
        <BudgetSummary />
        {/* <TransactionForm />
        <TransactionList /> */}
      </VStack>
    </Container>
  )
}

export default App
