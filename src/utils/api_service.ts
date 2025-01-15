import { IncomeEntry, ExpenseEntry } from './storage';

export async function saveIncomeToMongo(entries: IncomeEntry[]) {
  const response = await fetch('http://localhost:3000/api/income', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entries.map(entry => ({
      ...entry,
      date: entry.date.toISOString() // Convert Date to string for MongoDB
    })))
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data;
}

export async function loadIncomeFromMongo(): Promise<IncomeEntry[]> {
  const response = await fetch('http://localhost:3000/api/income');
  const data = await response.json();
  if (!Array.isArray(data)) throw new Error('Invalid response format');
  return data.map(entry => ({
    description: entry.description,
    amount: Number(entry.amount),
    date: new Date(entry.date)
  }));
}

export async function saveExpensesToMongo(entries: ExpenseEntry[]) {
  const response = await fetch('http://localhost:3000/api/expenses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entries.map(entry => ({
      ...entry,
      date: entry.date.toISOString() // Convert Date to string for MongoDB
    })))
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data;
}

export async function loadExpensesFromMongo(): Promise<ExpenseEntry[]> {
  const response = await fetch('http://localhost:3000/api/expenses');
  const data = await response.json();
  if (!Array.isArray(data)) throw new Error('Invalid response format');
  return data.map(entry => ({
    description: entry.description,
    amount: Number(entry.amount),
    date: new Date(entry.date)
  }));
}

export async function testMongoConnection() {
  const response = await fetch('http://localhost:3000/api/test-connection');
  const data = await response.json();
  if (!data.success) {
    throw new Error(`${data.name}: ${data.error}\n${data.stack}`);
  }
  return data.success;
} 