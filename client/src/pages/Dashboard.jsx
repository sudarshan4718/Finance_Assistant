import React, { useState } from 'react';
import TransactionForm from '../components/Transactions/TransactionForm';
import TransactionList from '../components/Transactions/TransactionList';
import Charts from '../components/Transactions/Charts';
import ReceiptUploader from '../components/Transactions/ReceiptUploader';

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📊 Dashboard</h2>
      <TransactionForm onSuccess={triggerRefresh} />
      <hr />
      <ReceiptUploader onSuccess={triggerRefresh} />
      <hr />
      <TransactionList key={refresh} />
      <hr />
      <Charts />
    </div>
  );
};

export default Dashboard;
