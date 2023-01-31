import axios from 'axios';
import {
  SEND_KYC,
  REGISTER_MSG,
  REGISTER_FAIL,
  VERIFY_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  SET_AUTH_VERIFICATION,
  LOGIN_FAIL,
  LOGOUT,
  FORGET_MSG,
  FORGET_FAIL,
  FORGET_SUCCESS,
  RESET_SUCCESS,
  RESET_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  USER_LOADED_DATA,
  AUTH_ERROR_DATA,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERR,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERR,
  IS_EMAIL_AUTH_ON_SUCCESS,
  IS_EMAIL_AUTH_ON_ERR,
  IS_SMS_AUTH_ON_SUCCESS,
  IS_SMS_AUTH_ON_ERR,
  SET_CONTRACT_ADDRESS,
} from '../Redux/actions/types';
import { auth } from '../Routes/serverRoutes';
import { KYC } from '../Routes/serverRoutes';
import setAuthToken from '../utils/setAuthToken';
import { toast } from 'react-toastify';
import browserRoute from '../Routes/browserRoutes';

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

//Load User
export const loadUser = (id) => (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);
  let user = JSON.parse(localStorage.getItem('userDetails'));
  if (user) {
    dispatch({
      type: USER_LOADED_DATA,
      payload: { userDetails: user },
    });
  }
};
//Send KYC
export const sendKyc =
  ({ formData, history, setLoading }) =>
  (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    setLoading(true);
    axios.post(KYC.SEND_KYC, formData, config);
  };

//Register User
export const register =
  ({ formData, history, setLoading }) =>
  (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    setLoading(true);
    let url = window.location.href;
    axios
      .post(auth.SIGNUP + url.split('api/v1/auth/signup')[1], formData, config)
      .then(async (res) => {
        await dispatch({
          type: REGISTER_MSG,
          payload: res.data,
        });
        alertToast(false, res && res.data && res.data.msg && res.data.msg);
        setLoading(false);
        history.push(browserRoute.SIGNUP_SUCCESS);
      })
      .catch((err) => {
        setLoading(false);
        dispatch({
          type: REGISTER_FAIL,
        });

        const errorMsg =
          (err &&
            err.response &&
            err.response.data &&
            err.response.data.msg &&
            err.response.data.msg) ||
          err.message;
        alertToast(true, errorMsg);
      });
  };

//verify email after signup
export const verifyEmail = (formData, history) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let body = {
    token: formData,
  };
  axios
    .post(auth.VERIFY_EMAIL, body, config)
    .then(async (res) => {
      toast.success(res.data.msg);
      history.push(browserRoute.SIGNIN);
    })
    .catch((err) => {
      alertToast(true, err?.response?.data?.msg.split(',')[0]);
      setTimeout(() => {
        alertToast(
          false,
          'If you have already verified your email, Please sign in to continue'
        );
        history.push(browserRoute.SIGNIN);
      }, 2000);
    });
};

// Not in use yet
//Verify Email of User by using Verification Token
export const verifyUser =
  ({ verificationToken, email, history, setLoading }) =>
  (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ verificationToken, email });
    axios
      .post(auth.VERIFY_USER, body, config)
      .then(async (res) => {
        await dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
        // toast.success(res.data.msg);
        alertToast(false, res && res.data && res.data.msg && res.data.msg);
        history.push(browserRoute.LOGIN_USER);
        setLoading(false);
      })
      .catch((err) => {
        dispatch({
          type: VERIFY_FAIL,
        });
        setLoading(false);
      });
  };

