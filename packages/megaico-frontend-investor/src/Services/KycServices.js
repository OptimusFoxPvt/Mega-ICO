import axios from "axios";
import { SUBMIT_KYC, KYC_STATUS } from "../Redux/actions/types";
import { getReferralLink } from "../Redux/actions/actions";
import { toast } from "react-toastify";
import { KYC } from "../Routes/serverRoutes";
import browserRoute from "../Routes/browserRoutes";
import { updateUserDetails } from "./profileServices";
//alert toast
const alertToast = (error, message) => {
  if (!error) {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export const SubmitKyc = (setLoading, body, data, history) => {
  return (dispatch) => {
    axios
      .post(KYC.SUBMIT_KYC, body)
      .then((res) => {
        dispatch({
          type: SUBMIT_KYC,
          payload: res.data,
        });
        dispatch(updateUserDetails(data));
        setLoading(false);
        toast.success(
          "KYC request has been submitted. Please wait for the approval."
        );
        history.push(browserRoute.KYC_THANKYOU);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(
          err && err.response && err.response.data && err.response.data.msg
        );
      });
  };
};

export const KycStatus = (setLoading) => (dispatch) => {
  axios.get(KYC.GET_KYC_STATUS).then((res) => {
    dispatch({
      type: KYC_STATUS,
      payload: res.data,
    });

    res.data?.data?.kyc_status === "approved" && dispatch(getReferralLink());
    setLoading(false);
  });
};
