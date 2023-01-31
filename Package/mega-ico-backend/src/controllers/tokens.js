const config = require("../config/configBasic");
const web3 = require("web3");
const { livePrice } = require("../helpers/getPrice");
const { connection } = require("./web3");
const Kyc = require("../models/Kyc");
const Transaction = require("../models/Transaction");
const { updatefiatstatus } = require("../helpers/helper");

const sendTokens = async (
  transaction_amount,
  wallet_address,
  id,
  fiat_record
) => {
  const _rate = 0.0000001;
  try {
    let Eth_price = await livePrice("ETH");
    var ether = transaction_amount / Eth_price;
    var ethers = transaction_amount / Eth_price;
    ether = web3.utils.toWei(`${ether}`);
    const rate = ether * _rate;
    const amount_of_tokens = web3.utils.toWei(`${rate}`, "ether");
    const token_transfer = await connection(wallet_address, amount_of_tokens);
    if (token_transfer) {
      const transaction = {
        user: id,
        transaction_hash: token_transfer.transactionHash,
        transaction_id: token_transfer.events.Transfer.id,
        transaction_time: Date.now(),
        eth: ethers,
        value_usd: transaction_amount,
        wallet_from: wallet_address,
        tokens: amount_of_tokens,
      };
      const save_transaction = new Transaction(transaction);
      const response_transaction = await save_transaction.save();
      console.log(response_transaction);
      if (response_transaction) {
        await updatefiatstatus(fiat_record);
        return true;
      }
    }
  } catch (error) {
    return res.status(400).send({
      msg: "No Tokens can be displayed",
      error: error,
      success: false,
    });
  }
};



module.exports = { sendTokens };
