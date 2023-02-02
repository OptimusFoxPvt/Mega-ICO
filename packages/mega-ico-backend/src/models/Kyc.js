const mongoose = require("mongoose");

const KycSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  first_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  telegram_username: {
    type: String,
  },

  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  zip_code: {
    type: Number,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  address_2: {
    type: String,
  },
  identity: {
    type: Object,
    required: true,
    blackbox: true,
  },
  identity_type: {
    type: String,
    require: true,
  },
  wallet: {
    type: String,
    enum: ["ethereum", "dashcoin", "bitcoin"],
    required: true,
  },
  wallet_address: {
    type: String,
    required: true,
  },

  kyc_status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
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

module.exports = Kyc = mongoose.model("kycs", KycSchema);
