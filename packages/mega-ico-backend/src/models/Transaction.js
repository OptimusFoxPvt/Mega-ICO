const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  tokens: {
    type: Number,
    required: true,
  },
  eth: {
    type: Number,
    required: true,
  },
  transaction_hash: {
    type: String,
    required: true,
  },
  transaction_id: {
    type: String,
    required: true,
  },
  transaction_time: {
    type: Date,
    required: true,
  },
  transaction_type: {
    type: String,
    enum: ["purchase", "bonus"],
    default: "purchase",
  },
  value_usd: {
    type: Number,
    required: true,
  },
  wallet_from: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Transaction = mongoose.model(
  "Transactions",
  TransactionSchema
);
