//Auth
export {
  loadUser,
  register,
  verifyEmail,
  login,
  forgetPassword,
  resetPasswordFunction,
  verifyGoogleAuthCode,
  verifyEmailAuthCode,
  logout,
  verifySMSAuthCode,
  updateProfile,
  emailAuthentiactionOn,
  smsAuthentiactionOn,
} from "../../Services/authServices";

//Profile
export {
  submitBountyLink,
  getBountyStatus,
  transactionList,
  saveTransaction,
  getAdminAddress,
  submitFiatPayment,
  getReferralLink,
  getTokenValue,
  updateUserDetails,
  updatePassword,
  enableGoogleAuth,
  update2FaStatus,
  TierStatus,
  CreateCompliance_Tier1,
  GetCompliance_Tier1,
  addWallet,
  downloadWP,
  referralWallet,
  AllTransactions,
  AirDropRegistered,
} from "../../Services/profileServices";
//WEB 3
export {
  AirDropData,
  applyForAirdrop,
  buyToken,
  WalletConnect,
  disconnectWallet,
  tokenData,
} from "../../Services/web3Services";

//KYC
export { SubmitKyc, KycStatus } from "../../Services/KycServices";
