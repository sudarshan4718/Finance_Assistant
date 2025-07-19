import React, { useState } from 'react';
import api from '../../api/api';

const ReceiptUploader = ({ onSuccess }) => {
  const [file, setFile] = useState(null);

  const uploadReceipt = async () => {
    const formData = new FormData();
    formData.append('receipt', file);

    await api.post('/transaction/scan-receipt', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    onSuccess();
  };

  return (
    <div>
      <input type="file" accept="image/*,.pdf" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadReceipt}>Upload Receipt</button>
    </div>
  );
};

export default ReceiptUploader;
