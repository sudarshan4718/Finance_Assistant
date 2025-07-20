import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Typography, List, ListItem, ListItemText, Paper,
  Box, TextField, Button, Grid, Divider
} from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ITEMS_PER_PAGE = 5;

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch transactions on mount
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

  useEffect(() => {
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
    setCurrentPage(1);
  };

  const clearFilter = () => {
    setStartDate('');
    setEndDate('');
    setFilteredTransactions(transactions);
    setCurrentPage(1);
  };

  const deleteTransaction = async (id) => {
    try {
      if (!id) throw new Error("Invalid transaction ID.");
      await axios.delete(`/api/transaction/delete-transaction/${id}`);
      alert("Transaction deleted successfully.");
      fetchTransactions(); // Refresh after deletion
    } catch (error) {
      console.error(error);
      alert("Failed to delete transaction.");
    }
  };

  const handleDownloadPdf = (txns) => {
    if (!txns || txns.length === 0) {
      alert("No transactions to download.");
      return;
    }

    try {
      const doc = new jsPDF();
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(16);
      doc.text('Transaction Report', 20, 20);

      const tableColumn = ["Date", "Description", "Category", "Type", "Amount"];
      const tableRows = txns.map(txn => [
        txn.date ? new Date(txn.date).toLocaleDateString() : 'Invalid Date',
        txn.description ?? 'No Description',
        txn.category ?? 'Uncategorized',
        txn.trans_type?.toUpperCase() ?? 'N/A',
        typeof txn.amount === 'number' ? `₹${txn.amount.toFixed(2)}` : '₹0.00'
      ]);

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 30,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [22, 160, 133] },
      });

      doc.save('transactions_report.pdf');
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Error generating PDF. Check console for details.");
    }
  };

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

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
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="End Date"
              type="date"
              fullWidth
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Button variant="contained" onClick={handleFilter} fullWidth>Filter</Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="outlined" onClick={clearFilter} fullWidth>Clear</Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="outlined" color="primary" onClick={() => handleDownloadPdf(filteredTransactions)} fullWidth>
                  Download PDF
                </Button>
              </Grid>
            </Grid>
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
                  <Box ml={2}>
                    <Button color="error" variant="outlined" onClick={() => deleteTransaction(t._id)}>
                      Delete
                    </Button>
                  </Box>
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
            <Typography>Page {currentPage} of {totalPages}</Typography>
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
