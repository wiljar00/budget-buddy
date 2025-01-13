export interface IncomeEntry {
  description: string;
  amount: number;
  date: Date;
}

const STORAGE_KEY = 'income_entries';

export const saveIncome = async (entries: IncomeEntry[]) => {
  try {
    const data = entries.map(entry => ({
      ...entry,
      date: entry.date.toISOString()
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save income:', error);
  }
};

export const loadIncome = async (): Promise<IncomeEntry[]> => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data).map((entry: any) => ({
      ...entry,
      date: new Date(entry.date)
    }));
  } catch (error) {
    console.error('Failed to load income:', error);
    return [];
  }
}; 