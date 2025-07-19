import React, { useEffect, useState } from 'react';
import api from '../../api/api';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await api.get('/transaction/get-transactions'); // adjust route
    setTransactions(res.data);
  };

  return (
    <div>
      <h3>All Transactions</h3>
      <ul>
        {transactions.map((tx) => (
          <li key={tx._id}>{tx.type} - ₹{tx.amount} on {tx.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
