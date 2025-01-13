export interface IncomeEntry {
  description: string;
  amount: number;
  date: Date;
}

const STORAGE_KEY = 'income_entries';

export const saveIncome = async (entries: IncomeEntry[]) => {
  try {
    // Save to localStorage
    const data = entries.map(entry => ({
      ...entry,
      date: entry.date.toISOString()
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    // Save to file
    await fetch('/api/save-json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('Failed to save income:', error);
  }
};

export const loadIncome = async (): Promise<IncomeEntry[]> => {
  try {
    // Try loading from file first
    const fileResponse = await fetch('/api/load-json');
    const fileData = await fileResponse.json();
    if (fileData.length > 0) {
      const entries = fileData.map((entry: any) => ({
        ...entry,
        date: new Date(entry.date)
      }));
      // Sync localStorage with file data
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fileData));
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