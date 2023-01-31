const { mappinghelper } = require("../helpers/helper");
const twitter = require("../helpers/twitter");
const AirDrop = require("../models/AirDrop");
const Bounty = require("../models/Bounty");
const Kyc = require("../models/Kyc");
const { User } = require("../models/User");

const postUrl = async (req, res) => {
  try {
    const { link } = req.body;
    const response_twitter = await twitter.getTweet(link, req, res);

    if (response_twitter) {
      return res.status(200).send({
        msg: "pending for admin approval",
        success: true,
      });
    }
    return res.status(400).send({
      msg: " admin approval",
      success: false,
    });
  } catch (error) {
    return res.status(500).send({
      msg: "No URL",
      error: error,
      success: false,
    });
  }
};

const getBounties = async (req, res) => {
  try {
    const allbounties = await Bounty.find({ bounty_status: "pending" });
    const resultbounties = await mappinghelper(allbounties);
    console.log("resultbounties", resultbounties);
    if (resultbounties) {
      return res.status(200).send({
        msg: "pending for admin approval",
        data: resultbounties,
        success: true,
      });
    }
    return res.status(400).send({
      msg: "No bounties",
      success: false,
    });
  } catch (error) {
    return res.status(500).send({
      msg: "Error on get bounties",
      error: error,
      success: false,
    });
  }
};
const updatebountystatus = async (req, res) => {
  try {
    if (!["approved", "rejected"].includes(req.body.status)) {
      return res
        .status(400)
        .send({ success: false, msg: "Invalid status value" });
    }
    let bountyId = req.body.id;
    let status = req.body.status; // approved, rejected
    let bounty = {};
    try {
      bounty = await Bounty.findById(bountyId);
    } catch (error) {
      return res.status(400).send({
        msg: "No bounty found to update",
        success: false,
      });
    }
    if (bounty.bounty_status !== "pending") {
      return res.status(409).send({
        msg: `bounty already ${bounty.bounty_status}`,
        success: "false",
      });
    }
    let updatedbounty = await Bounty.findByIdAndUpdate(
      bountyId,
      { bounty_status: status },
      { new: true }
    );
    return res.status(200).send({
      status: 200,
      msg: `bounty ${updatedbounty.bounty_status} successfully`,
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      msg: error,
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
      } catch (error) {
        return res.status(500).send({
          msg: "AirDrop error",
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
const updateairdropstatus = async (req, res) => {
  try {
    if (!["approved", "rejected"].includes(req.body.status)) {
      return res
        .status(400)
        .send({ success: false, msg: "Invalid status value" });
    }
    let airDropId = req.body.id;
    let status = req.body.status; // approved, rejected
    let airdrop = {};
    try {
      airdrop = await AirDrop.findById(airDropId);
    } catch (error) {
      return res.status(400).send({
        msg: "No AirDrop found to update",
        success: false,
      });
    }
    if (airdrop.airdrop_status !== "pending") {
      return res.status(409).send({
        msg: `airdrop already ${airdrop.airdrop_status}`,
        success: "false",
      });
    }
    let updatedairdrop = await AirDrop.findByIdAndUpdate(
      airDropId,
      { airdrop_status: status },
      { new: true }
    );
    return res.status(200).send({
      status: 200,
      msg: `bounty ${updatedairdrop.airdrop_status} successfully`,
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      msg: error,
      error: error,
      success: false,
    });
  }
};

const listofairdrop = async (req, res) => {
  try {
    const airdrop_list = await AirDrop.find({ airdrop_status: "pending" });
    if (airdrop_list) {
      return res.status(200).send({
        status: 200,
        data: airdrop_list,
        msg: `airdrop list`,
        success: true,
      });
    }
    return res.status(409).send({
      msg: `No airdrop`,
      success: "false",
    });
  } catch (error) {
    return res.status(500).send({
      msg: error,
      error: error,
      success: false,
    });
  }
};

module.exports = {
  postUrl,
  getBounties,
  updatebountystatus,
  updateairdropstatus,
  listofairdrop,
};
