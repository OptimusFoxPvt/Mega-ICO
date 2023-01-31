import React from "react";
import { Link } from "react-router-dom";
import { tokenName } from "../../TokenInfo";
import browserRoute from "./../../../Routes/browserRoutes";
import withMainLayout from "./../../HOC/withMainLayout";

const KycThankyou = () => {
  return (
    <div>
      <div className="page-header page-header-kyc">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-xl-7 text-center">
              <h2 className="page-title">Begin your ID-Verification</h2>
              <p className="large">
                Verify your identity to participate in tokensale.
              </p>
            </div>
          </div>
        </div>
        {/* <!-- .container --> */}
      </div>
      {/* // <!-- .page-header --> */}
      <div className="page-content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-9">
              <div className="kyc-status card mx-lg-4">
                <div className="card-innr">
                  <div className="status status-thank px-md-5">
                    <div className="status-icon">
                      <em className="ti ti-check"></em>
                    </div>
                    <span className="status-text large text-dark">
                      You have completed the process of KYC
                    </span>
                    <p className="px-md-5">
                      We are still waiting for your identity verification. Once
                      our team verified your indentity, you will be notified by
                      email. You can also check your KYC compliance status from
                      your profile page.
                    </p>
                    <Link to={browserRoute.PROFILE} className="btn btn-primary">
                      Back to Profile
                    </Link>
                  </div>
                </div>
              </div>
              {/* <!-- .card --> */}
              <p className="text-dark text-center mgmt-1x">
                If you have any question, please contact our support team{" "}
                <a href="#">info@{tokenName}.com</a>.
              </p>
              <div className="gaps-1x"></div>
              <div className="gaps-3x d-none d-sm-block"></div>
            </div>
          </div>
        </div>
        {/* <!-- .container --> */}
      </div>
      {/* // <!-- .page-content --> */}
    </div>
  );
};

export default withMainLayout(KycThankyou);
