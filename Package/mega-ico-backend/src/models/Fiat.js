const mongoose = require("mongoose");

const FiatSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  fiat_id: {
    type: String,
    required: true,
    unique: true,
  },
  tokens_transfer: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
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

module.exports = Fiat = mongoose.model("fiats", FiatSchema);
