import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import { 
  saveIncome, 
  loadIncome, 
  saveExpenses, 
  loadExpenses, 
  deleteIncome, 
  deleteExpense 
} from '../storage';

// Mock fetch globally
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
global.localStorage = {
  getItem: jest.fn() as jest.MockedFunction<(key: string) => string | null>,
  setItem: jest.fn() as jest.MockedFunction<(key: string, value: string) => void>,
  clear: jest.fn() as jest.MockedFunction<() => void>,
  removeItem: jest.fn() as jest.MockedFunction<(key: string) => void>,
  length: 0,
  key: jest.fn() as jest.MockedFunction<(index: number) => string | null>,
};

describe('Storage Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Income Operations', () => {
    test('loadIncome should return empty array for empty response', async () => {
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({ text: () => Promise.resolve('') })
      );
      const result = await loadIncome();
      expect(result).toEqual([]);
    });

    test('loadIncome should parse and return valid data', async () => {
      const mockData = [{
        description: 'Test',
        amount: 100,
        date: new Date().toISOString()
      }];
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({ text: () => Promise.resolve(JSON.stringify(mockData)) })
      );
      const result = await loadIncome();
      expect(result[0].description).toBe('Test');
      expect(result[0].amount).toBe(100);
      expect(result[0].date).toBeInstanceOf(Date);
    });

    test('deleteIncome should remove entry at specified index', async () => {
      const entries = [
        { description: 'Test1', amount: 100, date: new Date() },
        { description: 'Test2', amount: 200, date: new Date() }
      ];
      const result = await deleteIncome(0, entries);
      expect(result).toHaveLength(1);
      expect(result[0].description).toBe('Test2');
    });
  });

  describe('Expense Operations', () => {
    test('loadExpenses should return empty array for empty response', async () => {
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({ text: () => Promise.resolve('') })
      );
      const result = await loadExpenses();
      expect(result).toEqual([]);
    });

    test('loadExpenses should parse and return valid data', async () => {
      const mockData = [{
        description: 'Test Expense',
        amount: 50,
        date: new Date().toISOString()
      }];
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({ text: () => Promise.resolve(JSON.stringify(mockData)) })
      );
      const result = await loadExpenses();
      expect(result[0].description).toBe('Test Expense');
      expect(result[0].amount).toBe(50);
      expect(result[0].date).toBeInstanceOf(Date);
    });

    test('deleteExpense should remove entry at specified index', async () => {
      const entries = [
        { description: 'Test1', amount: 50, date: new Date() },
        { description: 'Test2', amount: 75, date: new Date() }
      ];
      const result = await deleteExpense(0, entries);
      expect(result).toHaveLength(1);
      expect(result[0].description).toBe('Test2');
    });

    test('saveExpenses should throw error when total entries exceed 100', async () => {
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          text: () => Promise.resolve(JSON.stringify(Array(90).fill({ 
            description: 'Test income',
            amount: 100,
            date: new Date().toISOString()
          })))
        })
      );

      const expenseEntries = Array(11).fill({
        description: 'Test expense',
        amount: 100,
        date: new Date()
      });

      await expect(saveExpenses(expenseEntries)).rejects.toThrow('Cannot exceed 100 total entries');
    });

    test('saveExpenses should save when under limit', async () => {
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          text: () => Promise.resolve(JSON.stringify(Array(50).fill({ 
            description: 'Test income',
            amount: 100,
            date: new Date().toISOString()
          })))
        })
      );

      const expenseEntries = Array(49).fill({
        description: 'Test expense',
        amount: 100,
        date: new Date()
      });

      await expect(saveExpenses(expenseEntries)).resolves.not.toThrow();
    });
  });

  describe('Storage Limits', () => {
    test('should throw error when total entries exceed 100', async () => {
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          text: () => Promise.resolve(JSON.stringify(Array(90).fill({ 
            description: 'Test expense',
            amount: 100,
            date: new Date().toISOString()
          })))
        })
      );

      const incomeEntries = Array(11).fill({
        description: 'Test income',
        amount: 100,
        date: new Date()
      });

      await expect(saveIncome(incomeEntries)).rejects.toThrow('Cannot exceed 100 total entries');
    });

    test('should allow saving when total is under limit', async () => {
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          text: () => Promise.resolve(JSON.stringify(Array(50).fill({ 
            description: 'Test expense',
            amount: 100,
            date: new Date().toISOString()
          })))
        })
      );

      const incomeEntries = Array(49).fill({
        description: 'Test income',
        amount: 100,
        date: new Date()
      });

      await expect(saveIncome(incomeEntries)).resolves.not.toThrow();
    });
  });
}); 