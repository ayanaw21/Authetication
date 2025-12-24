import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['deposit', 'withdrawal'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    balanceAfter: {
        type: Number, // Stores the snapshot of the balance after this transaction
        required: true
    }
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;