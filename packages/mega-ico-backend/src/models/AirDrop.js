const mongoose = require("mongoose");

const AirDropSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  wallet_address: {
    type: String,
    require: true,
  },
  airdrop_status: {
    type: String,
    require: true,
    enum: ["approved", "rejected", "pending"],
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
module.exports = AirDrop = mongoose.model("airdrops", AirDropSchema);