//Login User
export const login =
  ({ formData, history, setVerificationPage, setLoading }) =>
  (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    setLoading(true);
    const body = JSON.stringify(formData);
    axios
      .post(auth.LOGIN, body, config)
      .then(async (res) => {
        if (res.data?.data?.isContractDeployed) {
          localStorage.setItem(
            'contractAddress',
            res.data.data.contract_address
          );
          dispatch({
            type: SET_CONTRACT_ADDRESS,
            payload: res.data.data.contract_address,
          });
        }
        if (res?.data?.data?.authentication) {
          let dispatchData = {
            msg: res.data.msg,
            authentication: res.data.data,
          };

          setVerificationPage({ googlePage: true });

          alertToast(false, res && res.data && res.data.msg && res.data.msg);
          dispatch({
            type: SET_AUTH_VERIFICATION,
            payload: { ...dispatchData },
          });
          setLoading(false);
        } else {
          await dispatch({
            type: LOGIN_SUCCESS,
            payload: {
              token: res?.data?.data?.token,
              userDetails: res?.data?.data?.user,
            },
          });
          setAuthToken(res?.data?.data?.token || null);
          setLoading(false);
          history.push(browserRoute.DASHBOARD);
          alertToast(false, res && res.data && res.data.msg && res.data.msg);
        }
      })

      .catch((err) => {
        setLoading(false);
        const errorMessage =
          (err &&
            err.response &&
            err.response.data &&
            err.response.data.msg &&
            err.response.data.msg) ||
          err.message;
        alertToast(true, errorMessage);
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };

//verify google 2f authentication
export const verifyGoogleAuthCode =
  ({ user, setVerificationPage, verificationCode, history, setLoading }) =>
  (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    setLoading(true);

    const data = JSON.stringify({ token: verificationCode, id: user });
    axios
      .post(auth.VERIFY_2F_GOOGLE, data, config)
      .then(async (res) => {
        if (res.status == 200) {
          setVerificationPage({
            googlePage: false,
          });
          setLoading(false);
          await dispatch({
            type: LOGIN_SUCCESS,
            payload: {
              token:
                res &&
                res.data &&
                res.data.data &&
                res.data.data.token &&
                res.data.data.token,
              userDetails:
                res &&
                res.data &&
                res.data.data &&
                res.data.data.user &&
                res.data.data.user,
            },
          });
          alertToast(false, res && res.data && res.data.msg && res.data.msg);
          setLoading(false);
          setAuthToken(
            res &&
              res.data &&
              res.data.data &&
              res.data.data.token &&
              res.data.data.token
          );
          history.push(browserRoute.DASHBOARD);
        }
      })
      .catch((err) => {
        setLoading(false);
        const errorMessage =
          (err && err.response && err.response.data && err.response.data.msg) ||
          'Server Error';
        alertToast(true, errorMessage);
      });
  };

//verify email 2f authentication
export const verifyEmailAuthCode =
  ({ user, setVerificationPage, verificationCode, history, setLoading }) =>
  (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data = JSON.stringify({ token: verificationCode, id: user });
    axios
      .post(auth.VERIFY_2F_EMAIL, data, config)
      .then(async (res) => {
        if (res.status == 200) {
          setVerificationPage({
            emailPage: false,
            smsPage: false,
            googlePage: false,
          });
          setLoading(false);
          await dispatch({
            type: LOGIN_SUCCESS,
            payload: {
              token:
                res &&
                res.data &&
                res.data.data &&
                res.data.data.token &&
                res.data.data.token,
              userDetails:
                res &&
                res.data &&
                res.data.data &&
                res.data.data.userDetails &&
                res.data.data.userDetails,
            },
          });
          alertToast(false, res && res.data && res.data.msg && res.data.msg);
          history.push(browserRoute.DASHBOARD);
        }
      })
      .catch((err) => {
        setLoading(false);

        const errorMessage =
          err && err.response && err.response.data && err.response.data.msg;
        alertToast(true, errorMessage);
      });
  };

//verify sms 2f authentication
export const verifySMSAuthCode =
  ({ user, setVerificationPage, verificationCode, history, requestId }) =>
  (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data = JSON.stringify({
      code: verificationCode,
      id: user,
      requestId,
    });
    axios
      .post(auth.VERIFY_2F_SMS, data, config)
      .then(async (res) => {
        if (res.status == 200) {
          setVerificationPage({
            emailPage: false,
            smsPage: false,
            googlePage: false,
          });
          await dispatch({
            type: LOGIN_SUCCESS,
            payload: {
              token:
                res &&
                res.data &&
                res.data.data &&
                res.data.data.token &&
                res.data.data.token,
              userDetails:
                res &&
                res.data &&
                res.data.data &&
                res.data.data.userDetails &&
                res.data.data.userDetails,
            },
          });
          alertToast(false, res && res.data && res.data.msg && res.data.msg);
          history.push(browserRoute.DASHBOARD);
        }
      })
      .catch((err) => {
        const errorMessage =
          err && err.response && err.response.data && err.response.data.msg;
        alertToast(true, errorMessage);
      });
  };

//Forget Password
export const forgetPassword =
  ({ formData, history }) =>
  (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ formData });
    axios
      .post(auth.FORGET_PASSWORD, formData, config)
      .then(async (res) => {
        toast.success(res.data.msg);
        await dispatch({
          type: FORGET_MSG,
          payload: res.data,
        });

        history.push(browserRoute.SIGNIN);
      })
      .catch((err) => {
        const errMsg = err?.response?.data?.msg || 'Oppps, Something wrong...';
        toast.error(errMsg);

        dispatch({
          type: FORGET_FAIL,
        });
      });
  };

//Verify Email of User For Forget Password by using Verification Token
export const verifyForget =
  ({ verificationToken, email, history, setLoading }) =>
  (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ verificationToken, email });
    axios
      .post(auth.VERIFY_FORGET, body, config)
      .then(async (res) => {
        if (res.data.status == 200) {
          toast.success(res.data.msg, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          await dispatch({
            type: FORGET_SUCCESS,
            payload: res.data,
          });
          history.push(browserRoute.RESET_PASSWORD + `?email=${email}`);
          setLoading(false);
        }
      })
      .catch((err) => {
        const errors =
          err && err.response && err.response.data && err.response.data.errors;
        const error =
          err && err.response && err.response.data && err.response.data.msg;
        dispatch({
          type: FORGET_FAIL,
        });
        setLoading(false);
      });
  };

