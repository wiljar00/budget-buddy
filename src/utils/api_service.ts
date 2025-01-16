import { IncomeEntry, ExpenseEntry } from './storage';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export async function login(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data;
}

export async function register(email: string, password: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // If we get HTML instead of JSON, it means we hit the wrong endpoint
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
      throw new Error('Server endpoint not found');
    }

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
}

export async function saveIncomeToMongo(entries: IncomeEntry[]) {
  const response = await fetch(`${API_BASE_URL}/income`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(entries),
  });
  return response.json();
}

export async function loadIncomeFromMongo() {
  const response = await fetch(`${API_BASE_URL}/income`, {
    headers: getAuthHeaders(),
  });
  return response.json();
}

export async function saveExpensesToMongo(entries: ExpenseEntry[]) {
  const response = await fetch(`${API_BASE_URL}/expenses`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(entries),
  });
  return response.json();
}

export async function loadExpensesFromMongo() {
  const response = await fetch(`${API_BASE_URL}/expenses`, {
    headers: getAuthHeaders(),
  });
  return response.json();
}

export async function testMongoConnection() {
  const response = await fetch(`${API_BASE_URL}/test-connection`);
  const data = await response.json();
  if (!data.success) {
    throw new Error(`${data.name}: ${data.error}\n${data.stack}`);
  }
  return data.success;
} 