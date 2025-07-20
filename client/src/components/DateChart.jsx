import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid
} from 'recharts';
import { Typography, Paper } from '@mui/material';

const DateChart = ({ data }) => {
  // Filter only EXPENSE transactions and sort by date
  const expenseData = data
    .filter(item => item.trans_type === 'EXPENSE')
    .map(item => ({
      ...item,
      date: new Date(item.date),
    }))
    .sort((a, b) => a.date - b.date);

  // Format data for bar chart
  const chartData = expenseData.map(item => ({
    x: item.date.toISOString().split('T')[0], // 'YYYY-MM-DD'
    y: item.amount,
  }));

  return (
    <Paper elevation={4} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        🧾 Expense Bar Chart by Date
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="y" fill="#f44336" name="Expense" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default DateChart;
