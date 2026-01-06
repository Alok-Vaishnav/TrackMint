'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { expenseApi } from '@/app/lib/api';

const CATEGORIES = ['Food', 'Travel', 'Rent', 'Other'];

const categoryEmojis: { [key: string]: string } = {
  Food: '🍔',
  Travel: '🚗',
  Rent: '🏠',
  Other: '📦',
};

interface ExpenseData {
  _id: string;
  amount: number;
  category: string;
  date: string;
  note?: string;
}

export default function EditExpensePage() {
  const router = useRouter();
  const params = useParams();
  const expenseId = params.id as string;

  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    note: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch expense data on mount
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        // Get all expenses and find the one with matching ID
        const response = await expenseApi.getExpenses();
        if (response.error) {
          setError('Failed to load expense');
          return;
        }

        const expenses = response.data?.expenses || [];
        const expense = expenses.find((e: ExpenseData) => e._id === expenseId);

        if (!expense) {
          setError('Expense not found');
          setLoading(false);
          return;
        }

        // Pre-fill form with expense data
        setFormData({
          amount: expense.amount.toString(),
          category: expense.category,
          date: new Date(expense.date).toISOString().split('T')[0],
          note: expense.note || '',
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to load expense');
        console.error(err);
        setLoading(false);
      }
    };

    fetchExpense();
  }, [expenseId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validate
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);

    try {
      const response = await expenseApi.updateExpense(expenseId, {
        amount: parseFloat(formData.amount),
        category: formData.category,
        date: formData.date,
        note: formData.note,
      });

      if (response.error) {
        setError(response.error);
        setLoading(false);
        return;
      }

      // Success - show message and redirect
      setSuccessMessage('Expense updated successfully! Redirecting...');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (err) {
      setError('Failed to update expense');
      console.error(err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-2xl font-black bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            Loading expense...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-xl">💰</span>
            </div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-sky-700 to-emerald-500 bg-clip-text text-transparent">
              Expense Tracker
            </h1>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 text-slate-700 font-semibold hover:bg-slate-100 rounded-lg transition-colors"
          >
            ← Back
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-100 shadow-sm p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-4xl font-black bg-gradient-to-r from-sky-700 to-emerald-600 bg-clip-text text-transparent mb-2">
              Edit Expense
            </h2>
            <p className="text-slate-600 font-medium">Update your expense details</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl font-semibold">
              ⚠️ {error}
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 text-green-700 rounded-xl font-semibold">
              ✅ {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount */}
            <div>
              <label htmlFor="amount" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                💵 Amount (₹)
              </label>
              <input
                id="amount"
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-sky-200 rounded-xl text-slate-900 placeholder-slate-400 font-semibold focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition-all disabled:opacity-50"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                🏷️ Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-sky-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition-all disabled:opacity-50"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {categoryEmojis[cat]} {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                📅 Date
              </label>
              <input
                id="date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-sky-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition-all disabled:opacity-50"
              />
            </div>

            {/* Note */}
            <div>
              <label htmlFor="note" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                📝 Note (Optional)
              </label>
              <textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Add any notes about this expense..."
                rows={4}
                maxLength={200}
                disabled={loading}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-sky-200 rounded-xl text-slate-900 placeholder-slate-400 font-semibold focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition-all resize-none disabled:opacity-50"
              />
              <p className="text-xs text-slate-500 mt-1">{formData.note.length}/200</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-sky-500 to-emerald-400 hover:from-sky-600 hover:to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-sky-200/80 hover:shadow-emerald-200/80 transition-all duration-300 hover:translate-y-[-1px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : '✏️ Update Expense'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
