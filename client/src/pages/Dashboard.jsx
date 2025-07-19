import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Paper, Typography } from '@mui/material';
import CategoryChart from '../components/CategoryChart';
import TransactionForm from '../components/TransactionForm';
import ReceiptUpload from '../components/ReceiptUpload';
import DateChart from '../components/DateChart';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Function to be called by child components to trigger a refresh
  const handleDataUpdate = () => {
    setRefresh(prev => !prev);
  };
  
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/transaction/get-transactions');
        setTransactions(response.data.transactions || []);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };
    fetchTransactions();
  }, [refresh]); // Rerun effect when refresh state changes

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400,width: 500 }}>
            <CategoryChart data={transactions} />
          </Paper>
        </Grid>
         <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
            <DateChart data={transactions} />
          </Paper>
        </Grid>
        {/* Add Transaction Form */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2 }}>
            <TransactionForm onTransactionAdded={handleDataUpdate} />
          </Paper>
        </Grid>
        {/* Receipt Upload */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <ReceiptUpload onUploadSuccess={handleDataUpdate} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;