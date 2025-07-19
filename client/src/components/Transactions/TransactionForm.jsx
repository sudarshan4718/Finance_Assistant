import React, { useState } from 'react';
import api from '../../api/api';

const TransactionForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    type: 'income',
    amount: '',
    category: '',
    date: '',
    description: '',
  });

  const handleSubmit = async () => {
    await api.post('/transaction/create-transaction', form);
    onSuccess();
  };

  return (
    <div>
      <select onChange={(e) => setForm({ ...form, type: e.target.value })}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input type="number" placeholder="Amount" onChange={(e) => setForm({ ...form, amount: e.target.value })} />
      <input placeholder="Category" onChange={(e) => setForm({ ...form, category: e.target.value })} />
      <input type="date" onChange={(e) => setForm({ ...form, date: e.target.value })} />
      <input placeholder="Description" onChange={(e) => setForm({ ...form, note: e.target.value })} />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
};

export default TransactionForm;
