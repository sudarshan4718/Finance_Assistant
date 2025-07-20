import transactionModel from "../models/transaction.js"; 
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// create transaction logic
export const createTransaction = async (req, res) => {
    try {
        const { trans_type, amount, category, description, date } = req.body;

        if (!trans_type || !amount || !category || !date) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the required details',
            });
        }

        const newTransaction = new transactionModel({
            userId: req.userId, 
            trans_type,
            amount,
            category,
            description,
            date,
        });

        await newTransaction.save();

        return res.status(201).json({
            success: true,
            message: "Transaction created successfully",
            transaction: newTransaction,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Extract transactions for the user
export const getTransactions = async (req, res) => {
    try {
        const userId = req.userId; // set by auth middlewar

        const transactions = await transactionModel
            .find({ userId })
            .sort({ date: -1 }); // newest first

        return res.status(200).json({
            success: true,
            transactions,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Scan receipt and create transaction
export const scanReceipt = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        // Convert to base64
        const base64Data = file.buffer.toString("base64");

        // Gemini request
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
        Analyze this receipt image or pdf and extract the following information in JSON format:
      - Total amount (just the number)
      - Date (in ISO format)
      - Description or items purchased (brief summary)
      - Merchant/store name
      - Suggested category (one of: housing,transportation,groceries,utilities,entertainment,food,shopping,healthcare,education,personal,travel,insurance,gifts,bills,other-expense )
      
      Only respond with valid JSON in this exact format:
      {
        "amount": number,
        "date": "ISO date string",
        "description": "string",
        "merchantName": "string"
        "category": "string"
      }

      If its not a recipt, return an empty object
        `; 
        const result = await model.generateContent([
            {
                inlineData: {
                    mimeType: file.mimetype,
                    data: base64Data,
                },
            },
            {
                text: prompt,
            },
        ]);

        const responseText = await result.response.text();

        const jsonStart = responseText.indexOf("{");
        const jsonEnd = responseText.lastIndexOf("}");
        const jsonText = responseText.slice(jsonStart, jsonEnd + 1);
        const receiptData = JSON.parse(jsonText);

        // Save to transactions
        const transaction = new transactionModel({
            userId: req.userId,
            trans_type: "EXPENSE",
            amount: receiptData.amount,
            category: receiptData.category || "General",
            description: `Receipt from ${receiptData.merchantName}, items: ${receiptData.items?.join(", ")}`,
            date: receiptData.date,
        });

        await transaction.save();

        return res.status(201).json({
            success: true,
            message: "Receipt scanned and transaction saved",
            transaction,
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Please upload valid file type (jpg or pdf)" });
    }
};

// Delete transaction by ID
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params; // FIXED

    if (!id) {
      return res.status(400).json({ success: false, message: "Transaction ID is required" });
    }

    const transaction = await transactionModel.findByIdAndDelete(id);

    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    return res.status(200).json({ success: true, message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};









