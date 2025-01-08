import {
  Box,
  Button,
  Input,
  Select,
  VStack,
  Heading,
} from '@chakra-ui/react'
import { Field } from './ui/field'
import { useState } from 'react'

function TransactionForm() {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ description, amount, type })
  }

  return (
    <Box 
      p={6} 
      bg="white" 
      borderRadius="xl" 
      boxShadow="md"
      border="1px"
      borderColor="gray.200"
    >
      <Heading size="md" mb={4}>Add New Transaction</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Field label="What is it for?">
            <Input
              size="lg"
              placeholder="e.g., Groceries, Rent, Salary"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field>

          <Field label="How much?">
            <Input
              size="lg"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Field>

          <Field label="Type">
            <Select
              size="lg"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </Select>
          </Field>

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            width="100%"
            fontSize="lg"
            mt={4}
          >
            Add Transaction
          </Button>
        </VStack>
      </form>
    </Box>
  )
}

export default TransactionForm 