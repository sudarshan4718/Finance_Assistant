import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", // Reference to the User model
        required: true,
    },
    trans_type: {
        type: String,
        enum: ["EXPENSE", "INCOME"],
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

const transactionModel = mongoose.model('transactions', transactionSchema);

export default transactionModel;