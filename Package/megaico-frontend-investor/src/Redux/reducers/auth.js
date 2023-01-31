import {
  TRANSACTION_LIST,
  SUBMIT_FIAT_PAYMENT,
  GET_REFERRAL_LINK,
  GET_TOKEN_VALUE,
  SEND_KYC,
  REGISTER_MSG,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  VERIFY_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  FORGET_SUCCESS,
  FORGET_FAIL,
  FORGET_MSG,
  RESET_SUCCESS,
  RESET_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  ERR_USERS,
  USER_LOADED_DATA,
  AUTH_ERROR_DATA,
  LOGOUT,
  SET_AUTH_VERIFICATION,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERR,
  IS_EMAIL_AUTH_ON_SUCCESS,
  IS_EMAIL_AUTH_ON_ERR,
  UPDATE_2FA_STATUS_SUCCESS,
  UPDATE_2FA_STATUS_ERR,
  IS_SMS_AUTH_ON_SUCCESS,
  IS_SMS_AUTH_ON_ERR,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERR,
  UPDATE_USER_ERR,
  UPDATE_USER_SUCCESS,
  ENABLE_2FA_SUCCESS,
  ENABLE_2FA_ERR,
  GET_TIER_STATUS_FAIL,
  GET_TIER_STATUS_SUCCESS,
  KYC_STATUS,
  WALLET_DATA,
  GET_ADMIN_ADDRESS,
  GET_COIN_DATA,
  WALLET_CONNECTED,
  TOKEN_DATA,
  BOUNTY_STATUS,
  SUBMIT_BOUNTY_LINK,
  REFERRAL_WALLET,
  ALL_TRANSACTIONS,
  AIR_DROP_DATA,
  SET_CONTRACT_ADDRESS,
} from "../actions/types";

const initialState = {
  airDropData: false,
  bountyLink: {},
  bountyStatus: {},
  transactionLists: [],
  savedTransaction: [],
  adminAddress: [],
  fiatPayment: {},
  referralLink: {},
  tokenValue: {},
  token: localStorage.getItem("token") || null,
  userDetails: localStorage.getItem("userDetails"),
  loading: true,
  isAuthenticated: false,
  userDetails: {},
  updatePassword: {},
  userWallet: {},
  isEmailAuthOn: {},
  isGoogleAuthOn: {},
  isSMSAuthOn: {},
  userUpdate: {},
  tiersStatus: null,
  users: [],
  error: {},
  errors: [],
  AllTransactions: [],
  kycStatus: "loading",
  walletData: { wallet: "", wallet_address: "" },
  coindata: { name: "" },
  walletConnection: "Disconnected",
  tokenData: {},
  referralWallet: "",
  referralID: "",
  contractAddress: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SUBMIT_BOUNTY_LINK:
      return {
        ...state,
        bountyLink: payload,
      };
    case BOUNTY_STATUS:
      return {
        ...state,
        bountyStatus: payload,
      };
    case GET_ADMIN_ADDRESS:
      return {
        ...state,
        adminAddress: payload,
      };

    case TRANSACTION_LIST:
      return {
        ...state,
        transactionLists: payload,
      };

    case SUBMIT_FIAT_PAYMENT:
      return {
        ...state,
        fiatPayment: payload,
      };
    case GET_REFERRAL_LINK:
      return {
        ...state,
        referralLink: payload,
      };
    case GET_TOKEN_VALUE:
      return {
        ...state,
        tokenValue: payload,
      };
    case SEND_KYC:
      return {
        ...state,
        ...payload,
        loading: true,
      };
    case USER_LOADED:
    case REGISTER_MSG:
    case REGISTER_SUCCESS:
    case FORGET_MSG:
    case FORGET_SUCCESS:
    case RESET_SUCCESS:
    case SET_AUTH_VERIFICATION:
    case IS_EMAIL_AUTH_ON_SUCCESS:

    case UPDATE_2FA_STATUS_SUCCESS:
    case IS_SMS_AUTH_ON_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
    case ENABLE_2FA_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    case ERR_USERS:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case REGISTER_FAIL:
    case VERIFY_FAIL:
    case FORGET_FAIL:
    case RESET_FAIL:
    case AUTH_ERROR_DATA:
    case AUTH_ERROR:
    case ENABLE_2FA_ERR:

    case IS_EMAIL_AUTH_ON_ERR:
    case UPDATE_2FA_STATUS_ERR:
    case IS_SMS_AUTH_ON_ERR:
    case UPDATE_PROFILE_ERR:
    case UPDATE_PASSWORD_ERR:
    case UPDATE_USER_ERR:
      return {
        ...state,
        errors: payload,
        loading: false,
      };

    case USER_LOADED_DATA:
      localStorage.setItem("userDetails", JSON.stringify(payload.userDetails));
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        userDetails: JSON.parse(localStorage.getItem("userDetails")),
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("userDetails", JSON.stringify(payload.userDetails));
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.clear();

      return {
        transactionLists: [],
        savedTransaction: [],
        adminAddress: [],
        fiatPayment: {},
        referralLink: {},
        tokenValue: {},
        token: null,
        userDetails: null,
        isAuthenticated: false,
        userDetails: {},
        updatePassword: {},
        userWallet: {},
        isEmailAuthOn: {},
        isGoogleAuthOn: {},
        isSMSAuthOn: {},
        userUpdate: {},
        users: [],
        error: {},
        errors: [],
        AllTransactions: [],
        kycStatus: "loading",
        walletData: { wallet: "", wallet_address: "" },
        coindata: { name: "" },
        walletConnection: "Disconnected",
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        userDetails: payload.data,
        loading: false,
      };
    case GET_TIER_STATUS_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    case KYC_STATUS:
      return {
        ...state,
        kycStatus: payload?.data?.kyc_status
          ? payload.data.kyc_status
          : "Not Submitted",
        walletData: {
          wallet: payload?.data?.wallet ? payload.data.wallet : "",
          wallet_address: payload?.data?.wallet_address
            ? payload.data.wallet_address
            : "",
        },
      };
    case WALLET_DATA:
      return {
        ...state,
        walletData: {
          wallet: payload.wallet,
          wallet_address: payload.wallet_address,
        },
      };
    case GET_COIN_DATA:
      return {
        ...state,
        coindata: {
          name: payload?.name,
          symbol: payload?.symbol,
        },
      };
    case WALLET_CONNECTED:
      return {
        ...state,
        walletConnection: payload,
      };
    case TOKEN_DATA:
      return {
        ...state,
        tokenData: payload,
      };
    case AIR_DROP_DATA:
      return {
        ...state,
        airDropData: payload,
      };
    case ALL_TRANSACTIONS:
      return {
        ...state,
        AllTransactions: payload,
      };
    case REFERRAL_WALLET:
      return {
        ...state,
        referralWallet: payload.wallet_address,
        referralID: payload.user,
      };
    case SET_CONTRACT_ADDRESS:
      return {
        ...state,
        contractAddress: payload,
      };
    default:
      return state;
  }
};
