/**
 * API client for communicating with backend
 * Handles authentication with JWT tokens in cookies
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}

/**
 * Generic fetch wrapper with error handling
 */
async function apiCall<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Include cookies for authentication
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.message || 'An error occurred',
      };
    }

    return { data };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * Authentication APIs
 */
export const authApi = {
  register: async (email: string, password: string) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  login: async (email: string, password: string) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  logout: async () => {
    return apiCall('/auth/logout', {
      method: 'POST',
    });
  },

  getMe: async () => {
    return apiCall<{ user: { id: string; email: string } }>('/auth/me', {
      method: 'GET',
    });
  },
};

/**
 * Expense APIs
 */
export const expenseApi = {
  getExpenses: async (month?: number, year?: number) => {
    let endpoint = '/expenses';
    if (month && year) {
      endpoint += `?month=${month}&year=${year}`;
    }
    return apiCall(endpoint, {
      method: 'GET',
    });
  },

  createExpense: async (expense: {
    amount: number;
    category: string;
    date: string;
    note?: string;
  }) => {
    return apiCall('/expenses', {
      method: 'POST',
      body: JSON.stringify(expense),
    });
  },

  updateExpense: async (
    id: string,
    expense: {
      amount?: number;
      category?: string;
      date?: string;
      note?: string;
    }
  ) => {
    return apiCall(`/expenses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(expense),
    });
  },

  deleteExpense: async (id: string) => {
    return apiCall(`/expenses/${id}`, {
      method: 'DELETE',
    });
  },

  getMonthlySummary: async <T = any>(month?: number, year?: number) => {
    let endpoint = '/expenses/insights/monthly';
    if (month && year) {
      endpoint += `?month=${month}&year=${year}`;
    }
    return apiCall<T>(endpoint, {
      method: 'GET',
    });
  },
};
