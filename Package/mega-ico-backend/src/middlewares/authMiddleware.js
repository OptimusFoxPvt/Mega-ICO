const jwt = require("jsonwebtoken");
const config = require("../config/configBasic");
// const User = require("../models/User");

const requireValidToken = (req, res, next) => {
  let token = req.header("Authorization");
  // const { authorization } = req.headers;
  if (!token) {
    return res
      .status(401)
      .json({ msg: "Authorizaton denied", success: false, data: {} });
  }

  try {
    // jwt.verify(authorization, jwtSecret.jwt.secret);
    // const { id, email } = jwt.decode(authorization);
    // req.user = { id: id, email: email };
    let authString = token.split(" ");
    let decoded = jwt.verify(authString[1], config.jwt.jwtSecret);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).send({ msg: "Invalid token", success: false });
  }
};

exports.auth = (roles) => (req, res, next) => {
  requireValidToken(req, res, async function () {
    // console.log(req)
    // let user = await User.findOne({ _id: req.params.id });
    // if (user.isBlocked) {
    //   return res.status(403).send({
    //     msg: "user has been blocked by admin.",
    //     success: false,
    //   });
    // }

    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({
        success: false,
        msg: "you don't have the right permission to access this route :)",
      });
    }
  });
};
