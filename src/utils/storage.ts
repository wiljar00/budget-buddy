import {
  saveIncomeToMongo,
  loadIncomeFromMongo,
  saveExpensesToMongo,
  loadExpensesFromMongo
} from './api_service';

export interface IncomeEntry {
  description: string;
  amount: number;
  date: Date;
}

const STORAGE_KEY = 'income_entries';
const MAX_ENTRIES = 100;

export const saveIncome = async (entries: IncomeEntry[]) => {
  try {
    const expenseEntries = await loadExpenses();
    if (entries.length + expenseEntries.length > MAX_ENTRIES) {
      throw new Error(`Cannot exceed ${MAX_ENTRIES} total entries`);
    }

    await saveIncomeToMongo(entries);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Failed to save income:', error);
    throw error;
  }
};

export const loadIncome = async (): Promise<IncomeEntry[]> => {
  try {
    const entries = await loadIncomeFromMongo();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return entries;
  } catch (error) {
    console.error('Failed to load income:', error);
    return [];
  }
};

export interface ExpenseEntry {
  description: string;
  amount: number;
  date: Date;
}

const EXPENSE_KEY = 'expense_entries';

export const saveExpenses = async (entries: ExpenseEntry[]) => {
  try {
    const incomeEntries = await loadIncome();
    if (entries.length + incomeEntries.length > MAX_ENTRIES) {
      throw new Error(`Cannot exceed ${MAX_ENTRIES} total entries`);
    }

    await saveExpensesToMongo(entries);
    localStorage.setItem(EXPENSE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Failed to save expenses:', error);
    throw error;
  }
};

export const loadExpenses = async (): Promise<ExpenseEntry[]> => {
  try {
    const entries = await loadExpensesFromMongo();
    localStorage.setItem(EXPENSE_KEY, JSON.stringify(entries));
    return entries;
  } catch (error) {
    console.error('Failed to load expenses:', error);
    return [];
  }
};

// Add delete functions
export const deleteIncome = async (index: number, entries: IncomeEntry[]) => {
  try {
    const newEntries = entries.filter((_, i) => i !== index);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries));
    await fetch('/api/save-json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntries)
    });
    return newEntries;
  } catch (error) {
    console.error('Failed to delete income:', error);
    return entries;
  }
};

export const deleteExpense = async (index: number, entries: ExpenseEntry[]) => {
  try {
    const newEntries = entries.filter((_, i) => i !== index);
    localStorage.setItem(EXPENSE_KEY, JSON.stringify(newEntries));
    await fetch('/api/save-expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntries)
    });
    return newEntries;
  } catch (error) {
    console.error('Failed to delete expense:', error);
    return entries;
  }
}; 