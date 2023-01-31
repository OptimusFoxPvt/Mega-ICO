import React from "react";
import withMainLayout from "./../HOC/withMainLayout";
import Referral from "./Referral";
import PreSaleTokens from "./PreSaleTokens";
import TokenBalance from "../Dashboard/TokenBalance";
import TokenSaleProgress from "../Dashboard/TokenSaleProgress/TokenSaleProgress";
import IcoStage from "./ICOStage";
import ReferralModal from "./ReferralModal";
const IcoDistribution = () => {
  return (
    <div className="page-content">
      <div className="container">
        <div className="row">
          <div className="main-content pl-4 col-lg-9 col-12 col-sm-12">
            <IcoStage />
            <Referral />
            <ReferralModal />
          </div>
          {/* <!-- .col --> */}
          <div className="aside sidebar-right col-lg-3 mt-4">
            <TokenBalance />
            <div className="token-sales">
              <div className="b-background-card">
                <PreSaleTokens />
              </div>
            </div>
            {/* <div className="sap"></div> */}
            <div className="b-background-card">
              <TokenSaleProgress />
            </div>
          </div>
          {/* <!-- .col --> */}
        </div>
        {/* <!-- .container --> */}

        {/* <!-- .container --> */}
      </div>
    </div>
  );
};

export default withMainLayout(IcoDistribution);
