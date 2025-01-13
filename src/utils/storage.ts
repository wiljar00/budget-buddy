export interface IncomeEntry {
  description: string;
  amount: number;
  date: Date;
}

const STORAGE_KEY = 'income_entries';
const MAX_ENTRIES = 100;

export const saveIncome = async (entries: IncomeEntry[]) => {
  try {
    // Check total entries count
    const expenseEntries = await loadExpenses();
    if (entries.length + expenseEntries.length > MAX_ENTRIES) {
      throw new Error(`Cannot exceed ${MAX_ENTRIES} total entries`);
    }

    const data = entries.map(entry => ({
      ...entry,
      date: entry.date.toISOString()
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    await fetch('/api/save-income', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('Failed to save income:', error);
    throw error; // Re-throw to handle in the UI
  }
};

export const loadIncome = async (): Promise<IncomeEntry[]> => {
  try {
    // Try loading from file first
    const fileResponse = await fetch('/api/load-json');
    const fileData = await fileResponse.text(); // Get raw text first
    
    // Handle empty or invalid JSON
    if (!fileData || fileData.trim() === '') {
      return [];
    }

    const parsedData = JSON.parse(fileData);
    if (parsedData.length > 0) {
      const entries = parsedData.map((entry: any) => ({
        ...entry,
        date: new Date(entry.date)
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedData));
      return entries;
    }

    // Fallback to localStorage
    const localData = localStorage.getItem(STORAGE_KEY);
    if (!localData) return [];
    return JSON.parse(localData).map((entry: any) => ({
      ...entry,
      date: new Date(entry.date)
    }));
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
    // Check total entries count
    const incomeEntries = await loadIncome();
    if (entries.length + incomeEntries.length > MAX_ENTRIES) {
      throw new Error(`Cannot exceed ${MAX_ENTRIES} total entries`);
    }

    const data = entries.map(entry => ({
      ...entry,
      date: entry.date.toISOString()
    }));
    localStorage.setItem(EXPENSE_KEY, JSON.stringify(data));
    await fetch('/api/save-expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('Failed to save expenses:', error);
    throw error; // Re-throw to handle in the UI
  }
};

export const loadExpenses = async (): Promise<ExpenseEntry[]> => {
  try {
    const fileResponse = await fetch('/api/load-expenses');
    const fileData = await fileResponse.text();
    
    if (!fileData || fileData.trim() === '') {
      return [];
    }

    const parsedData = JSON.parse(fileData);
    if (parsedData.length > 0) {
      const entries = parsedData.map((entry: any) => ({
        ...entry,
        date: new Date(entry.date)
      }));
      localStorage.setItem(EXPENSE_KEY, JSON.stringify(parsedData));
      return entries;
    }

    const localData = localStorage.getItem(EXPENSE_KEY);
    if (!localData) return [];
    return JSON.parse(localData).map((entry: any) => ({
      ...entry,
      date: new Date(entry.date)
    }));
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