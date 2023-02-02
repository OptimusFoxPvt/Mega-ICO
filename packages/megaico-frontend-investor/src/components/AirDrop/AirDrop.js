import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import withMainLayout from "../HOC/withMainLayout";
import styles from "./AirDrop.module.css";
import { applyForAirdrop } from "../../Redux/actions/actions";
import { AirDropData } from "../../Redux/actions/actions";
import Countdown from "../Dashboard/TokenSaleProgress/countdown";
import { setCount } from "../Dashboard/TokenSaleProgress/SetCountDown";
import { Redirect } from "react-router";
import browserRoute from "../../Routes/browserRoutes";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
const AirDrop = () => {
  const KYCstatus = useSelector((state) => state.auth.kycStatus);
  const walletConnection = useSelector((state) => state.auth.walletConnection);
  const Address = useSelector((state) => state.auth.walletData);
  const airDropData = useSelector((state) => state.auth.airDropData);
  const countDownDate = Number(airDropData && airDropData.ClosingTime + "000");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AirDropData());
  }, []);
  const ApplyForAirDrop = () => {
    walletConnection !== "Connected"
      ? toast.error("Connect Wallet")
      : dispatch(applyForAirdrop(Address.wallet_address));
  };
  return KYCstatus === "loading" ? (
    <Loader />
  ) : (
    <>
      {KYCstatus === "approved" ? (
        <div className="page-content mt-3">
          <div className="container">
            <div className="card content-area">
              {airDropData?.open ? (
                <div className="card-innr">
                  <div class="card-body" style={{ textAlign: "center" }}>
                    <div className="card-head">
                      <h1 class="card-title">
                        Register yourself now to get free GEMMS !
                      </h1>
                    </div>

                    <button
                      onClick={ApplyForAirDrop}
                      className="btn btn-primary"
                    >
                      PARTICPATE AIRDROP
                    </button>
                  </div>
                  <div className="col-12">
                    {airDropData.ClosingTime && (
                      <Countdown countDownDate={countDownDate} />
                    )}
                  </div>
                </div>
              ) : (
                <div className="card-innr">
                  <div class="card-body" style={{ textAlign: "center" }}>
                    <div className="card-head">
                      <h1 class="card-title">
                        AIR DROP HAS NOT BEEN STARTED YET
                      </h1>
                      <p>PLEASE KEEP VISITING FOR UPDATES</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          {" "}
          <Redirect
            to={{
              pathname: browserRoute.KYC_APPLICATION,
            }}
          />
        </>
      )}
    </>
  );
};

export default withMainLayout(AirDrop);
