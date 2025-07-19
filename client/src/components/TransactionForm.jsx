import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField, Button, Box, Typography, RadioGroup,
  FormControlLabel, Radio, FormControl, FormLabel, Alert
} from '@mui/material';

function TransactionForm({ onTransactionAdded }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [trans_type, setTransType] = useState('EXPENSE'); // Changed from 'type' to 'trans_type'
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // Description is optional, so we don't check for it
    if (!amount || !category || !date || !trans_type) {
      setError('Amount, category, date, and type are required.');
      return;
    }

    try {
      // Construct the payload to match your backend model
      const newTransaction = {
        description,
        amount: parseFloat(amount),
        category,
        date,
        trans_type, // Changed from 'type'
      };
      await axios.post('/api/transaction/create-transaction', newTransaction);

      // Reset form
      setDescription('');
      setAmount('');
      setCategory('');
      setDate(new Date().toISOString().slice(0, 10));
      setTransType('EXPENSE'); // Reset to default value
      setSuccess('Transaction added successfully! 🎉');

      // Notify parent component to refresh data
      if (onTransactionAdded) {
        onTransactionAdded();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add transaction.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6">Add New Transaction</Typography>
      {error && <Alert severity="error" onClose={() => setError('')} sx={{ my: 1 }}>{error}</Alert>}
      {success && <Alert severity="success" onClose={() => setSuccess('')} sx={{ my: 1 }}>{success}</Alert>}
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Type</FormLabel>
        <RadioGroup row value={trans_type} onChange={(e) => setTransType(e.target.value)}>
          {/* Values changed to uppercase "EXPENSE" and "INCOME" */}
          <FormControlLabel value="EXPENSE" control={<Radio />} label="Expense" />
          <FormControlLabel value="INCOME" control={<Radio />} label="Income" />
        </RadioGroup>
      </FormControl>
      <TextField
        label="Description (Optional)"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Amount"
        type="number"
        fullWidth
        required
        margin="normal"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <TextField
        label="Category"
        fullWidth
        required
        margin="normal"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <TextField
        label="Date"
        type="date"
        fullWidth
        required
        margin="normal"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Add Transaction
      </Button>
    </Box>
  );
}

export default TransactionForm;