const mongoose = require("mongoose");

const BountySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  bounty_type: {
    type: String,
    enum: ["facebook", "twitter"],
    default: "twitter",
    require: true,
  },
  bounty_link: {
    type: String,
    require: true,
    unique: true,
  },
  wallet_address: {
    type: String,
    require: true,
  },
  bounty_status: {
    type: String,
    require: true,
    enum: ["approved", "rejected", "pending"],
    default: "pending",
  },
  bounty_ss: {
    type: Object,
    require: true,
    blackbox: true,
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

module.exports = Bounty = mongoose.model("bounties", BountySchema);
