const path = require("path");
const fs = require("fs");
const axios = require("axios");
const config = require("../config/configBasic");
const UserReferral = require("../models/UserReferral");
const stripe = require("stripe")(config.stripe.secret_key);
const Kyc = require("../models/Kyc");
const Tokens = require("./tokens");
const { livePrice } = require("../helpers/getPrice");
const Transaction = require("../models/Transaction");
const { wallet_address, fiatpayment } = require("../helpers/helper");
const AirDrop = require("../models/AirDrop");
const { UserCredential } = require("../models/User");

const whitepaperDownload = async (req, res) => {
  try {
    const root = path.resolve(process.cwd(), "public");
    res.download(root + "/sample.pdf", "sample.pdf");
    // return res
    //   .status(200)

    //   .send({
    //     msg: "White Paper downloaded",
    //     success: true,
    //   });
  } catch (error) {
    return res.status(500).send({
      msg: error.message,
      success: false,
    });
  }
};

const TokenValue = async (req, res) => {
  try {
    const twzPrice = 100;
    const tokens = 200;

    // let api = await axios.get(
    //   `https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,BTC,LTC&tsyms=USD&api_key=${config.API_KEY}`
    // );

    // if (api) {
    let EthPrice = await livePrice("ETH");
    let BtcPrice = await livePrice("BTC");
    let LtcPrice = await livePrice("LTC");
    const priceInETH = (twzPrice * tokens) / EthPrice;
    const priceInBTC = (twzPrice * tokens) / BtcPrice;
    const priceInLTC = (twzPrice * tokens) / LtcPrice;
    const ethToTwz = (priceInETH * EthPrice) / twzPrice / priceInETH;

    return res.status(200).send({
      msg: "Currency Data",
      ethprice: priceInETH,
      btcprice: priceInBTC,
      ltcprice: priceInLTC,
      number_tokens: tokens,
      usdprice: twzPrice,
      ethtotoken: ethToTwz,
      success: true,
    });
    // }
  } catch (error) {
    return res.status(400).send({
      msg: error.message,
      success: false,
    });
  }
};

const getReferralLink = async (req, res) => {
  try {
    const referal_link = await UserReferral.findOne({ user_id: req.user.id });
    console.log(referal_link);
    return res.status(200).send({
      msg: "Referral Link",
      referral: referal_link,
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      msg: error.message,
      success: false,
    });
  }
};

