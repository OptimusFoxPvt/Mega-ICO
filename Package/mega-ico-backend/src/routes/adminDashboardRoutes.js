const express = require("express");
const router = express.Router();
const user = require("../controllers/userAuthentication");
const validationMiddleware = require("../middlewares/validationMiddlewares");
const middleware = require("../middlewares/authMiddleware");

const adminDashboard = require("../controllers/adminDashboard");

//Get the lastest 5 new investor
router
  .route("/user/getAllRecentUsers")
  .get(middleware.auth(["admin"]), adminDashboard.listOfRecentUser);

//Get the Eth, BTC, LTC currency
router
  .route("/admin/currency/usd")
  .get(middleware.auth(["admin"]), adminDashboard.currencyConversion);

//Get all Users with their KYC status
router
  .route("/admin/getUsers/KYC")
  .get(middleware.auth(["admin"]), adminDashboard.getUserWithKyc);

//Get All transactions of investors
router
  .route("/admin/gettransactions")
  .get(middleware.auth(["user", "admin"]), adminDashboard.getAllTransactions);

router
  .route("/admin/contract/abi")
  .post(middleware.auth(["admin"]), adminDashboard.abijson);

router
  .route("/get/singleuser/:id")
  .get(middleware.auth(["admin"]), adminDashboard.getSingleUser);

module.exports = router;
