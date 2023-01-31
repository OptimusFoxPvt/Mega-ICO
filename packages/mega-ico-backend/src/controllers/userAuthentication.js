const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var generator = require("generate-password");
const nodemailer = require("nodemailer");
const verificationToken = require("generate-sms-verification-code");
const QRCode = require("qrcode");
const speakeasy = require("speakeasy");
const Nexmo = require("nexmo");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../helpers/sendEmail");
const { User, UserCredential } = require("../models/User");
const UserReferrel = require("../models/UserReferral");
const config = require("../config/configBasic");
const mongoose = require("mongoose");
const Contract = require("../models/Contract");

const nexmo = new Nexmo(
  {
    apiKey: config.nexmo.apiKey,
    apiSecret: config.nexmo.apiSecret,
  },
  { debug: true }
);

const transport = nodemailer.createTransport({
  host: config.mailTrap.host,
  port: config.mailTrap.port,
  secure: false,
  auth: {
    user: config.mailTrap.auth.user,
    pass: config.mailTrap.auth.pass,
  },
});

const userRegister = async (req, res) => {
  // start transaction session

  try {
    const session = await mongoose.startSession();

    try {
      //See if User Exists
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res
          .status(409)
          .send({ msg: "User already exists!", success: false });
      }

      const encryptedPassword = await bcrypt.hash(
        req.body.password,
        config.jwt.saltRounds // 8 is optimal size and below 8 can be hacked easily
      );

      let newVerificationToken = verificationToken(
        config.verificationTokenSize,
        {
          type: "number",
        }
      ).toString();

      let encryptedToken = jwt.sign(newVerificationToken, config.jwt.jwtSecret);

      // Transaction start from here
      session.startTransaction();

      delete req.body.password;

      // Create instance of user and save it to database
      let newUser = new User(req.body);
      let saveUser = await newUser.save({ session });
      let user_ref;
      const ref_by = req.query.reflink;

      if (ref_by) {
        user_ref = await UserReferrel.findOne({
          referral_id: ref_by,
        });
      }
      const ref_id = uuidv4();
      const generatedRefLink = `${config.investor_url}api/v1/auth/signup?reflink=${ref_id}`;

      const new_referral = {
        user_id: saveUser._id,
        referred_by: ref_by,
        referral_id: ref_id,
        referral_link: generatedRefLink,
      };
      let user_referral = new UserReferrel(new_referral);
      let save_referral = await user_referral.save();
      if (save_referral) {
        console.log("save_referral", save_referral);
      }

      let userCredentialsBody = {
        password: encryptedPassword,
        sms_and_email_auth_token: encryptedToken,
        user: saveUser._id,
      };

      // Create instance of user credentials and save it to database
      const newUserCredentials = new UserCredential(userCredentialsBody);
      const saveUserCredentials = newUserCredentials.save({ session });

      // In my opinion, its useless check
      // if (!saveUser || !saveUserCredentials) {
      //   return res.status(400).send({
      //     // error: registerResponse,
      //     msg: "Bad Request - Registration failed",
      //     success: false,
      //   });
      // }
      // /${encryptedToken}/'
      const url = `${config.investor_url}verifyemail/${encryptedToken}`;
      const output = `Hi ${req.body.first_name},<br/> Thanks for registering! <br/><br/> Please <a href=${url}>Click Here</a> to verify your email address<br/><br/> If this link is not working then please copy this url to your browser's tab -- ${url} <br/><br/> If it was not you, please ignore this email`;
      let mailOptions = {
        from: config.mailTrap.fromEmail,
        to: req.body.email,
        subject: `Thank you for registering`,
        // text: `Account Details for the new user Email ${req.body.email}`,
        html: output,
      };

      await sendEmail(mailOptions)
        .then((res) => console.log(res))
        .catch(async (err) => {
          await session.abortTransaction();
          session.endSession();
          return res.status(400).send({
            success: false,
            error: err,
            msg: "Error in sending verification email, Please register again",
          });
        });

      // console.log(resofemail);

      await session.commitTransaction();
      session.endSession();

      return res.status(200).send({
        msg: "Email sent Successfully. To Login, Please verify your email",
        success: true,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      return res.status(400).send({
        success: false,
        msg: "Ooops, something went wrong - Registration failed",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Server Error - Registration failed",
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    let code = req.body.token;

    const userCredentials = await UserCredential.findOne(
      {
        sms_and_email_auth_token: code,
      },
      { user: 1 }
    );

    if (!userCredentials) {
      return res.status(400).send({
        msg: "Invalid Auth Code, verification failed",
        success: false,
      }); //msg:"User does not exist"
    }
    const user = await User.findById(userCredentials.user, {
      is_email_verified: 1,
    });
    console.log("Email....", user.is_email_verified);
    if (user.is_email_verified) {
      return res.status(409).send({
        msg: "Email already verified",
        success: "false",
      });
    }
    if (user) {
      const session = await mongoose.startSession();
      try {
        // session started
        session.startTransaction();

        await User.findByIdAndUpdate(
          user._id,
          { is_email_verified: true },
          { new: false } // set it to true, if we wanna return updated value
        ).session(session);
        await UserCredential.findByIdAndUpdate(
          userCredentials._id,
          { sms_and_email_auth_token: "" },
          { new: false } // set it to true, if we wanna return updated value
        ).session(session);

        await session.commitTransaction();
        session.endSession();

        return res.status(200).send({
          status: 200,
          msg: "Email verified successful. Now you can login",
          success: true,
        });
      } catch (error) {
        await session.abortTransaction();
        session.endSession();

        return res.status(400).send({
          success: false,
          msg: "Ooops, something went wrong - Verification failed",
        });
      }
    }
  } catch (error) {
    // console.log("Error", error);
    return res.status(500).send({
      success: false,
      msg: "Ooops, something went wrong - Verification failed",
    });
  }
};

//@desc Login User and get Token
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    //See if User Exists
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .send({ msg: `${email} is not a user`, success: false });
    }
    let UserCredentials = await UserCredential.findOne({ user: user._id });

    if (user.role !== req.body.role) {
      return res.status(403).send({ success: false, msg: "Permission Denied" });
    }

    if (!user.is_email_verified) {
      return res.status(401).send({
        msg: "Email not verified, please check your email for verification",
        success: false,
      });
    }

    if (user.is_blocked) {
      return res.status(400).send({
        msg: "User has been blocked by admin.",
        success: false,
      });
    }

    bcrypt.compare(
      password,
      UserCredentials.password,
      async (err, response) => {
        if (response) {
          if (user.is_email_verification_on) {
            var generatedToken = verificationToken(8, { type: "string" });

            var mailOptions = {
              from: `"Example Team" ${config.mailTrap.fromEmail}`,
              to: user.email,
              subject: "ICO-Platform Test",
              text: "Hey there, it’s our first message sent with ICO-Platform ;) ",
              html: `<b>Hey there! </b><br> Your verification token is ${generatedToken}`,
            };
            // const salt = bcrypt.genSaltSync(config.jwt.saltRounds);

            const encryptedPassword = await bcrypt.hash(
              // const encryptedPassword = bcrypt.hash(
              generatedToken,
              config.jwt.saltRounds
            );

            transport.sendMail(mailOptions, async (error, info) => {
              if (error) {
                return res
                  .status(501)
                  .send({ status: 501, msg: "Error in sending email" });
              }
              await User.findByIdAndUpdate(
                user._id,
                {
                  sms_and_email_auth_token: encryptedPassword,
                },
                { new: false }
              );
            });
            return res.status(200).send({
              status: 200,
              msg: "Verification code sent to your email, Please verify to login",
              data: {
                authentication: "email",
                id: user._id,
                email: user.email,
              },
            });
          } else if (user.is_number_verification_on) {
            let number = user.contact_no;
            nexmo.verify.request(
              {
                number: config.nexmo.phoneNumber,
                brand: "ICO-Platform",
                code_length: "4",
              },
              (err, result) => {
                return res.status(200).send({
                  status: 200,
                  msg: "Verification code sent to your contact number, Please verify to login",
                  data: {
                    authentication: "sms",
                    id: user._id,
                    contactNo: number,
                  },
                  result,
                });
              }
            );
          } else if (user.is_google_authentication_on) {
            return res.status(200).send({
              status: 200,
              msg: "Google verification code required, Please verify to login",
              data: { authentication: "google", id: user._id },
            });
          } else {
            userLoginResponse(user, res);
          }
        } else {
          return res.status(401).send({
            msg: "Password is incorrect",
            success: false,
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: error.message,
    });
  }
};

const getLoggedInUserdetail = async (req, res) => {
  try {
    try {
      const user = await User.findById(req.user.id);
      return res.status(200).send({
        data: user,
        msg: "User detail found",
        success: true,
      });
    } catch (err) {
      return res.status(404).send({
        msg: "No record found",
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).send({
      msg: "Server error...",
      success: false,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    // starting session for transaction
    let session = await mongoose.startSession();

    try {
      let user = await User.findOne(
        { email: req.body.email },
        { first_name: 1, is_email_verified: 1 }
      );
      if (!user) {
        return res
          .status(404)
          .send({ msg: `User doesn't exists!`, success: false });
      }

      if (!user.is_email_verified) {
        return res.status(401).send({
          success: false,
          msg: "Email is not verified yet, please register again",
        });
      }

      let userCredentials = await UserCredential.findOne({ user: user._id });

      let generatedCode = generator.generate({
        length: 8,
        numbers: true,
      });

      let encryptedToken = await jwt.sign(generatedCode, config.jwt.jwtSecret);

      session.startTransaction();

      userCredentials.password_reset_token = encryptedToken;
      let updatedValue = await userCredentials.save({ session });

      let url = `${config.investor_url}auth/reset-password/${encryptedToken}`;
      const output = `Hi ${user.fisrt_name},<br/> Please <a href=${url}>Click Here</a> to reset your password<br/><br/> If this link is not working then please copy this url to your browser's tab -- ${url} <br/><br/> If it was not you, please ignore this email`;
      let mailOptions = {
        from: config.mailTrap.fromEmail,
        to: req.body.email,
        subject: `Password Reset`,
        html: output,
      };

      // if (updatedValue) { // useless check in my opinion
      await sendEmail(mailOptions)
        .then((res) => res)
        .catch(async (err) => {
          await session.abortTransaction();
          session.endSession();

          return res.status(400).send({
            success: false,
            msg: "Error in sending email, Please try again",
          });
        });
      // console.log(encryptedToken);

      await session.commitTransaction();
      session.endSession();
      return res.status(200).send({
        success: true,
        msg: "Password reset Link sent to your email",
      });
      // }
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.log(error);
      return res.status(400).send({
        success: false,
        msg: "Ooops, something went wrong - Forget Password failed",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Internal server error - Email verification failed",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    let code = req.body.token;
    let newPassword = req.body.password;

    const userCredentials = await UserCredential.findOne(
      { password_reset_token: code },
      { password: 1 }
    );

    if (!userCredentials) {
      return res.status(401).send({
        // Status should be 404 as its original message is "user not found" but its status is according to current message
        success: false,
        msg: "Invalid Token Link",
      });
    }

    const encryptedPassword = await bcrypt.hash(
      newPassword,
      config.jwt.saltRounds
    );

    userCredentials.password = encryptedPassword;
    userCredentials.password_reset_token = null;
    let updatedValue = await userCredentials.save();

    if (updatedValue) {
      return res.status(200).send({
        success: true,
        msg: "Password reset successfully - Now you can login",
      });
    } else {
      // In my opinion, its useless check
      return res.status(400).send({
        success: false,
        msg: "Password reset failed",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Server error - Password reset failed",
    });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    let user = {};
    try {
      user = await User.findById(req.user.id);
    } catch (error) {
      return res.status(400).send({
        msg: "No user found to update",
        success: false,
      });
    }

    let updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });
    return res.status(200).send({
      data: updatedUser,
      msg: `User details updated successfully`,
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      msg: "Server Error...",
      success: false,
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    let user = await UserCredential.findOne(
      { user: req.user.id },
      { password: 1 }
    );

    if (!user) {
      return res
        .status(400)
        .send({ msg: "User does not exist", success: false });
    }

    bcrypt.compare(
      req.body.currentPassword,
      user.password,
      async (err, response) => {
        if (response) {
          const encryptedPassword = await bcrypt.hash(
            req.body.newPassword,
            config.jwt.saltRounds
          );

          let updatedValue = await UserCredential.findOneAndUpdate(
            { user: req.user.id },
            {
              password: encryptedPassword,
            },
            { new: true }
          );

          if (updatedValue) {
            return res.status(200).send({
              msg: "Password updated",
              success: true,
            });
          }

          return res.status(500).send({
            msg: "Internal server error",
            success: false,
          });
        } else
          return res.status(401).send({
            msg: "Old password is incorrect",
            success: false,
          });
      }
    );
  } catch (error) {
    res.status(500).send({
      msg: "Internal server error",
      success: false,
    });
  }
};

const enable2FA = async (req, res) => {
  try {
    let user = await User.findOne(
      { _id: req.user.id },
      { is_google_authentication_on: 1, name: 1 }
    );

    if (!user) {
      return res
        .status(404)
        .send({ msg: "User does not exist", success: false });
    }

    let userCredentials = await UserCredential.findOne({ user: req.user.id });

    const secret = speakeasy.generateSecret({
      length: 10,
      name: `${user.name}`,
      issuer: "MEGAICO-Platform v0.0",
    });

    var url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `${user.name}`,
      issuer: "MEGAICO-Platform",
      encoding: "base32",
    });

    QRCode.toDataURL(url, async (err, dataURL) => {
      userCredentials.tfa_token = secret.base32;
      userCredentials.tfa_qrcode_url = dataURL;
      let response = await userCredentials.save();

      return res.status(200).json({
        success: true,
        msg: "TFA needs to be verified",
        googleAuth: {
          tfaToken: secret.base32,
          dataURL,
          tfaURL: secret.otpauth_url,
        },
      });
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Internal server error - Failed to enable 2fa",
    });
  }
};

const updateGoogleAuthStatus = async (req, res) => {
  try {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const user = await User.findOne(
        { _id: req.user.id },
        {
          is_google_authentication_on: 1,
        }
      ).session(session);
      if (!user) {
        return res
          .status(404)
          .send({ msg: "User does not exist", success: false });
      }

      const userCredentials = await UserCredential.findOne({
        user: req.user.id,
      }).session(session);

      if (!userCredentials.tfa_token) {
        return res.status(404).send({
          success: false,
          msg: "No TFA token found - Please try again",
        });
      }

      // if (!req.body.status) {
      //   userCredentials.tfa_token = null;
      //   await userCredentials.save(); // No need for session as we have registered session on UserCredential.findOne function -- Note: this functionality is only available for save function
      // }

      user.is_google_authentication_on = req.body.status;
      let updatedUser = await user.save(); // No need for session as we have registered session on User.findOne function -- Note: this functionality is only available for save function

      await session.commitTransaction();
      session.endSession();

      return res.status(200).json({
        success: true,
        msg: "Two-factor auth status updated",
        data: updatedUser,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      return res.status(400).send({
        success: false,
        msg: "Two-factor auth status not updated",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Internal server error - Auth status not updated",
    });
  }
};

const verify2FAtoken = async (req, res) => {
  try {
    // console.log(`DEBUG: Received TFA Verify request`);
    // req.body.id is logging in userId
    if (!req.body.id) {
      return res.status(400).send({
        success: false,
        msg: "Logging in user Id is required",
      });
    }

    let userCredentials = await UserCredential.findOne(
      { user: req.body.id },
      { tfa_token: 1 }
    );

    if (!userCredentials) {
      return res
        .status(404)
        .send({ msg: "User does not exist", success: false });
    }

    let user = await User.findById(req.body.id);
    if (!user.is_google_authentication_on) {
      return res.status(403).send({
        success: false,
        msg: "Please enable-in google authentication first",
      });
    }

    let isVerified = speakeasy.totp.verify({
      secret: userCredentials.tfa_token,
      encoding: "base32",
      token: req.body.token,
    });

    if (isVerified) {
      // console.log(`DEBUG: TFA is verified to be enabled`);
      return userLoginResponse(
        user,
        res
        // "Two-factor Auth is verified successfully"
      );
    }

    return res.status(401).send({
      success: false,
      msg: "Invalid Auth Code, verification failed. Please verify the system Date and Time",
    });
  } catch (error) {
    //   If invalid object id is passed
    if (error.message.indexOf("Cast to ObjectId failed") !== -1)
      return res.status(404).send({
        // status should be 401 as user id is invalid but this status is according to message as client has only need to know user with id is not found despite of  user id is invalid
        success: false,
        msg: "User not found",
      });
    return res.status(500).send({
      success: false,
      msg: "Internal server error - verification failed",
    });
  }
};

const updateEmailVerificationStatus = async (req, res) => {
  try {
    if (typeof req.body.status !== "boolean") {
      return res.send({ msg: "Invalid type" });
    }

    let user = await User.findOne(
      { _id: req.body.id },
      {
        is_google_authentication_on: 1,
        is_number_verification_on: 1,
        is_email_verification_on: 1,
      }
    );

    if (!user) {
      return res
        .status(400)
        .send({ msg: "User does not exist", success: false });
    }

    if (
      req.body.status &&
      (user.is_google_authentication_on || user.is_number_verification_on)
    ) {
      return res.status(403).json({
        success: false,
        msg: "can not enable multiple authentications.",
      });
    }

    let updatedValue = await User.findByIdAndUpdate(
      user._id,
      {
        is_email_verification_on: req.body.status,
      },
      { new: true }
    ).select({
      is_google_authentication_on: 1,
      is_number_verification_on: 1,
      is_email_verification_on: 1,
    });

    if (updatedValue) {
      console.log(`DEBUG: Email Verification status updated`);
      return res.json({
        status: 200,
        msg: "Email Verification status updated",
        data: { updatedValue },
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error,
      msg: "Internal server error",
      success: false,
    });
  }
};

const updateSMSVerificationStatus = async (req, res) => {
  try {
    if (typeof req.body.status !== "boolean") {
      return res.send({ msg: "Invalid type" });
    }

    let user = await User.findOne(
      { _id: req.body.id },
      {
        is_google_authentication_on: 1,
        is_number_verification_on: 1,
        is_email_verification_on: 1,
      }
    );

    if (!user) {
      return res
        .status(400)
        .send({ msg: "User does not exist", success: false });
    }

    if (
      req.body.status &&
      (user.is_google_authentication_on || user.is_email_verification_on)
    ) {
      return res.status(403).json({
        success: false,
        msg: "can not enable multiple authentications.",
      });
    }

    let updatedValue = await User.findByIdAndUpdate(
      user._id,
      {
        is_number_verification_on: req.body.status,
      },
      { new: true }
    ).select({
      is_google_authentication_on: 1,
      is_number_verification_on: 1,
      is_email_verification_on: 1,
    });

    if (updatedValue) {
      console.log(`DEBUG: SMS Verification status updated`);

      return res.json({
        status: 200,
        msg: "SMS Verification status updated",
        data: { updatedValue },
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error,
      msg: "Internal server error",
      success: false,
    });
  }
};

const verifySMSAndEmailCode = async (req, res) => {
  console.log("verifySMSAndEmailCode--->>", req.body);
  try {
    console.log(`DEBUG: Received TFA Verify request`);
    let user = await User.findOne(
      { _id: req.body.id },
      {
        password: 0,
        password_reset_token: 0,
        auth_token: 0,
        //  sms_and_email_auth_token: 0,
      }
    );

    if (!user) {
      return res
        .status(400)
        .send({ msg: "User does not exist", success: false });
    }
    bcrypt.compare(
      req.body.token,
      user.sms_and_email_auth_token,
      async (err, response) => {
        console.log(`DEBUG: SMS TFA is verified`);

        if (response) {
          userLoginResponse(user, res, "SMS Two-factor Auth is verified");
        } else {
          console.log(`ERROR: TFA is verified to be wrong`);

          res.status(400).send({
            status: 403,
            msg: "Invalid Auth Code, verification failed. Please verify the system Date and Time",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).send({
      error: error,
      msg: error.message,
      success: false,
    });
  }
};

const verifySMSCode = async (req, res) => {
  console.log("verifySMSCode--->>", req.body);
  try {
    nexmo.verify.check(
      {
        request_id: req.body.requestId,
        code: req.body.code,
      },
      async (error, result) => {
        if (error) {
          // console.log("if_err--->>",error);
          return res.status(400).json({ msg: error.message });
        } else if (result.error_text) {
          // console.log("else if--->>");

          return res.status(400).json({ msg: "Wrong SMS Code, Please retry" });
        } else {
          // console.log("else--->>");
          let user = await User.findOne(
            { _id: req.body.id },
            {
              password: 0,
              password_reset_token: 0,
              auth_token: 0,
              sms_and_email_auth_token: 0,
            }
          );

          if (user) {
            userLoginResponse(user, res, "SMS Code verified");
          } else {
            return res
              .status(401)
              .json({ success: false, msg: "no user detail found" });
          }
        }
      }
    );
  } catch (error) {
    return res.status(500).send({
      error: error,
      msg: "Internal server error",
      success: false,
    });
  }
};

const userLoginResponse = async (user, res) => {
  try {
    let contract_address;
    let abi;
    var isContractDeployed = new Boolean(false);
    const contract = await Contract.findOne();
    if (contract) {
      isContractDeployed = true;
      abi = contract.abijson;
      contract_address = contract.contract_address;
    }
    await User.findOneAndUpdate({ _id: user.id }, { last_login: Date.now() });
    return res.status(200).send({
      status: 200,
      msg: "Successfully logged in",
      data: {
        user,
        isContractDeployed: isContractDeployed,
        abi: abi,
        contract_address: contract_address,
        token: jwt.sign(
          {
            id: user._id,
            email: user.email,
            fname: user.first_name,
            role: user.role,
          },
          config.jwt.jwtSecret
        ),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = {
  userRegister,
  userLogin,
  getLoggedInUserdetail,
  forgotPassword,
  resetPassword,
  verifyEmail,
  updateUserDetails,
  updatePassword,
  enable2FA,
  updateGoogleAuthStatus,

  verify2FAtoken,
  updateEmailVerificationStatus,
  updateSMSVerificationStatus,
  verifySMSAndEmailCode,
  verifySMSCode,
};
