import express from 'express';
import { userMiddleware } from '../middleware/user.js';
import { createTransaction, deleteTransaction, getTransactions, scanReceipt } from '../controller/transaction.js';
import { upload } from '../middleware/multer.js';

const transactionRouter = express.Router();

transactionRouter.post('/create-transaction', userMiddleware, createTransaction);
transactionRouter.get('/get-transactions', userMiddleware,getTransactions);
transactionRouter.post('/scan-receipt', userMiddleware, upload.single('receipt'),scanReceipt);
transactionRouter.delete('/delete-transaction/:id', userMiddleware, deleteTransaction);

export default transactionRouter;