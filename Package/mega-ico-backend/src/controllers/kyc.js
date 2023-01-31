const Kyc = require("../models/Kyc");
const config = require("../config/configBasic");
// const upload = require("../middlewares/files");
const User = require("../models/User");
const upload = require("express-fileupload");
const path = require("path");
const cloudinary = require("cloudinary");

const createKyc = async (req, res) => {
  try {
    let rejection_count;
    let body = req.body;

    let files = req.files;
    //See if Kyc Exists
    let kyc = await Kyc.find({ user: req.user.id });

    body.email = req.user.email;
    if (
      kyc.some((element) => element.kyc_status === "pending") ||
      kyc.some((element) => element.kyc_status === "approved")
    ) {
      return res.status(400).send({
        msg: "Kyc already exists and waiting for admin approval!",
        success: false,
      });
    }
    if (kyc.some((element) => element.kyc_status === "rejected")) {
      rejection_count = await Kyc.find({
        $and: [{ user: req.user.id }, { kyc_status: "rejected" }],
      }).count();
    }
    if (!files.file) {
      return res.status(400).send({
        msg: "Please upload the files",
        success: false,
      });
    }
    await cloudinary.config({
      cloud_name: config.cloudnary.cloud_name,
      api_key: config.cloudnary.api_key,
      api_secret: config.cloudnary.api_secret,
    });

    var pic_url = [];
    if (files.file.length >= 2) {
      for (let i = 0; i < files.file.length; i++) {
        await cloudinary.uploader.upload(
          files.file[i].tempFilePath,
          function (result, err) {
            if (err) {
              return res.status(400).send({
                msg: err,
                success: false,
              });
            }
            console.log("in loop", result.secure_url);
            let url = result.secure_url;
            pic_url.push(url);
          }
        );
      }
    } else {
      await cloudinary.uploader.upload(
        files.file.tempFilePath,
        function (result, err) {
          if (err) {
            return res.status(400).send({
              msg: err,
              success: false,
            });
          }
          console.log("without loop", result.secure_url);
          let url = result.secure_url;
          pic_url = [url];
        }
      );
    }
    console.log("pic_url", pic_url);
    body.identity = pic_url;
    // if (files.passport === undefined ) {
    //   return res.status(400).send({
    //     msg: "Personal Photo and CNIC Photo are mandatory",
    //     success: false,
    //   });
    // }

    // body.passport = files.passport[0].path.substring(7);
    // body.cnic_photo = files.cnic_photo[0].path.substring(7);
    // body.cnic_photo_back = files.cnic_photo_back[0].path.substring(7);

    body.user = req.user.id;

    let newKyc = new Kyc(body);

    const saveKyc = await newKyc.save();

    if (saveKyc) {
      return res.status(200).send({
        msg: "Kyc created Successfully",
        rejection: rejection_count,
        success: true,
      });
    } else {
      return res.status(400).send({
        // error: registerResponse,
        msg: "Bad Request - Kyc failed",
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

const getKycOfLoggedInUser = async (req, res) => {
  try {
    try {
      const kyc = await Kyc.findOne({ user: req.user.id }).populate("user");
      return res.status(200).send({
        data: kyc,
        msg: "Kyc detail found",
        success: true,
      });
    } catch (err) {
      return res.status(400).send({
        msg: "No record found",
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).send({
      msg: error.message,
      success: false,
    });
  }
};

const getKycById = async (req, res) => {
  try {
    try {
      const kyc = await Kyc.findById(req.params.id).populate("user");
      return res.status(200).send({
        data: kyc,
        msg: "Kyc detail found",
        success: true,
      });
    } catch (err) {
      return res.status(400).send({
        msg: "No record found",
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).send({
      msg: error.message,
      success: false,
    });
  }
};

const updataKycStatus = async (req, res) => {
  try {
    if (!["approved", "rejected"].includes(req.body.status)) {
      return res
        .status(400)
        .send({ success: false, msg: "Invalid status value" });
    }
    let kycId = req.body.id;
    let status = req.body.status; // approved, rejected
    let kyc = {};
    try {
      kyc = await Kyc.findById(kycId);
    } catch (error) {
      return res.status(400).send({
        msg: "No kyc found to update",
        success: false,
      });
    }

    if (kyc.kyc_status !== "pending") {
      return res.status(409).send({
        msg: `Kyc already ${kyc.kyc_status}`,
        success: "false",
      });
    }

    let updatedKyc = await Kyc.findByIdAndUpdate(
      kycId,
      { kyc_status: status },
      { new: true }
    );
    return res.status(200).send({
      status: 200,
      msg: `Kyc ${updatedKyc.kyc_status} successfully`,
      success: true,
    });
  } catch (error) {
    // console.log("Error", error);
    return res.status(500).send({
      error: error,
      msg: error.message,
      success: false,
    });
  }
};

const getPendingKyc = async (req, res) => {
  try {
    try {
      const pending_result = await Kyc.find();

      return res.status(200).send({
        data: pending_result,
        msg: "Kyc detail found",
        success: true,
      });
    } catch (err) {
      return res.status(400).send({
        msg: "No record found",
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).send({
      msg: error.message,
      success: false,
    });
  }
};

module.exports = {
  createKyc,
  getKycOfLoggedInUser,
  getKycById,
  updataKycStatus,
  getPendingKyc,
};
