const express = require("express");
const router = express.Router();
const kyc = require("../controllers/kyc");
const multer = require("multer");
const validationMiddleware = require("../middlewares/validationMiddlewares");
const middleware = require("../middlewares/authMiddleware");


// Create KYC request
router
  .route("/kyc/add")
  .post(
    middleware.auth("user"),
    ...validationMiddleware.createKyc,
    kyc.createKyc
  );

// Get KYC detail of loggedIn User
router
  .route("/kyc/loggedInUser")
  .get(middleware.auth("user"), kyc.getKycOfLoggedInUser);

// Update KYC Status by admin
router
  .route("/kyc/update/status")
  .put(
    middleware.auth("admin"),
    ...validationMiddleware.updateKycStatus,
    kyc.updataKycStatus
  );

//Get all kycs 

router.route("/kyc/pending").get(middleware.auth("admin"), kyc.getPendingKyc);


//Get kyc by id
router.route("/kyc/kycId/:id").get(middleware.auth("admin"), kyc.getKycById);

module.exports = router;