//Reset Password
export const resetPasswordFunction =
  ({ data, history }) =>
  (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .post(auth.RESET_PASSWORD, data, config)
      .then(async (res) => {
        toast.success(res.data.msg);
        await dispatch({
          type: RESET_SUCCESS,
          payload: res.data,
        });

        history.push('/auth/signin');
      })
      .catch((err) => {
        const errMsg =
          err?.response?.data?.msg || 'Something happens, please try again';
        toast.error(errMsg);
        dispatch({
          type: RESET_FAIL,
        });
      });
  };

// Logout / Clear User
export const logout = (history) => async (dispatch) => {
  await dispatch({
    type: LOGOUT,
  });
  history.push(browserRoute.SIGNIN);
};

// update profile data
export const updateProfile =
  ({ formData, id, setFormData, setLoading }) =>
  (dispatch) => {
    axios
      .put(auth.UPDATE_PROFILE + `/users/${id}`, formData)
      .then(async (res) => {
        if (res.status === 200) {
          await dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: { userDetails: res.data.data },
          });
          setLoading(false);
          let successMessage = 'Profile update successfully';
          alertToast(false, successMessage);
          setFormData({
            fname: '',
            lname: '',
            contact_no: '',
            country: '',
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_PROFILE_ERR,
        });
        setLoading(false);
      });
  };

// IS_EMAIL_AUTH_ON User
export const emailAuthentiactionOn =
  (obj, { SetVerifySMS, SetVerifyGoogle, SetVerifyEmail, verifyEmail }) =>
  (dispatch) => {
    axios
      .put(auth.IS_EMAIL_AUTH_ON, obj)
      .then(async (res) => {
        if (res.status === 200) {
          await dispatch({
            type: IS_EMAIL_AUTH_ON_SUCCESS,
            payload: { userDetails: res.data.data },
          });
          let successMessage = (res && res.data.msg) || res.message;
          alertToast(false, successMessage);

          if (verifyEmail) {
            SetVerifyEmail(false);
            SetVerifySMS(false);
            SetVerifyGoogle(false);
          } else {
            SetVerifyEmail(true);
            SetVerifySMS(false);
            SetVerifyGoogle(false);
          }
        }
      })
      .catch((err) => {
        let errorMessage =
          (err &&
            err.response &&
            err.response.data &&
            err.response.data.msg &&
            err.response.data.msg) ||
          err.message;
        alertToast(true, errorMessage);
        dispatch({
          type: IS_EMAIL_AUTH_ON_ERR,
        });
      });
  };

// IS_SMS_AUTH_ON User
export const smsAuthentiactionOn =
  (obj, { SetVerifySMS, SetVerifyGoogle, SetVerifyEmail, verifySMS }) =>
  (dispatch) => {
    axios
      .put(auth.IS_SMS_AUTH_ON, obj)
      .then(async (res) => {
        if (res.status === 200) {
          await dispatch({
            type: IS_SMS_AUTH_ON_SUCCESS,
            payload: { userDetails: res.data.data },
          });
          let successMessage = (res && res.data && res.data.msg) || res.message;
          alertToast(false, successMessage);
          if (verifySMS) {
            SetVerifySMS(false);
            SetVerifyGoogle(false);
            SetVerifyEmail(false);
          } else {
            SetVerifySMS(true);
            SetVerifyGoogle(false);
            SetVerifyEmail(false);
          }
        }
      })
      .catch((err) => {
        let errorMessage =
          (err &&
            err.response &&
            err.response.data &&
            err.response.data.msg &&
            err.response.data.msg) ||
          err.message;
        alertToast(true, errorMessage);
        dispatch({
          type: IS_SMS_AUTH_ON_ERR,
        });
      });
  };

// Update password
export const updatePassword =
  ({ formData, setFormData, setLoading, setShow }) =>
  (dispatch) => {
    axios
      .put(auth.UPDATE_PASSWORD, formData)
      .then(async (res) => {
        if (res.status === 200) {
          await dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: { updatePassword: res.data.data },
          });
          let successMessage = (res && res.data && res.data.msg) || res.message;
          alertToast(false, successMessage);
          setFormData({
            currentPassword: '',
            Password: '',
          });
          setLoading(false);
          setShow(false);
        }
      })
      .catch((err) => {
        let errorMessage =
          (err &&
            err.response &&
            err.response.data &&
            err.response.data.msg &&
            err.response.data.msg) ||
          err.message;
        alertToast(true, errorMessage);
        dispatch({
          type: UPDATE_PASSWORD_ERR,
        });
        setLoading(false);
        setShow(false);
      });
  };
