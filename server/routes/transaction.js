import express from 'express';
import { userMiddleware } from '../middleware/user.js';
import { createTransaction, getTransactions, scanReceipt } from '../controller/transaction.js';
import { upload } from '../middleware/multer.js';

const transactionRouter = express.Router();

transactionRouter.post('/create-transaction', userMiddleware, createTransaction);
transactionRouter.get('/get-transactions', userMiddleware,getTransactions);
transactionRouter.post('/scan-receipt', userMiddleware, upload.single('file'),scanReceipt);

export default transactionRouter;