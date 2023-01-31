import React, { useState, useEffect, useRef } from "react";
import GoogleAuthQRModal from "./GoogleAuthQRModal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { enableGoogleAuth } from "../../../Redux/actions/actions";
import { update2FaStatus } from "../../../Redux/actions/actions";

const GoogleAuthentication2 = () => {
  const auth = useSelector((state) => state.auth);
  const [status, setStatus] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStatus(auth.userDetails.is_google_authentication_on);
  }, [auth.userDetails]);
  const [showGoogleAuthQRcode, setShowGoogleAuthQRcode] = useState(false); // It shows QRcode modal
  const dispatch = useDispatch();

  const enable2FaModal = (e) => {
    e.preventDefault();
    setShowGoogleAuthQRcode(true);
    dispatch(enableGoogleAuth());
  };
  const disable2FaModal = (e) => {
    e.preventDefault();
    dispatch(update2FaStatus({ status: false, setLoading }));
  };
  const ref = useRef(null);

  return (
    <div className="card-innr">
      <div className="card-head">
        <h4 className="card-title">Two-Factor Verification</h4>
      </div>
      <p>
        Two-factor authentication is a method for protection your web account.
        When it is activated you need to enter not only your password, but also
        a special code. You can receive this code by in mobile app. Even if
        third person will find your password, then can't access with that code.
      </p>

      <div className="d-sm-flex justify-content-between align-items-center pdt-1-5x">
        <span className="text-light ucap d-inline-flex align-items-center">
          <span className="mb-0">
            <small>Current Status:</small>
          </span>
          <span className="badge badge-disabled ml-2">
            {status ? <span>Enabled</span> : <span>Disabled</span>}
          </span>
        </span>
        <div className="gaps-2x d-sm-none"></div>
        {status !== undefined && status ? (
          <>
            <button
              class="order-sm-first btn btn-primary b-button-hovereffect"
              onClick={disable2FaModal}
            >
              <span>
                Disable 2FA
                {loading ? (
                  <>
                    <i
                      class="spinner-border text-light ml-3"
                      style={{ width: "20px", height: "20px" }}
                      role="status"
                    >
                      <span class="sr-only"></span>
                    </i>
                  </>
                ) : null}
              </span>
            </button>
          </>
        ) : !status ? (
          <>
            <button
              class="order-sm-first btn btn-primary b-button-hovereffect"
              onClick={enable2FaModal}
            >
              <span>Enable 2FA</span>
            </button>
          </>
        ) : null}
      </div>
      <GoogleAuthQRModal
        showGoogleAuthQRcode={showGoogleAuthQRcode}
        setShowGoogleAuthQRcode={setShowGoogleAuthQRcode}
        // googleQRcodeUrl={googleQRcodeUrl}
      />
    </div>
  );
  {
    /* <!-- .card-innr --> */
  }
};

export default GoogleAuthentication2;
