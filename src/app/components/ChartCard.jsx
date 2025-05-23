// components/ChartCard.jsx
'use client';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#3366FF', '#FFA500', '#00C49F', '#00BFFF']; // Blue, Orange, Green, Cyan

export default function ChartCard({ data }) {
  const chartData = [
    { name: 'Total Products', value: data.totalProducts },
    { name: 'Low Stock', value: data.lowStock },
    { name: 'Out of Stock', value: data.outOfStock },
    { name: 'Total Categories', value: data.totalCategory },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-[20px] font-semibold text-blue-900 mb-4 text-center">Stock Distribution</h2>
      <PieChart width={680} height={300}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
} 