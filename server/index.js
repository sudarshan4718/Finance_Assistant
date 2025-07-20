import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/user.js";
import transactionRouter from "./routes/transaction.js";

const app = express();
const port = process.env.PORT || 6000;

// Middleware to handle CORS and allow credentials
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true, // Allow cookies to be sent
    }
));

connectDB();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies
app.use(cookieParser());

//Routes
app.use('/api/user', userRouter);
app.use('/api/transaction', transactionRouter);

app.listen(port, () => {
  console.log(`Server started at port : ${port}`);
});
