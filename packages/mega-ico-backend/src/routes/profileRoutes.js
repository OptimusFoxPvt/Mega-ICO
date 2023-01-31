const express = require("express");
const router = express.Router();
const user = require("../controllers/userAuthentication");
const validationMiddleware = require("../middlewares/validationMiddlewares");
const middleware = require("../middlewares/authMiddleware");

// Update User
router.put(
  "/profile/update-user",
  middleware.auth(["user", "admin"]),
  ...validationMiddleware.updateUserDetails,
  user.updateUserDetails
);

// user Update Password
router.put(
  "/profile/updatePassword",
  middleware.auth(["user", "admin"]),
  ...validationMiddleware.updatePassword,
  user.updatePassword
);

// Enables Two Factor Authenicator through Google Authenticator
router.post(
  "/profile/enable2fa",
  middleware.auth(["user", "admin"]),
  user.enable2FA
);

// Enables or disables Two Factor Authenticator through Google authenticator
router.put(
  "/profile/update2faStatus",
  middleware.auth(["user", "admin"]),
  ...validationMiddleware.updateGoogleAuthStatus,
  user.updateGoogleAuthStatus
);
module.exports = router;
