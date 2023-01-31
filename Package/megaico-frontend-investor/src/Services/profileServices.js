import axios from 'axios';
import {
  SUBMIT_FIAT_PAYMENT,
  GET_TOKEN_VALUE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERR,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERR,
  ENABLE_2FA_SUCCESS,
  ENABLE_2FA_ERR,
  UPDATE_2FA_STATUS_SUCCESS,
  UPDATE_2FA_STATUS_ERR,
  GET_TIER_STATUS_SUCCESS,
  GET_TIER_STATUS_FAIL,
  GET_REFERRAL_LINK,
  WALLET_DATA,
  GET_ADMIN_ADDRESS,
  TRANSACTION_LIST,
  BOUNTY_STATUS,
  SUBMIT_BOUNTY_LINK,
  REFERRAL_WALLET,
  ALL_TRANSACTIONS,
} from '../Redux/actions/types';
import { profile } from '../Routes/serverRoutes';
import { KYC } from '../Routes/serverRoutes';
import { toast } from 'react-toastify';
import browserRoute from '../Routes/browserRoutes';
import { api } from '../configurations/axiosConfig';

//get bounty status
export const getBountyStatus = () => (dispatch) => {
  axios
    .get('')
    .then((res) => {
      dispatch({
        type: BOUNTY_STATUS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err, 'error response');
    });
};

//alert toast
const alertToast = (error, message) => {
  if (!error) {
    toast.success(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

//get token value
export const getTokenValue = () => (dispatch) => {
  axios
    .get(profile.GET_TOKEN_VALUE)
    .then((res) => {
      dispatch({
        type: GET_TOKEN_VALUE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err, 'error response');
    });
};

export const getAdminAddress = () => (dispatch) => {
  axios
    .get('')
    .then((res) => {
      dispatch({
        type: GET_ADMIN_ADDRESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err, 'error response');
    });
};

//transaction list

export const transactionList = () => (dispatch) => {
  api
    .get(profile.TRANSACTION_LIST)
    .then((res) => {
      dispatch({
        type: TRANSACTION_LIST,
        payload: res.data?.data,
      });
    })
    .catch((err) => {
      console.log(err, 'error response');
    });
};

//save transaction

export const saveTransaction = (
  id,
  referralAddress,
  referralBonus,
  d,
  eth,
  tokens,
  time
) => {
  return (dispatch) => {
    const data = {
      wallet_from: d.from,
      transaction_hash: d.transactionHash,
      eth: eth,
      tokens: tokens,
      transaction_id: d.events.TokensPurchased?.id,
      transaction_time: time,
      transaction_type: 'purchase',
    };
    const data2 = {
      user: id,
      wallet_from: d.events['1']?.address,
      transaction_hash: d.transactionHash,
      eth: 0,
      tokens: referralBonus,
      transaction_id: d.events.TokensPurchased?.id,
      transaction_time: time,
      transaction_type: 'bonus',
    };
    console.log(data, 'save transaction data');
    try {
      axios.post(profile.SAVE_TRANSACTION, data).then((response) => {
        console.log('saved tranx', response);
      });
      eth >= 1 &&
        referralAddress !== '0x0000000000000000000000000000000000000000' &&
        axios.post(profile.SAVE_TRANSACTION, data2).then((response) => {
          console.log('saved tranx', response);
        });
    } catch (err) {}
  };
};

export const submitBountyLink = (data) => {
  return (dispatch) => {
    try {
      const link = axios
        .post(profile.SUBMIT_BOUNTY_LINK, data)
        .then((res) => console.log(res.data, 'bount link and image'));
      dispatch({
        type: SUBMIT_BOUNTY_LINK,
        payload: link.data,
      });
    } catch (err) {}
  };
};

export const submitFiatPayment = (data) => {
  return (dispatch) => {
    try {
      const fiat = axios
        .post(profile.SUBMIT_FIAT_PAYMENT, data)
        .then((res) => console.log(res.data));
      dispatch({
        type: SUBMIT_FIAT_PAYMENT,
        payload: fiat.data,
      });
    } catch (err) {}
  };
};

//Update User Details
export const updateUserDetails =
  ({ setFormData, formData, setUserUpdated, setShowProfileUpdateModal }) =>
  (dispatch) => {
    axios
      .put(profile.UPDATE_USER_DETAILS, formData)
      .then(async (res) => {
        await dispatch({
          type: UPDATE_USER_SUCCESS, // reducers are on reducers/auth.js file
          payload: res.data,
        });
        setUserUpdated && toast.success(res.data.msg);
        setUserUpdated && setUserUpdated(true);
        setShowProfileUpdateModal(false);
      })
      .catch((err) => {
        const errMsg = err?.response?.data?.msg || 'Oppps, Something wrong...';

        dispatch({
          type: UPDATE_USER_ERR, // reducers are on reducers/auth.js file
        });

        toast.error(errMsg);
        setUserUpdated && setUserUpdated(false);
        setShowProfileUpdateModal(false);
      });
  };

//Update Password
export const updatePassword =
  ({ formData, setFormData, initialvalues, setPasswordUpdated }) =>
  (dispatch) => {
    axios
      .put(profile.UPDATE_PASSWORD, formData)
      .then(async (res) => {
        await dispatch({
          type: UPDATE_PASSWORD_SUCCESS, // reducers are on reducers/auth.js file
          payload: res.data,
        });
        toast.success(res.data.msg);
        setPasswordUpdated(true);
        setFormData(initialvalues);
      })
      .catch((err) => {
        const errMsg = err?.response?.data?.msg || 'Oppps, Something wrong...';

        dispatch({
          type: UPDATE_PASSWORD_ERR, // reducers are on reducers/auth.js file
        });

        toast.error(errMsg);
        setPasswordUpdated(false);
      });
  };
//GET ALL TRANSACTIONS

export const AllTransactions = () => (dispatch) => {
  axios.get(profile.ALL_TRANSACTIONS).then((res) => {
    dispatch({ type: ALL_TRANSACTIONS, payload: res.data?.allTransaction });
  });
};

//Enable 2FA
export const enableGoogleAuth = () => (dispatch) => {
  axios
    .post(profile.ENABLE_GOOGLE_AUTH, {})
    .then((res) => {
      dispatch({
        type: ENABLE_2FA_SUCCESS, // reducers are on reducers/auth.js file
        payload: { googleAuth: res && res.data && res.data },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ENABLE_2FA_ERR, // reducers are on reducers/auth.js file
      });
    });
};

// Update Google Authentication Status
export const update2FaStatus =
  ({ status, setLoading }) =>
  async (dispatch) => {
    setLoading(true);
    axios
      .put(profile.UPDATE_GOOGLE_AUTH_STATUS, { status })
      .then(async (res) => {
        await dispatch({
          type: UPDATE_2FA_STATUS_SUCCESS,
          payload: { userDetails: res.data.data },
        });
        let successMessage = res?.data?.msg || res.message;
        alertToast(false, successMessage);
        setLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        let errorMessage = err?.response?.data?.msg || err.message;
        alertToast(true, errorMessage);
        dispatch({
          type: UPDATE_2FA_STATUS_ERR,
        });
      });
  };

//Get compliance tiers status of LoggedIn user

export const TierStatus = (history, setLoading) => (dispatch) => {
  setLoading(true);
  axios
    .get(profile.LOGGINED_USER_COMPLIANCE_TIER_STATUS)
    .then((res) => {
      dispatch({
        type: GET_TIER_STATUS_SUCCESS,
        payload: { tiersStatus: res.data && res.data.data },
      });
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
      dispatch({
        type: GET_TIER_STATUS_FAIL,
      });
      if (window.location.href.indexOf(browserRoute.BUY_TOKEN) !== -1) {
        // history.push(browserRoute.KYC_APPLICATION);
        history.push(browserRoute.BUY_TOKEN);
        alertToast(true, 'KYC ' + err.response.data.msg);
      }
    });
};

//Create Compliance tier1
export const CreateCompliance_Tier1 =
  (formData, history, setLoading) => (dispatch) => {
    setLoading(true);
    axios
      .post(KYC.CREATE_COMPLIANCE_TIER1, formData)
      .then((res) => {
        let successMessage = res?.data?.msg || res.message;
        alertToast(false, successMessage);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        let errorMessage = err?.response?.data?.msg || err.message;

        alertToast(true, errorMessage);
        setLoading(false);
      });
  };

//Get Compliance tier1

//get referral link
export const getReferralLink = () => (dispatch) => {
  axios
    .get(profile.GET_REFERRAL_LINK)
    .then((res) => {
      dispatch({
        type: GET_REFERRAL_LINK,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err, 'error response');
    });
};

export const addWallet = (data, setRes) => (dispatch) => {
  axios.put(profile.ADD_WALLET, data).then((res) => {
    toast.success('Wallet Added Successfully');
    setRes(res.data?.msg);
    dispatch({
      type: WALLET_DATA,
      payload: data,
    });
  });
};

export const GetCompliance_Tier1 =
  (id, history, setLoading, setData, data) => (dispatch) => {
    setLoading(true);
    axios
      .get(`${KYC.GET_COMPLIANCE_KYC_TIER1}/${id}`)
      .then((res) => {
        console.log('GetComplianceTier1-------->>>>', res.data);
        let successMessage = res?.data?.msg || res.message;
        axios
          .get(`${KYC.GET_COMPLIANCE_KYC_TIER2}/${id}`)
          .then((res2) => {
            setData({
              ...data,
              KycTier1: res.data.data.kycTier1,
              KycTier2: res2.data.data.kycTier2,
            });

            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            let errorMessage = err?.response?.data?.msg || err.message;

            setLoading(false);
          });
        // alertToast(false, successMessage);
      })
      .catch((err) => {
        console.log(err);
        let errorMessage = err?.response?.data?.msg || err.message;

        setLoading(false);
      });
  };
export const downloadWP = () => {
  axios({
    url: profile.DOWNLOAD_WHITE_PAPER, //your url
    method: 'GET',
    responseType: 'blob',
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'whitePaper.pdf'); //or any other extension
    document.body.appendChild(link);
    link.click();
  });
};
//referral wallet
export const referralWallet = () => (dispatch) => {
  axios
    .get(profile.FIRST_TRANSACTION)
    .then((res) => {
      axios
        .get(profile.REFERRAL_WALLET)
        .then((res) =>
          dispatch({
            type: REFERRAL_WALLET,
            payload: res.data?.data,
          })
        )
        .catch((err) => {
          dispatch({
            type: REFERRAL_WALLET,
            payload: {
              wallet_address: '0x0000000000000000000000000000000000000000',
              _id: '',
            },
          });
        });
    })
    .catch((err) => {
      dispatch({
        type: REFERRAL_WALLET,
        payload: {
          wallet_address: '0x0000000000000000000000000000000000000000',
          _id: '',
        },
      });
    });
};

//Air Drop Registered
export const AirDropRegistered = () => (dispatch) => {
  axios.get(profile.REGISTER_AIR_DROP).then((res) => console.log(res));
};
