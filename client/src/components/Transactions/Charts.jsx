import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Charts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get('/transaction/get-transactions').then((res) => {
      const expenses = res.data.filter(t => t.type === 'expense');
      const categories = {};
      expenses.forEach(e => {
        categories[e.category] = (categories[e.category] || 0) + e.amount;
      });

      setData({
        labels: Object.keys(categories),
        datasets: [
          {
            label: 'Expenses by Category',
            data: Object.values(categories),
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
          },
        ],
      });
    });
  }, []);

  return (
    <div>
      <h3>Expenses by Category</h3>
      {data.labels ? <Pie data={data} /> : <p>Loading...</p>}
    </div>
  );
};

export default Charts;
