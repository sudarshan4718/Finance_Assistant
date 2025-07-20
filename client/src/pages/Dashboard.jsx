import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import CategoryChart from '../components/CategoryChart';
import TransactionForm from '../components/TransactionForm';
import ReceiptUpload from '../components/ReceiptUpload';
import DateChart from '../components/DateChart';
import SummaryBox from '../components/SummaryBox';

// Dashboard component to display the main dashboard with charts and forms
function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handleDataUpdate = () => {
    setRefresh(prev => !prev);
  };
  // Fetch transactions when the component mounts or refresh changes
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/transaction/get-transactions');
        // Default to an empty array to prevent errors if the response is unexpected
        setTransactions(response.data.transactions || []);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
        setTransactions([]); // Set to empty array on error
      }
    };
    fetchTransactions();
  }, [refresh]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Category chart*/}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row', gap: 2, minHeight: 450, width:500 }}>
            <Box flex={1}>
              <CategoryChart data={transactions} />
            </Box>
           
          </Paper>
          
        </Grid>
        {/* Summary Box for monthly income and expenses */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row', gap: 2, minHeight: 300, width:500 }}>
            <Box flex={1}>
             <SummaryBox transactions={transactions} />
            </Box>
           
          </Paper>
          
        </Grid>


        {/* Date Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: 400, width:500 }}>
            <DateChart data={transactions} />
          </Paper>
        </Grid>

        
        {/* Transaction & Receipt Forms Column */}
        <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom></Typography>
                <TransactionForm onTransactionAdded={handleDataUpdate} />
            </Paper>
            <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom></Typography>
                <ReceiptUpload onUploadSuccess={handleDataUpdate} />
            </Paper>
        </Grid>

      </Grid>
    </Container>
  );
}

export default Dashboard;