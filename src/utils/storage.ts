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

export interface ExpenseEntry {
  description: string;
  amount: number;
  date: Date;
}

const MAX_ENTRIES = 100;

export const saveIncome = async (entries: IncomeEntry[]) => {
  try {
    const expenseEntries = await loadExpenses();
    if (entries.length + expenseEntries.length > MAX_ENTRIES) {
      throw new Error(`Cannot exceed ${MAX_ENTRIES} total entries`);
    }
    return await saveIncomeToMongo(entries);
  } catch (error) {
    console.error('Failed to save income:', error);
    throw error;
  }
};

export const loadIncome = async (): Promise<IncomeEntry[]> => {
  try {
    return await loadIncomeFromMongo();
  } catch (error) {
    console.error('Failed to load income:', error);
    return [];
  }
};

export const saveExpenses = async (entries: ExpenseEntry[]) => {
  try {
    const incomeEntries = await loadIncome();
    if (entries.length + incomeEntries.length > MAX_ENTRIES) {
      throw new Error(`Cannot exceed ${MAX_ENTRIES} total entries`);
    }
    return await saveExpensesToMongo(entries);
  } catch (error) {
    console.error('Failed to save expenses:', error);
    throw error;
  }
};

export const loadExpenses = async (): Promise<ExpenseEntry[]> => {
  try {
    return await loadExpensesFromMongo();
  } catch (error) {
    console.error('Failed to load expenses:', error);
    return [];
  }
};

// Add delete functions
export const deleteIncome = async (index: number, entries: IncomeEntry[]) => {
  try {
    const newEntries = entries.filter((_, i) => i !== index);
    return await saveIncomeToMongo(newEntries);
  } catch (error) {
    console.error('Failed to delete income:', error);
    return entries;
  }
};

export const deleteExpense = async (index: number, entries: ExpenseEntry[]) => {
  try {
    const newEntries = entries.filter((_, i) => i !== index);
    return await saveExpensesToMongo(newEntries);
  } catch (error) {
    console.error('Failed to delete expense:', error);
    return entries;
  }
}; 