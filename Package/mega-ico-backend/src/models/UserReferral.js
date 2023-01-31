const mongoose = require("mongoose");

const UserReferralSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  referred_by: {
    type: String,
  },
  referral_percentage: {
    type: String,
  },
  referral_id: {
    type: String,
    required: true,
    unique: true,
  },
  referral_link: {
    type: String,
    required: true,
    unique: true,
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

module.exports = UserReferrel = mongoose.model(
  "user_referral",
  UserReferralSchema
);