const addwalletaddress = async (req, res) => {
  try {
    const { wallet_address, wallet } = req.body;
    if (wallet_address) {
      const getKyc = await Kyc.findOne({
        user: req.user.id,
        kyc_status: "approved",
      });
      if (getKyc) {
        const updateWallet = await Kyc.findByIdAndUpdate(getKyc.id, {
          wallet_address: wallet_address,
          wallet: wallet,
        });

        if (updateWallet) {
          return res.status(200).send({
            msg: "wallet address updated",
            success: true,
          });
        }
        return res.status(500).send({
          msg: "Wallet address not updated",
          success: false,
        });
      }

      return res.status(500).send({
        msg: "First Kyc should be added or approved by the admin",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).send({
      msg: error.message,
      success: false,
    });
  }
};

const paymentStripe = async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      email: req.body.email,
      description: "My First Test Charge (created for API docs)",
    });
    const { number, exp_month, exp_year, cvc, amount, currency } = req.body;
    const token = await stripe.tokens.create({
      card: {
        number: number,
        exp_month: exp_month,
        exp_year: exp_year,
        cvc: cvc,
      },
    });
    // console.log(token);

    const charge = await stripe.charges.create({
      amount: amount,
      currency: currency,
      // customer: customer.id,
      source: token.id,

      description: "My First Test Charge (created for API docs)",
    });
    console.log("charge.....", charge.amount);
    if (charge) {
      try {
        const charged_amount = charge.amount / 100;
        const fiat_record = await fiatpayment(charge.id, req.user.id);
        console.log("fiat_record", fiat_record.id);
        const walletaddress = await wallet_address(req);
        const responses = await Tokens.sendTokens(
          charged_amount,
          walletaddress,
          req.user.id,
          fiat_record.id
        );

        if (responses) {
          return res.status(200).send({
            msg: "Payment done and tokens are transferred",
            data: responses,
            success: true,
          });
        }
      } catch (error) {
        return res.status(400).send({
          msg: "Ethers transfer not done",
          error: error.message,
          success: false,
        });
      }
    }
    return res.status(400).send({
      msg: "Payment from card is not done",
      success: false,
    });
  } catch (error) {
    return res.status(400).send({
      msg: "Payment not done",
      error: error,
      success: false,
    });
  }
};
const tokensFromBlockchain = async (req, res) => {
  try {
    let body = req.body;
    if (!body.user) {
      body.user = req.user.id;
    }

    let ethPrice = await livePrice("ETH");
    const { eth } = req.body;
    body.value_usd = eth * ethPrice;
    const transaction = new Transaction(body);
    const save_transaction = await transaction.save();
    const previous_transactions = await Transaction.find({ user: body.user });
    if (save_transaction) {
      return res.status(200).send({
        msg: "tokens are transferred and transaction is stored",
        data: save_transaction,
        previous_transactions: previous_transactions,
        success: true,
      });
    }
    return res.status(400).send({
      msg: "Transaction not done",
      success: false,
    });
  } catch (error) {
    return res.status(400).send({
      msg: "Transaction not saved",
      error: error,
      success: false,
    });
  }
};
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });

    if (transactions) {
      return res.status(200).send({
        msg: "All transactions",
        data: transactions,

        success: true,
      });
    }
    return res.status(400).send({
      msg: "No transaction found",

      success: false,
    });
  } catch (error) {
    return res.status(500).send({
      msg: "Transaction not saved",
      error: error,
      success: false,
    });
  }
};
const referralBonus = async (req, res) => {
  try {
    const referby = await UserReferral.findOne(
      { user_id: req.user.id },
      { referred_by: 1 }
    );

    const referred = await UserReferral.findOne(
      {
        referral_id: referby.referred_by,
      },
      { user_id: 1 }
    );

    if (referred) {
      const wallet = await Kyc.findOne(
        { user: referred.user_id, kyc_status: "approved" },
        { wallet: 1, wallet_address: 1, user: 1 }
      );
      if (wallet) {
        return res.status(200).send({
          msg: "wallet address",
          data: wallet,
          success: true,
        });
      }
      return res.status(400).send({
        msg: "Kyc is not approved",
        success: false,
      });
    }
    return res.status(400).send({
      msg: "No Wallet Address found",
      success: false,
    });
  } catch (error) {
    return res.status(500).send({
      msg: "Wallet address not saved",
      error: error,
      success: false,
    });
  }
};
const getWalletAddress = async (req, res) => {
  try {
    const user = await Kyc.findOne({
      user: req.user.id,
      kyc_status: "approved",
    });
    if (user) {
      try {
        const airdrop = await AirDrop.findOne({
          wallet_address: user.wallet_address,
        });
        if (!airdrop) {
          let airdrop_data = new AirDrop({
            user: req.user.id,
            wallet_address: user.wallet_address,
          });
          let save_airdrop = await airdrop_data.save();
          if (save_airdrop) {
            return res.status(200).send({
              msg: "Participated",
              data: user.wallet_address,
              success: true,
            });
          }
        }
        return res.status(400).send({
          msg: "Already participated",
          error: error,
          success: false,
        });
      } catch (error) {
        return res.status(500).send({
          msg: "Already participated",
          error: error,
          success: false,
        });
      }
    }
    return res.status(400).send({
      msg: "KYC is not approved",
      error: error,
      success: false,
    });
  } catch (error) {
    return res.status(500).send({
      msg: "Wallet address not found",
      error: error,
      success: false,
    });
  }
};
const checkFirstTransaction = async (req, res) => {
  try {
    const firsttransaction = await Transaction.findOne({ user: req.user.id });
    if (firsttransaction) {
      return res.status(400).send({
        msg: "Already done the transaction",
        success: false,
      });
    }
    return res.status(200).send({
      msg: "No transaction found",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      msg: "check Transaction problem",
      error: error,
      success: false,
    });
  }
};

module.exports = {
  whitepaperDownload,
  TokenValue,
  getReferralLink,
  addwalletaddress,
  paymentStripe,
  getTransactions,
  tokensFromBlockchain,
  referralBonus,
  getWalletAddress,
  checkFirstTransaction,
};
