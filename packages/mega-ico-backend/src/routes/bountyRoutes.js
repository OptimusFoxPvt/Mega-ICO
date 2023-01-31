const express = require("express");
const middleware = require("../middlewares/authMiddleware");
const router = express.Router();
const bounty = require("../controllers/bounty");
const validationMiddleware = require("../middlewares/validationMiddlewares");

router
  .route("/dashboard/bounty/post")
  .post(
    middleware.auth(["user"]),
    ...validationMiddleware.bountyUrl,
    bounty.postUrl
  );
router
  .route("/dashbaord/bounty/list")
  .get(middleware.auth(["admin"]), bounty.getBounties);
router
  .route("/dashboard/bounty/status")
  .post(
    middleware.auth(["admin"]),
    ...validationMiddleware.updateairdropStatus,
    bounty.updatebountystatus
  );

// upodate the status of airdrop status
router
  .route("/dashboard/airdrop/status")
  .post(
    middleware.auth(["admin"]),
    ...validationMiddleware.updateairdropStatus,
    bounty.updateairdropstatus
  );

//Get all the aidrop participants
router
  .route("/dashboard/airdrop/list")
  .get(middleware.auth(["admin"]), bounty.listofairdrop);

module.exports = router;
