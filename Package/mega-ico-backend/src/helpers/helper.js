const Fiat = require("../models/Fiat");
const Kyc = require("../models/Kyc");
const { User } = require("../models/User");

exports.wallet_address = async (req) => {
  try {
    const address = await Kyc.findOne(
      {
        user: req.user.id,
        kyc_status: "approved",
      },
      { wallet_address: 1 }
    );
    if (address) {
      return address.wallet_address;
    }
    return res.status(400).send({
      msg: "Wallet address not found",
      success: false,
    });
  } catch (error) {
    return res.status(400).send({
      msg: "Wallet address Issue",
      error: error.message,
      success: false,
    });
  }
};

exports.fiatpayment = async (payment_id, user_id) => {
  try {
    const fiat_details = {
      user_id: user_id,
      fiat_id: payment_id,
    };
    const save_fiat = new Fiat(fiat_details);
    const save_response = await save_fiat.save();
    if (save_response) {
      return save_response;
    }
  } catch (error) {
    return res.status(400).send({
      msg: "fiat payment save Issue",
      error: error.message,
      success: false,
    });
  }
};
exports.updatefiatstatus = async (id) => {
  try {
    const fiat_res = await Fiat.findByIdAndUpdate(id, {
      tokens_transfer: "completed",
    });
    return true;
  } catch (error) {
    return res.status(500).send({
      error: error,
      msg: error.message,
      success: false,
    });
  }
};
exports.mappinghelper = async (table) => {
  try {
    
    const user_id = table.map((value) => value.user);
    const userdata = await User.find(
      {
        _id: {
          $in: user_id,
        },
      },
      { email: 1, last_login: 1 }
    );

    let result = table.filter((transaction) => {
      return userdata.some((user) => {
        if (transaction.user.toString() === user._id.toString()) {
          const new_transacation = { ...transaction };

          new_transacation._doc.email = user.email;
          new_transacation._doc.last_login = user.last_login;

          return { ...new_transacation };
        }
      });
    });
    console.log("result", result);
    if (result) {
      return result;
    }
    return res.status(400).send({
      msg: "mapping is not done",
      success: false,
    });
  } catch (error) {
    return res.status(500).send({
      error: error,
      msg: error.message,
      success: false,
    });
  }
};