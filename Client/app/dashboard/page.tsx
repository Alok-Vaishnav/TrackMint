'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { expenseApi, authApi } from '@/app/lib/api';
import ExpenseChart from '@/app/components/ExpenseChart';
import ExpenseTable from '@/app/components/ExpenseTable';

interface Expense {
  _id: string;
  amount: number;
  category: string;
  date: string;
  note?: string;
  createdAt: string;
}

interface UserInfo {
  id: string;
  email: string;
}

interface MonthlySummaryResponse {
  selectedMonth: {
    month: number;
    year: number;
    total: number;
    categoryBreakdown: Record<string, number>;
    expenses: Expense[];
  };
  previousMonth: {
    total: number;
    categoryBreakdown: Record<string, number>;
  };
  highestSpendingCategory: {
    category: string;
    amount: number;
  } | null;
  monthComparisons: Array<{
    category: string;
    message: string;
    difference: number;
    type: 'increase' | 'decrease';
  }>;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [monthlySummary, setMonthlySummary] = useState<MonthlySummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get list of available years (2 years back to 1 year forward)
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from({ length: 4 }, (_, i) =>
    currentYear - 2 + i
  );

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Fetch data function
  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      // Check authentication
      const userResponse = await authApi.getMe();
      if (userResponse.error) {
        router.push('/login');
        return;
      }
      setUser(userResponse.data?.user ?? null);

      // Fetch monthly summary with selected month/year
      const summaryRes = await expenseApi.getMonthlySummary<MonthlySummaryResponse>(
        selectedMonth,
        selectedYear
      );

