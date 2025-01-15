import { connectToMongoDB } from './mongodb_connector';
import { IncomeEntry, ExpenseEntry } from './storage';

export async function saveIncomeToMongo(entries: IncomeEntry[]) {
  const response = await fetch('http://localhost:3000/api/income', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entries)
  });
  return response.json();
}

export async function loadIncomeFromMongo(): Promise<IncomeEntry[]> {
  const response = await fetch('http://localhost:3000/api/income');
  const data = await response.json();
  return data.map((entry: any) => ({
    description: entry.description,
    amount: entry.amount,
    date: new Date(entry.date)
  }));
}

export async function saveExpensesToMongo(entries: ExpenseEntry[]) {
  const response = await fetch('http://localhost:3000/api/expenses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entries)
  });
  return response.json();
}

export async function loadExpensesFromMongo(): Promise<ExpenseEntry[]> {
  const response = await fetch('http://localhost:3000/api/expenses');
  const data = await response.json();
  return data.map((entry: any) => ({
    description: entry.description,
    amount: entry.amount,
    date: new Date(entry.date)
  }));
}

export async function testMongoConnection() {
  try {
    const response = await fetch('http://localhost:3000/api/test-connection');
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Connection failed:', error);
    return false;
  }
} 