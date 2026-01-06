'use client';

import { expenseApi } from '../lib/api';

interface Expense {
  _id: string;
  amount: number;
  category: string;
  date: string;
  note?: string;
  createdAt: string;
}

interface ExpenseTableProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export default function ExpenseTable({ expenses, onDelete }: ExpenseTableProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getCategoryEmoji = (category: string) => {
    const emojiMap: { [key: string]: string } = {
      Food: '🍔',
      Travel: '🚗',
      Rent: '🏠',
      Other: '📦',
    };
    return emojiMap[category] || '📌';
  };

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      Food: 'bg-amber-100 text-amber-700 border border-amber-200',
      Travel: 'bg-sky-100 text-sky-700 border border-sky-200',
      Rent: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
      Other: 'bg-slate-100 text-slate-700 border border-slate-200',
    };
    return colorMap[category] || 'bg-gray-100 text-gray-700';
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;
    
    try {
      const response = await expenseApi.deleteExpense(id);
      if (response.error) {
        alert('Failed to delete expense: ' + response.error);
        return;
      }
      // Call parent's onDelete to refresh data
      await onDelete(id);
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting expense');
    }
  };

  return (
    <div className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-sky-50 to-emerald-50 border-b border-slate-200">
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Date</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Category</th>
              <th className="px-6 py-4 text-right text-sm font-bold text-slate-700">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Note</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr
                key={expense._id}
                className={`border-b border-slate-100 hover:bg-sky-50/30 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                }`}
              >
                <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                  {formatDate(expense.date)}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(expense.category)}`}>
                    {getCategoryEmoji(expense.category)}
                    {expense.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-right text-slate-900">
                  ₹{expense.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">
                  {expense.note || '—'}
                </td>
                <td className="px-6 py-4 text-sm flex justify-center gap-3">
                  <button
                    onClick={() => handleDelete(expense._id)}
                    className="text-red-600 hover:text-red-700 font-bold transition-colors hover:bg-red-50 px-3 py-1 rounded-lg"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
