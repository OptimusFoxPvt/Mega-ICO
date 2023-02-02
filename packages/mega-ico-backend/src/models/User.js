const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact_no: {
    type: Number,
    // required: true,
  },
  dob: {
    type: Date,
  },
  nationality: {
    type: String,
    // required: true,
  },
  // city: {
  //   type: String,
  //   // required: true,
  // },
  address: {
    type: String,
    // required: true,
  },
  is_number_verified: {
    type: Boolean,
    default: false,
  },
  is_number_verification_on: {
    type: Boolean,
    default: false,
  },
  is_email_verified: {
    type: Boolean,
    default: true,
  },
  is_email_verification_on: {
    type: Boolean,
    default: false,
  },
  is_google_authentication_on: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  is_blocked: {
    type: Boolean,
    default: false,
  },
  last_login: {
    type: Date,
    default: Date.now,
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

const UserCredentialsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  sms_and_email_auth_token: {
    type: String,
    // default: "sms_and_email_auth_token",
  },
  password_reset_token: {
    type: String,
    // default: "password_reset_token",
  },
  tfa_token: {
    type: String,
  },
  tfa_qrcode_url: {
    type: String,
  },
  auth_token: {
    type: String,
    // default: "auth_token",
  },
  password: {
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

let User = mongoose.model('user', UserSchema);
let UserCredential = mongoose.model('user_credential', UserCredentialsSchema);
module.exports = { User, UserCredential };
