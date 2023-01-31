const { User } = require("../models/User");
// const axios = require("axios");
const mongoose = require("mongoose");
const config = require("../config/configBasic");
const Kyc = require("../models/Kyc");
const { livePrice } = require("../helpers/getPrice");
const Transaction = require("../models/Transaction");
const { mappinghelper } = require("../helpers/helper");
const Contract = require("../models/Contract");

const listOfRecentUser = async (req, res) => {
  try {
    const recent_user = await User.find().limit(5).sort({ created_at: -1 });
    //   find({
    //   created_at: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    // });

    if (recent_user) {
      return res.status(200).send({
        msg: "Recent Users",
        data: recent_user,
        success: true,
      });
    }
  } catch (error) {
    res.status(500).send({
      msg: error.message,
      success: false,
    });
  }
};

const currencyConversion = async (req, res) => {
  try {
    const twzPrice = 100;
    const twzBalance = 120000;
  

    // if (api) {
    let EthPrice = await livePrice("ETH");
    let BtcPrice = await livePrice("BTC");
    let LtcPrice = await livePrice("LTC");
    const priceInETH = (twzBalance * twzPrice) / EthPrice;
    const priceInBTC = (twzBalance * twzPrice) / BtcPrice;
    const priceInLTC = (twzBalance * twzPrice) / LtcPrice;
    const ethToTwz = (priceInETH * EthPrice) / twzPrice / priceInETH;

    return res.status(200).send({
      msg: "Currency Data",
      ethprice: priceInETH,
      btcprice: priceInBTC,
      ltcprice: priceInLTC,
      number_tokens: twzBalance,
      priceeth: EthPrice,
      pricebtc: BtcPrice,
      ethtotoken: ethToTwz,
      success: true,
    });
    // }
  } catch (error) {
    res.status(500).send({
      msg: error.message,
      success: false,
    });
  }
};

const getUserWithKyc = async (req, res) => {
  try {
    const users = await User.find();
    const kyc = await Kyc.find();
    return res.status(200).send({
      msg: "Users with Kyc",
      User_data: users,
      Kyc_data: kyc,
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      success: false,
    });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    var allTransaction = await Transaction.find();
    const result = await mappinghelper(allTransaction);
    console.log("result", result);

    if (result) {
      return res.status(200).send({
        msg: "All transactions",
        allTransaction: result,
        success: true,
      });
    }
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      success: false,
    });
  }
};

const abijson = async (req, res) => {
  try {
    const { abijson, contract_address } = req.body;
    const haveContract = await Contract.find();
    console.log(haveContract.length);
    if (haveContract.length > 0) {
      return res.status(400).send({
        data: "Already have abi and contract",
        success: false,
      });
    }
    const contract = {
      contract_address: contract_address,
      abijson: abijson,
    };
    const new_contract = new Contract(contract);
    const save_contract = await new_contract.save();
    if (save_contract) {
      return res.status(200).send({
        data: "Save the abi and contract",
        success: true,
      });
    }
    res.status(400).send({
      data: "Didn't Save the abi and contract",
      success: false,
    });
  } catch (error) {
    res.status(500).send({
      msg: error.message,
      success: false,
    });
  }
};
const getSingleUser = async (req, res) => {
  try {
    const getUserDetail = await User.findById({ _id: req.params.id });
    const kycUser = await Kyc.find({ user: req.params.id });
    console.log(kycUser);
    return res.status(200).send({
      data: getUserDetail,
      kyc: kycUser,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      msg: error.message,
      success: false,
    });
  }
};

module.exports = {
  listOfRecentUser,
  currencyConversion,
  getUserWithKyc,
  getAllTransactions,
  abijson,
  getSingleUser,
};
