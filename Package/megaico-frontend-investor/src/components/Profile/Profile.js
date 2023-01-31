import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileDetails from "./ProfileDetails/ProfileDetails";
import browserRoute from "./../../Routes/browserRoutes";
import withMainLayout from "./../HOC/withMainLayout";
import GoogleAuthentication from "./GoogleAuthentication/GoogleAuthentication";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
// import { addWallet } from "../../Redux/actions/actions";
import WalletModal from "../BuyToken/Modals/WalletModal";
import { tokenSymbol } from "../TokenInfo";
import TokenBalance from "../Dashboard/TokenBalance";
import PreSaleTokens from "../IcoDistribution/PreSaleTokens";
import TokenSaleProgress from "../Dashboard/TokenSaleProgress/TokenSaleProgress";
const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const kycStatus = auth.kycStatus;
  const walletData = auth.walletData;
  const genReferralLink = auth.referralLink;

  const kycResponse = `KYC ${kycStatus}`;
  return (
    <div className="page-content">
      <div className="container-fluid">
        <h4 className="card-title">Profile Details</h4>

        <div className="row">
          <div className="main-content col-lg-9">
            <div class="modal fade" id="add-wallet">
              <WalletModal />
            </div>

            <ProfileDetails />
            {/* <!-- .card --> */}
            <div className="content-area card">
              {/* <GoogleAuthentication /> */}
            </div>
            {/* <!-- .card --> */}
            {/* <!-- .col --> */}
            <div class="row">
              <div className="col-lg-6">
                <div className="card-innr card b-coloumn">
                  <div className="card-head">
                    <h6 className="card-title card-title-md">
                      Your Account Status
                    </h6>
                    <ul className="btn-grp">
                      <li>
                        <a
                          href="#"
                          className="schedule-bonus b-button-hovereffect"
                        >
                          Email Verified
                        </a>
                      </li>
                      <li>
                        <button
                          className="b-btn-outline b-button-hovereffect"
                          // onClick={() => {
                          //   if (kycResponse == "KYC Not Submitted") {
                          //     history.push(browserRoute.KYC_APPLICATION);
                          //   }
                          // }}
                          // className={`btn btn-auto btn-sm btn-${
                          //   kycResponse == "loading"
                          //     ? "warning"
                          //     : kycResponse == "KYC approved"
                          //     ? "success"
                          //     : kycResponse == "KYC rejected"
                          //     ? "danger"
                          //     : kycResponse == "KYC Not Submitted"
                          //     ? "warning"
                          //     : "info"
                          // }`}
                        >
                          {/* {kycResponse === "KYC undefined"
                            ? "KYC pending"
                            : kycResponse} */}
                          KYC Pending
                        </button>
                      </li>
                    </ul>
                    <div className="gaps-2-5x"></div>
                    <h6 className="card-title card-title-sm">
                      Receiving Wallet
                    </h6>
                    <div className="d-flex justify-content-between">
                      <span>
                        <span>
                          {"0x3f5cBcD662B94CdCb904f513A5599A618a1d9012".substring(
                            0,
                            7
                          ) +
                            "...." +
                            "0x3f5cBcD662B94CdCb904f513A5599A618a1d9012".substring(
                              35,
                              42
                            )}
                        </span>
                        <em
                          className="fas fa-info-circle text-exlight"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title={`1 ETH = 1250 ${tokenSymbol}`}
                        ></em>
                      </span>
                      <a
                        href="#"
                        data-toggle="modal"
                        data-target="#add-wallet"
                        className="link link-ucap"
                      >
                        Edit
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card-innr card b-coloumn">
                  <h6 className="card-title card-title-sm">
                    Earn with Referral
                  </h6>
                  <p className="pdb-0-5x">
                    Invite your friends &amp; family and receive a
                    <strong>
                      <span className="text-primary"> bonus - 15%</span> of the
                      value of contribution.
                    </strong>
                  </p>
                  <div className="copy-wrap mgb-0-5x">
                    <span className="copy-feedback"></span>
                    <em className="fas fa-link"></em>
                    <input
                      type="text"
                      className="copy-address"
                      value={
                        genReferralLink?.referral
                          ? genReferralLink?.referral?.referral_link
                          : "SUBMIT YOUR KYC"
                      }
                      disabled
                    />
                    <button
                      className="copy-trigger copy-clipboard"
                      data-clipboard-text={
                        genReferralLink?.referral?.referral_link
                      }
                    >
                      <em className="ti ti-files"></em>
                    </button>
                  </div>
                  {/* <!-- .copy-wrap --> */}
                </div>
              </div>
              <div class="col-lg-12 ">
                <div class="card-innr card">
                  <div class="card-head">
                    <h5 class="card-title card-title-md">
                      Identity Verification - KYC
                    </h5>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <p>
                      To comply with regulation, participant will have to go
                      through indentity verification.
                    </p>
                    <div>
                      <a
                        style={{ width: "255px" }}
                        href="#"
                        class="btn b-button-color b-button-hovereffect"
                      >
                        Secondary
                      </a>
                      <p
                        style={{
                          color: "rgba(255, 0, 0, 1)",
                          marginTop: "10px",
                        }}
                      >
                        * KYC verification required for purchase token
                      </p>
                    </div>
                  </div>
                </div>
                <div class="content-area card">
                  <GoogleAuthentication />
                </div>
              </div>
              {!kycResponse === "KYC approved" && (
                <div className="kyc-info card">
                  <div className="card-innr">
                    <h6 className="card-title card-title-sm">
                      Identity Verification - KYC
                    </h6>
                    <p>
                      To comply with regulation, participant will have to go
                      through indentity verification.
                    </p>
                    <p className="lead text-light pdb-0-5x">
                      You have not submitted your KYC application to verify your
                      indentity.
                    </p>
                    <Link
                      to={browserRoute.KYC_APPLICATION}
                      className="btn btn-primary btn-block"
                    >
                      Click to Proceed
                    </Link>
                    <h6 className="kyc-alert text-danger">
                      * KYC verification required for purchase token
                    </h6>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* <!-- .col --> */}
          <div class="aside sidebar-right col-lg-3">
            <TokenBalance />
            <div class="token-sales ">
              <div class="card-innr b-background-card">
                <PreSaleTokens />
              </div>
            </div>
            <div class="card-innr b-background-card">
              <TokenSaleProgress />
            </div>
          </div>
        </div>
        {/* <!-- .container --> */}
      </div>
    </div>
  );
};

export default withMainLayout(Profile);
