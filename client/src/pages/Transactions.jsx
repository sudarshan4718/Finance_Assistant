import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Typography, List, ListItem, ListItemText, Paper,
  Box, TextField, Button, Grid, Divider
} from '@mui/material';

const ITEMS_PER_PAGE = 5;

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

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
    setCurrentPage(1); // reset to first page after filtering
  };

  const clearFilter = () => {
    setStartDate('');
    setEndDate('');
    setFilteredTransactions(transactions);
    setCurrentPage(1); // reset to first page
  };

  // Pagination Logic : In this, we calculate total pages and slice the transaction for the current page
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  // move to next page logic
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };
   // move to previous page logic
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

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
          {paginatedTransactions.length > 0 ? (
            paginatedTransactions.map((t, index) => (
              <React.Fragment key={t._id}>
                <ListItem>
                  <ListItemText
                    primary={t.description}
                    secondary={`Category: ${t.category} | Date: ${new Date(t.date).toLocaleDateString()}`}
                  />
                  <Typography
                    variant="body1"
                    color={t.trans_type === 'INCOME' ? 'green' : 'red'}
                  >
                    {t.trans_type === 'INCOME' ? '+' : '-'} ₹{t.amount.toFixed(2)}
                  </Typography>
                </ListItem>
                {index < paginatedTransactions.length - 1 && <Divider />}
              </React.Fragment>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No transactions found." />
            </ListItem>
          )}
        </List>

        {/* Pagination Controls */}
        {filteredTransactions.length > ITEMS_PER_PAGE && (
          <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
            <Button variant="outlined" onClick={handlePrev} disabled={currentPage === 1}>
              Previous
            </Button>
            <Typography>
              Page {currentPage} of {totalPages}
            </Typography>
            <Button variant="outlined" onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default Transactions;
