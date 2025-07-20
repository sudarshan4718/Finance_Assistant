import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography } from '@mui/material';

// Function to generate random colors for chart segments
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1962'];

const CategoryChart = ({ data }) => {
  // Filter for expenses and aggregate by category
  const expenseData = data
    .filter(item => item.trans_type === 'EXPENSE')
    .reduce((acc, current) => {
      const category = current.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += current.amount;
      return acc;
    }, {});

  const chartData = Object.keys(expenseData).map(key => ({
    name: key,
    value: expenseData[key],
  }));
  
  // If no data, return a message
  if (chartData.length === 0) {
    return <Typography>No expense data available to display chart.</Typography>;
  }

  return (
    <>
      <Typography variant="h6" align="center">Expenses by Category</Typography>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default CategoryChart;