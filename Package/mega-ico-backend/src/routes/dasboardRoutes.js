const express = require("express");
const router = express.Router();
const user = require("../controllers/userAuthentication");
const validationMiddleware = require("../middlewares/validationMiddlewares");
const middleware = require("../middlewares/authMiddleware");

const dashboard = require("../controllers/dashboard");

//Download the Whitepaper
router
  .route("/dashboard/whitepaper")
  .get(middleware.auth(["user", "admin"]), dashboard.whitepaperDownload);

//Currency Rate and tokens
router
  .route("/dashboard/currency/tokens")
  .get(middleware.auth(["user"]), dashboard.TokenValue);

//Get Referral link
router
  .route("/dashboard/referral")
  .get(middleware.auth(["user"]), dashboard.getReferralLink);

//add the wallet address
router
  .route("/dasboard/wallet/address")
  .put(
    middleware.auth(["user"]),
    ...validationMiddleware.walletAddress,
    dashboard.addwalletaddress
  );

//Payment
router
  .route("/dashboard/wallet/fiat")
  .post(
    middleware.auth(["user"]),
    ...validationMiddleware.fiatTransaction,
    dashboard.paymentStripe
  );

//Get Transaction of user
router
  .route("/dashboard/wallet/transactions")
  .get(middleware.auth(["user"]), dashboard.getTransactions);

//Save the crpto transaction in Database
router
  .route("/dashboard/wallet/purchase/tokens")
  .post(
    middleware.auth(["user", "admin"]),
    ...validationMiddleware.blockchain,
    dashboard.tokensFromBlockchain
  );

// To collect Referral bonus
router
  .route("/dashboard/collect/referralbonus")
  .get(middleware.auth(["user"]), dashboard.referralBonus);

//Get the wallet address
router
  .route("/dashboard/wallet/address")
  .get(middleware.auth(["user"]), dashboard.getWalletAddress);

//check if there is any previous transaction
router
  .route("/dashboard/transaction/status")
  .get(middleware.auth(["user"]), dashboard.checkFirstTransaction);




module.exports = router;
