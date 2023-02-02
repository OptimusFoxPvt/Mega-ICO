import {
  BOUNTY_LIST,
  TRANSACTION_LIST,
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
  GET_ALL_USERS_SUCCESS,
  GET_KYC_LIST,
  UPDATE_KYC_LIST,
  GET_TOKEN_VALUE,
  TOKEN_DATA,
  AIR_DROP,
  SET_CONTRACT_ADDRESS,
  GET_SINGLE_USER_SUCCESS,
  GET_SINGLE_USER_FAIL,
} from '../actions/types';

const initialState = {
  transactionLists: [],

  token: localStorage.getItem('token') || null,
  userDetails: localStorage.getItem('userDetails'),
  loading: true,
  isAuthenticated: false,
  contractAddress: '',
  updatePassword: {},
  userWallet: {},
  isEmailAuthOn: {},
  isGoogleAuthOn: {},
  isSMSAuthOn: {},
  allUsers: [],
  userUpdate: {},
  users: [],
  singleUser: {},
  error: {},
  errors: [],
  kycList: [],
  tokenValue: {},
  tokenData: {},
  bountyList: [],
  AirdropData: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TRANSACTION_LIST:
      return {
        ...state,
        transactionLists: payload,
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
    case GET_SINGLE_USER_FAIL:
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
      localStorage.setItem('userDetails', JSON.stringify(payload.userDetails));
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      localStorage.setItem('userDetails', JSON.stringify(payload.userDetails));
      return {
        ...state,
        ...payload,
        userDetails: payload.userDetails,
        isAuthenticated: true,
        loading: false,
      };

    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.clear();

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: true,
        userDetails: {},
        userWallet: {},
        users: [],
        allUsers: [],
      };

    case GET_TOKEN_VALUE:
      return {
        ...state,
        tokenValue: payload,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        userDetails: payload.data,
        loading: false,
      };

    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        allUsers: payload.data,
        loading: false,
      };
    case GET_SINGLE_USER_SUCCESS:
      return {
        ...state,
        singleUser: payload,
      };

    case GET_KYC_LIST:
      return {
        ...state,
        kycList: payload,
      };
    case UPDATE_KYC_LIST:
      let list = state.kycList.filter((a) => a.id !== payload.id);
      let newList = [...list, payload];
      return {
        ...state,
        kycList: newList,
      };
    case TOKEN_DATA:
      return {
        ...state,
        tokenData: payload,
      };
    case BOUNTY_LIST:
      return {
        ...state,
        bountyList: payload,
      };
    case AIR_DROP:
      return {
        ...state,
        AirdropData: payload,
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
