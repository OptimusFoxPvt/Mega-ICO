import React, { useEffect, useState } from "react";
import withMainLayout from "./../HOC/withMainLayout";
import TokenSaleProgress from "./TokenSaleProgress/TokenSaleProgress";
import TokenBalance from "./TokenBalance";
import TokenCalculation from "./TokenCalculation";
import PriceWhitepaper from "./PriceWhitepaper";
import Transactions from "./Transactions";
import SaleGraph from "./TokenSaleGraph";
const Dashboard = () => {
  return (
    <div class="page-content">
      <div class="container-fluid">
        <h2
          class="b-card-headpadding"
          style={{ color: "#252726", fontWeight: "600" }}
        >
          Overview
        </h2>
        <div className="row">
          <div class="col-lg-3">
            <TokenBalance />
          </div>
          <PriceWhitepaper />
          {/* <!-- .col --> */}
          {/* <!-- .col --> */}
          <Transactions />
          <TokenCalculation />
        </div>
        {/* <!-- .row --> */}
        <div className="row">
          <SaleGraph />
          {/* <!-- .col --> */}
          <div className="col-xl-4 col-lg-5">
            <div className="token-sales card card-full-height">
              <TokenSaleProgress />
            </div>
          </div>
        </div>
        {/* <!-- .row --> */}
      </div>
    </div>
  );
};

export default withMainLayout(Dashboard);
