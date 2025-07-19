import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input, Box, Typography, Alert, CircularProgress } from '@mui/material';

function ReceiptUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setSuccess('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('receipt', file); // 'receipt' should match your backend's expected field name

    try {
      const response = await axios.post('/api/transaction/scan-receipt', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(response.data.message || 'Receipt uploaded and processed!');
      setFile(null); // Clear file input
       if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (err) {
      setError(`${err.response?.message} Failed to upload receipt.`);
    } finally {
        setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6">Upload Receipt</Typography>
      <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>
        Upload an image or PDF of a receipt to automatically create an expense entry.
      </Typography>
      {error && <Alert severity="error" onClose={() => setError('')} sx={{ my: 1 }}>{error}</Alert>}
      {success && <Alert severity="success" onClose={() => setSuccess('')} sx={{ my: 1 }}>{success}</Alert>}
      
      <Input
        type="file"
        onChange={handleFileChange}
        disableUnderline
        sx={{ mb: 2 }}
        inputProps={{ accept:"image/*,application/pdf" }} // Accept images and PDFs
      />
      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={!file || loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Upload & Scan'}
      </Button>
    </Box>
  );
}

export default ReceiptUpload;