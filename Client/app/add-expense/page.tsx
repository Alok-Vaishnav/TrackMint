'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { expenseApi } from '@/app/lib/api';

const CATEGORIES = ['Food', 'Travel', 'Rent', 'Other'];

const categoryEmojis: { [key: string]: string } = {
  Food: '🍔',
  Travel: '🚗',
  Rent: '🏠',
  Other: '📦',
};

export default function AddExpensePage() {
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    note: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);

    try {
      const response = await expenseApi.createExpense({
        amount: parseFloat(formData.amount),
        category: formData.category,
        date: formData.date,
        note: formData.note,
      });

      if (response.error) {
        setError(response.error);
        return;
      }

      // Success - redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError('Failed to create expense');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
              Add New Expense
            </h2>
            <p className="text-slate-600 font-medium">Track your spending to better manage your finances</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl font-semibold">
              ⚠️ {error}
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
                className="w-full px-4 py-3 bg-slate-50 border-2 border-sky-200 rounded-xl text-slate-900 placeholder-slate-400 font-semibold focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition-all"
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
                className="w-full px-4 py-3 bg-slate-50 border-2 border-sky-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition-all"
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
                className="w-full px-4 py-3 bg-slate-50 border-2 border-sky-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition-all"
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
                placeholder="Add a description... (e.g., 'Lunch with team')"
                maxLength={200}
                rows={4}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-sky-200 rounded-xl text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition-all resize-none"
              />
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {formData.note.length}/200 characters
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-sky-500 to-emerald-400 hover:from-sky-600 hover:to-emerald-500 text-white font-bold py-3 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:translate-y-[-2px] shadow-lg shadow-sky-200/50"
              >
                {loading ? '⏳ Adding Expense...' : '✨ Add Expense'}
              </button>
              <Link
                href="/dashboard"
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-full transition-all text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { emoji: '🍔', title: 'Food', hint: 'Meals, groceries, restaurants' },
            { emoji: '🚗', title: 'Travel', hint: 'Fuel, cab, flights, trains' },
            { emoji: '🏠', title: 'Rent', hint: 'Monthly rent or housing costs' },
            { emoji: '📦', title: 'Other', hint: 'Everything else' },
          ].map((cat) => (
            <div key={cat.title} className="bg-white/90 backdrop-blur-xl rounded-xl border border-slate-100 p-4 text-center hover:shadow-md transition-all">
              <p className="text-3xl mb-2">{cat.emoji}</p>
              <p className="font-bold text-slate-900 text-sm">{cat.title}</p>
              <p className="text-xs text-slate-500 mt-1">{cat.hint}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
