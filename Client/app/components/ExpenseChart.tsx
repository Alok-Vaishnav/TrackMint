'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ExpenseChartProps {
  categoryBreakdown: Record<string, number>;
}

// Updated color scheme matching the light theme (Amber, Sky, Emerald)
const COLORS: { [key: string]: string } = {
  Food: '#f59e0b',      // Amber
  Travel: '#0ea5e9',    // Sky
  Rent: '#10b981',      // Emerald
  Other: '#64748b',     // Slate
};

export default function ExpenseChart({ categoryBreakdown }: ExpenseChartProps) {
  const data = Object.entries(categoryBreakdown).map(([name, value]) => ({
    name,
    value: Number(value),
  }));

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-500">
        No expenses to display
      </div>
    );
  }

  const getColor = (category: string) => {
    return COLORS[category] || '#94a3b8';
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value, percent }) => (
            <tspan x="0" dy="0" className="text-xs font-bold fill-slate-900">
              {name}: ₹{value.toFixed(0)} ({(percent * 100).toFixed(0)}%)
            </tspan>
          )}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry.name)} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value) => `₹${Number(value).toFixed(2)}`}
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            color: '#1e293b',
            fontWeight: 'bold',
          }}
        />
        <Legend 
          verticalAlign="bottom" 
          height={36}
          wrapperStyle={{ paddingTop: '20px' }}
          iconType="circle"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