      if (summaryRes.error) {
        setError(summaryRes.error);
        setMonthlySummary(null);
      } else if (summaryRes.data) {
        setMonthlySummary(summaryRes.data);
      }
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when month or year changes
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth, selectedYear]);

  // Handle delete and refresh
  const handleDeleteExpense = async (id: string) => {
    await fetchData();
  };

  const handleLogout = async () => {
    await authApi.logout();
    router.push('/login');
  };

  if (loading && !monthlySummary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50 flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-amber-300/20 to-sky-300/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-sky-300/20 to-emerald-300/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        <div className="text-center relative z-10">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-b-emerald-500 rounded-full animate-spin animation-delay-200"></div>
          </div>
          <p className="text-2xl font-black bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            Loading your expenses...
          </p>
          <p className="text-slate-500 font-semibold">Just a moment ✨</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50 relative overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-amber-200/30 to-sky-200/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-sky-200/30 to-emerald-200/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-gradient-to-br from-emerald-200/30 to-amber-200/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-slate-200 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/20 via-sky-100/20 to-emerald-100/20"></div>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-sky-400 via-purple-400 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform duration-300">
              <span className="text-white font-black text-2xl">💰</span>
            </div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-sky-700 via-purple-600 to-emerald-500 bg-clip-text text-transparent">
              Expense Tracker
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-50 rounded-full border border-slate-200">
              <span className="text-xl">👤</span>
              <span className="text-slate-700 font-bold text-sm">{user?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="group relative px-6 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-2">
                <span>🚪</span>
                Logout
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl font-medium">
            {error}
          </div>
        )}

        {/* Month & Year Selector */}
        <div className="mb-8 relative">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            <div className="flex gap-4 flex-wrap flex-1">
              {/* Month Selector */}
              <div className="flex-1 min-w-[200px]">
                <label className="flex items-center gap-2 text-sm font-black text-slate-700 mb-3 uppercase tracking-wide">
                  <span className="text-2xl">📅</span>
                  Select Month
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="w-full px-5 py-3 bg-gradient-to-r from-white to-sky-50 border-2 border-sky-300 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-200 transition-all hover:shadow-lg cursor-pointer"
                >
                {monthNames.map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

              {/* Year Selector */}
              <div className="flex-1 min-w-[150px]">
                <label className="flex items-center gap-2 text-sm font-black text-slate-700 mb-3 uppercase tracking-wide">
                  <span className="text-2xl">🗓️</span>
                  Select Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="w-full px-5 py-3 bg-gradient-to-r from-white to-emerald-50 border-2 border-emerald-300 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 transition-all hover:shadow-lg cursor-pointer"
                >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

            {/* Add Expense Button */}
            <div className="flex items-end">
              <Link
                href="/add-expense"
                className="group relative px-8 py-4 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white font-black rounded-2xl shadow-lg shadow-purple-300/50 hover:shadow-2xl hover:shadow-purple-400/50 transition-all duration-300 hover:scale-110 hover:rotate-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-xl">✨</span>
                  Add Expense
                </span>
              </Link>
            </div>
          </div>
        </div>

        {monthlySummary && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Total Expenses Card */}
              <div className="group relative bg-white/90 backdrop-blur-xl rounded-2xl border border-amber-200 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 p-6 overflow-hidden hover:border-amber-300">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center justify-between mb-3">
                  <h3 className="text-xs font-black text-amber-700 uppercase tracking-widest">
                    Total Spending
                  </h3>
                  <span className="text-4xl transform group-hover:scale-110 transition-transform duration-300">💰</span>
                </div>
                <div className="relative z-10">
                  <p className="text-5xl font-black bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">
                    ₹{monthlySummary.selectedMonth.total.toFixed(2)}
                  </p>
                  <p className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                    {monthNames[selectedMonth - 1]} {selectedYear}
                  </p>
                </div>
              </div>

              {/* Month Comparison Card */}
              <div className="group relative bg-white/90 backdrop-blur-xl rounded-2xl border border-sky-200 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 p-6 overflow-hidden hover:border-sky-300">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center justify-between mb-3">
                  <h3 className="text-xs font-black text-sky-700 uppercase tracking-widest">
                    vs Last Month
                  </h3>
                  <span className="text-4xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    {monthlySummary.selectedMonth.total > monthlySummary.previousMonth.total ? '📈' : '📉'}
                  </span>
                </div>
                <div className="relative z-10">
                  <p className="text-5xl font-black bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">
                    ₹{Math.abs(
                      monthlySummary.selectedMonth.total -
                        monthlySummary.previousMonth.total
                    ).toFixed(2)}
                  </p>
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
                      monthlySummary.selectedMonth.total >
                      monthlySummary.previousMonth.total
                        ? 'bg-red-100 text-red-700 border border-red-300'
                        : 'bg-green-100 text-green-700 border border-green-300'
                    }`}
                  >
                    <span
                      className={`inline-block w-2 h-2 rounded-full animate-pulse ${
                        monthlySummary.selectedMonth.total > monthlySummary.previousMonth.total
                          ? 'bg-red-500'
                          : 'bg-green-500'
                      }`}
                    ></span>
                    {monthlySummary.selectedMonth.total >
                    monthlySummary.previousMonth.total
                      ? 'Higher spending'
                      : 'Lower spending'}
                  </div>
                </div>
              </div>

              {/* Highest Category Card */}
              <div className="group relative bg-white/90 backdrop-blur-xl rounded-2xl border border-emerald-200 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 p-6 overflow-hidden hover:border-emerald-300">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center justify-between mb-3">
                  <h3 className="text-xs font-black text-emerald-700 uppercase tracking-widest">
                    Top Category
                  </h3>
                  <span className="text-4xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">🏆</span>
                </div>
                <div className="relative z-10">
                  {monthlySummary.highestSpendingCategory ? (
                    <>
                      <p className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">
                        {monthlySummary.highestSpendingCategory.category}
                      </p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 border border-emerald-300 rounded-full">
                        <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span className="text-sm font-bold text-emerald-700">
                          ₹{monthlySummary.highestSpendingCategory.amount.toFixed(2)}
                        </span>
                      </div>
                    </>
                  ) : (
                    <p className="text-slate-500 italic">No expenses yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* Insights Section */}
            {monthlySummary.monthComparisons.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl animate-bounce">💡</span>
                  <h2 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Monthly Insights
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {monthlySummary.monthComparisons.map((insight, idx) => (
                    <div
                      key={idx}
                      className={`group relative p-5 rounded-2xl border-2 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${
                        insight.type === 'increase'
                          ? 'bg-gradient-to-br from-red-50 to-pink-50 border-red-300 hover:border-red-400'
                          : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 hover:border-green-400'
                      }`}
                    >
                      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 ${
                        insight.type === 'increase' ? 'bg-red-400' : 'bg-green-400'
                      }`}></div>
                      <div className="relative z-10 flex items-start gap-3">
                        <span className="text-3xl transform group-hover:scale-125 transition-transform duration-300">
                          {insight.type === 'increase' ? '📈' : '📉'}
                        </span>
                        <p
                          className={`font-bold text-base leading-relaxed ${
                            insight.type === 'increase'
                              ? 'text-red-800'
                              : 'text-green-800'
                          }`}
                        >
                          {insight.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chart and Table */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Chart */}
              <div className="lg:col-span-1 bg-white/90 backdrop-blur-xl rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-2xl transition-all duration-300 p-6 hover:border-purple-300">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">📊</span>
                  <h2 className="text-xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Category Breakdown
                  </h2>
                </div>
                {Object.keys(monthlySummary.selectedMonth.categoryBreakdown)
                  .length > 0 ? (
                  <ExpenseChart
                    categoryBreakdown={
                      monthlySummary.selectedMonth.categoryBreakdown
                    }
                  />
                ) : (
                  <div className="h-64 flex items-center justify-center text-slate-500">
                    No expenses to display
                  </div>
                )}
              </div>

              {/* Expense Table */}
              <div className="lg:col-span-2 bg-white/90 backdrop-blur-xl rounded-2xl border-2 border-indigo-200 shadow-lg hover:shadow-2xl transition-all duration-300 p-6 hover:border-indigo-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">📝</span>
                    <h2 className="text-xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Expenses ({monthlySummary.selectedMonth.expenses.length})
                    </h2>
                  </div>
                </div>
                {monthlySummary.selectedMonth.expenses.length > 0 ? (
                  <ExpenseTable
                    expenses={monthlySummary.selectedMonth.expenses}
                    onDelete={handleDeleteExpense}
                  />
                ) : (
                  <div className="py-8 text-center text-slate-500">
                    <p className="mb-4">No expenses for this month</p>
                    <Link
                      href="/add-expense"
                      className="inline-block px-6 py-2 bg-gradient-to-r from-sky-500 to-emerald-400 text-white font-bold rounded-full hover:shadow-lg transition-all"
                    >
                      Add your first expense
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
