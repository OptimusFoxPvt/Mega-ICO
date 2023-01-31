const validation = require("../helpers/validator");

const userRegister = [
  validation.requiredFieldValidationMW("first_name"),
  validation.requiredFieldValidationMW("last_name"),
  validation.requiredFieldValidationMW("email"),
  validation.emailFieldValidationMW("email"),
  validation.requiredFieldValidationMW("password"),
  validation.passwordFieldValidationMW("password", 6),
];

const userLogin = [
  validation.requiredFieldValidationMW("email"),
  validation.emailFieldValidationMW("email"),
  validation.requiredFieldValidationMW("password"),
  validation.requiredFieldValidationMW("role"),
];

const updateUserDetails = [
  validation.requiredFieldValidationMW("email"),
  validation.emailFieldValidationMW("email"),
  validation.requiredFieldValidationMW("name"),
  validation.requiredFieldValidationMW("contact_no"),
  validation.requiredFieldValidationMW("dob"),
  validation.requiredFieldValidationMW("nationality"),
  validation.requiredFieldValidationMW("address"),
];

const verifyEmail = [validation.requiredFieldValidationMW("token")];

const updatePassword = [
  validation.requiredFieldValidationMW("newPassword"),
  validation.passwordFieldValidationMW("newPassword", 6),
  validation.requiredFieldValidationMW("currentPassword"),
];

const createKyc = [
  validation.requiredFieldValidationMW("phone_number"),
  validation.requiredFieldValidationMW("city"),
  validation.requiredFieldValidationMW("state"),
  validation.requiredFieldValidationMW("nationality"),
  validation.requiredFieldValidationMW("zip_code"),
  validation.requiredFieldValidationMW("dob"),
  validation.requiredFieldValidationMW("address"),
  validation.requiredFieldValidationMW("wallet"),
  validation.requiredFieldValidationMW("wallet_address"),
  validation.requiredFieldValidationMW("identity_type"),
];

const updateKycStatus = [
  validation.requiredFieldValidationMW("id"),
  validation.requiredFieldValidationMW("status"),
];
const updateairdropStatus = [
  validation.requiredFieldValidationMW("id"),
  validation.requiredFieldValidationMW("status"),
];
const createBounty = [
  validation.requiredFieldValidationMW("bounty_name"),
  validation.requiredFieldValidationMW("start_time"),
  validation.requiredFieldValidationMW("end_time"),
  validation.requiredFieldValidationMW("total_coins"),
  validation.requiredFieldValidationMW("coins_to_distribute"),
];

const bountyParticipation = [
  validation.requiredFieldValidationMW("bounty_description"),
  validation.requiredFieldValidationMW("link"),
];

const approveDisapproveParticipation = [
  validation.requiredFieldValidationMW("status"),
];

const updateGoogleAuthStatus = [validation.booleanFieldValidationMW("status")];

const verify2FaToken = [validation.requiredFieldValidationMW("token")];

const forgotPassword = [validation.requiredFieldValidationMW("email")];
const resetPassword = [
  validation.requiredFieldValidationMW("password"),
  validation.passwordFieldValidationMW("password", 6),
  validation.requiredFieldValidationMW("token"),
];
const fiatTransaction = [
  validation.requiredFieldValidationMW("number"),
  validation.requiredFieldValidationMW("exp_month"),
  validation.requiredFieldValidationMW("exp_year"),
  validation.requiredFieldValidationMW("cvc"),
  validation.requiredFieldValidationMW("amount"),
  validation.requiredFieldValidationMW("currency"),
];
const blockchain = [
  validation.requiredFieldValidationMW("tokens"),
  validation.requiredFieldValidationMW("eth"),
  validation.requiredFieldValidationMW("transaction_hash"),
  validation.requiredFieldValidationMW("transaction_id"),
  validation.requiredFieldValidationMW("transaction_time"),
  validation.requiredFieldValidationMW("transaction_type"),
  validation.requiredFieldValidationMW("wallet_from"),
];
const walletAddress = [
  validation.requiredFieldValidationMW("wallet"),
  validation.requiredFieldValidationMW("wallet_address"),
];
const bountyUrl = [validation.requiredFieldValidationMW("link")];

const middlewares = {
  register: [userRegister, validation.validationResultMW],
  verifyEmail: [verifyEmail, validation.validationResultMW],
  login: [userLogin, validation.validationResultMW],
  updateUserDetails: [updateUserDetails, validation.validationResultMW],
  updatePassword: [updatePassword, validation.validationResultMW],

  createKyc: [createKyc, validation.validationResultMW],
  updateKycStatus: [updateKycStatus, validation.validationResultMW],
  createBounty: [createBounty, validation.validationResultMW],
  editBounty: [createBounty, validation.validationResultMW],
  bountyparticipation: [bountyParticipation, validation.validationResultMW],
  approveDisapproveParticipation: [
    approveDisapproveParticipation,
    validation.validationResultMW,
  ],
  updateGoogleAuthStatus: [
    updateGoogleAuthStatus,
    validation.validationResultMW,
  ],
  verify2FaToken: [verify2FaToken, validation.validationResultMW],
  forgotPassword: [forgotPassword, validation.validationResultMW],
  resetPassword: [resetPassword, validation.validationResultMW],
  fiatTransaction: [fiatTransaction, validation.validationResultMW],
  walletAddress: [walletAddress, validation.validationResultMW],
  blockchain: [blockchain, validation.validationResultMW],
  updateairdropStatus: [updateairdropStatus, validation.validationResultMW],
  bountyUrl: [bountyUrl, validation.validationResultMW],
};

module.exports = middlewares;
