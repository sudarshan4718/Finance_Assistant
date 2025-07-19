import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/user.js";
import transactionRouter from "./routes/transaction.js";

const app = express();
const port = process.env.PORT || 6000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/transaction', transactionRouter);

app.listen(port, () => {
  console.log(`Server started at port : ${port}`);
});
