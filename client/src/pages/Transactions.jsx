import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Typography, List, ListItem, ListItemText, Paper,
  Box, TextField, Button, Grid, Divider
} from '@mui/material';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/transaction/get-transactions');
        const sorted = response.data.transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTransactions(sorted);
        setFilteredTransactions(sorted);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };
    fetchTransactions();
  }, []);

  const handleFilter = () => {
    let filtered = transactions;
    if (startDate) {
      filtered = filtered.filter(t => new Date(t.date) >= new Date(startDate));
    }
    if (endDate) {
      filtered = filtered.filter(t => new Date(t.date) <= new Date(endDate));
    }
    setFilteredTransactions(filtered);
  };
  
  const clearFilter = () => {
      setStartDate('');
      setEndDate('');
      setFilteredTransactions(transactions);
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mb: 2 }}>
        All Transactions
      </Typography>

      {/* Filter Section */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="End Date"
              type="date"
              fullWidth
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button variant="contained" onClick={handleFilter} fullWidth>Filter</Button>
          </Grid>
           <Grid item xs={12} sm={2}>
            <Button variant="outlined" onClick={clearFilter} fullWidth>Clear</Button>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Transaction List */}
      <Paper>
        <List>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((t, index) => (
              <React.Fragment key={t._id}>
                <ListItem>
                  <ListItemText
                    primary={t.description}
                    secondary={`Category: ${t.category} | Date: ${new Date(t.date).toLocaleDateString()}`}
                  />
                  <Typography
                    variant="body1"
                    color={t.type === 'income' ? 'green' : 'red'}
                  >
                    {t.type === 'income' ? '+' : '-'} ₹{t.amount.toFixed(2)}
                  </Typography>
                </ListItem>
                {index < filteredTransactions.length - 1 && <Divider />}
              </React.Fragment>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No transactions found." />
            </ListItem>
          )}
        </List>
      </Paper>
    </Container>
  );
}

export default Transactions;