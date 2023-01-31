import axios from 'axios';
import {
  TRANSACTION_LIST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERR,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERR,
  ENABLE_2FA_SUCCESS,
  ENABLE_2FA_ERR,
  UPDATE_2FA_STATUS_SUCCESS,
  UPDATE_2FA_STATUS_ERR,
  GET_ALL_USERS_FAIL,
  GET_KYC_LIST,
  UPDATE_KYC_LIST,
  GET_TOKEN_VALUE,
  BOUNTY_LIST,
  GET_SINGLE_USER_SUCCESS,
  GET_SINGLE_USER_FAIL,
} from '../Redux/actions/types';
import { profile } from '../Routes/serverRoutes';
import { KYC, users } from '../Routes/serverRoutes';
import { toast } from 'react-toastify';

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
export const transactionList = (setTransactions) => (dispatch) => {
  axios
    .get(profile.TRANSACTION_LIST)
    .then((res) => {
      dispatch({
        type: TRANSACTION_LIST,
        payload: res.data?.allTransaction,
      });
      setTransactions(res.data?.allTransaction);
    })
    .catch((err) => {
      console.log(err, 'error response');
    });
};

//Update User Details
export const updateUserDetails =
  ({ formData, setUserUpdated }) =>
  (dispatch) => {
    axios
      .put(profile.UPDATE_USER_DETAILS, formData)
      .then(async (res) => {
        await dispatch({
          type: UPDATE_USER_SUCCESS, // reducers are on reducers/auth.js file
          payload: res.data,
        });
        toast.success(res.data.msg);
        setUserUpdated(true);
      })
      .catch((err) => {
        const errMsg = err?.response?.data?.msg || 'Oppps, Something wrong...';

        dispatch({
          type: UPDATE_USER_ERR, // reducers are on reducers/auth.js file
        });

        toast.error(errMsg);
        setUserUpdated(false);
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
        console.log(res);
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

export const GetAllUsers = (setUsersData, setLoading) => (dispatch) => {
  setLoading(true);
  axios
    .get(users.GET_ALL_USERS)
    .then((res) => {
      setLoading(false);
      let array1 = [...res.data?.User_data];
      let array2 = [...res.data?.Kyc_data];
      array2.forEach((element) => {
        element._id = element.user;
      });

      setUsersData(
        array1.map((obj) => array2.find((o) => o._id === obj._id) || obj)
      );
    })
    .catch((err) => {
      setLoading(false);
      let errorMessage = err?.response?.data?.msg || err.message;
      alertToast(true, errorMessage);
      dispatch({
        type: GET_ALL_USERS_FAIL,
      });
    });
};
export const getSingleUser = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(users.GET_SINGLE_USER_DETAILS + `${id}`);
    dispatch({ type: GET_SINGLE_USER_SUCCESS, payload: data });
  } catch (err) {
    const errMsg = err?.response?.data?.msg || 'Oppps, Something wrong...';
    dispatch({
      type: GET_SINGLE_USER_FAIL,
    });
    toast.error(errMsg);
  }
};
export const GetRecentUsers = (setUsers) => (dispatch) => {
  axios
    .get(users.GET_RECENT_USERS)
    .then((res) => {
      console.log(res.data);
      setUsers(res.data?.data);
    })
    .catch((err) => {});
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
      console.log(err);
    });
};

//get all kyc
export const GetKYCLists = () => (dispatch) => {
  axios
    .get(KYC.GET_KYC_LIST)
    .then((res) => {
      dispatch({
        type: GET_KYC_LIST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
//kyc approval
export const KYCApproval = (action, id) => (dispatch) => {
  const status = { status: action, id: id };
  console.log(status);
  axios
    .put(KYC.STATUS_KYC_LIST, status)
    .then((res) => {
      console.log(res.data);
      dispatch(GetKYCLists());
      toast.info(res.data.msg);
    })
    .catch((err) => {
      console.log('here');
      toast.error(err.response.data.msg);
    });
};

//bounty List
export const BountyList = () => (dispatch) => {
  axios.get(profile.GET_BOUNTY_LIST).then((res) =>
    dispatch({
      type: BOUNTY_LIST,
      payload: res.data?.data,
    })
  );
};

//bounty approval
export const BountyApproval = (id, action) => (dispatch) => {
  const data = { status: action, id: id };
  console.log(data);
  axios.post(profile.APPROVE_BOUNTY, data).then((res) => {
    dispatch(BountyList());
    action === 'approved'
      ? toast.success(`${action}`)
      : toast.error(`${action}`);
  });
};
//downloading white paper
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

//Save Bounty Transaction
export const saveTransaction = (id, tokens, d, time, Address) => {
  return (dispatch) => {
    const data = {
      user: id,
      wallet_from: Address,
      transaction_hash: d.transactionHash,
      eth: '0',
      tokens: tokens,
      transaction_id: '00000000',
      transaction_time: time,
      transaction_type: 'bonus',
    };
    console.log(data, 'save transaction data');
    try {
      axios.post(profile.SAVE_TRANSACTION, data).then((response) => {
        console.log('saved transaction', response);
        toast.success('TRANSACTION SAVED');
      });
    } catch (err) {
      toast.success('TRANSACTION NOT SAVED');
    }
  };
};

//Get AirDrop List
export const airDropList = (setTransactions) => (dispatch) => {
  axios.get(profile.AIR_DROP_LIST).then((res) => {
    setTransactions(res.data?.data);
  });
};

//Save AirDrop approval
export const AirDropStatus = (d, tokens, send, Address) => (dispatch) => {
  let time = new Date();
  d.forEach((i) => {
    const data = { status: 'approved', id: i._id };
    axios.post(profile.AIR_DROP_STATUS, data).then((res) => {
      dispatch(saveTransaction(i.user, tokens, send, time, Address));
    });
  });
};
