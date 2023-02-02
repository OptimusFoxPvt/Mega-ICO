const mongoose = require("mongoose");

const ContractSchema = new mongoose.Schema({
  contract_address: {
    type: String,
    require: true,
  },
  abijson: {
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

module.exports = Contract = mongoose.model("contracts", ContractSchema);
