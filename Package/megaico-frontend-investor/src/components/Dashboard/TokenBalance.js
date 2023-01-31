import React from "react";
import logoFox from "../../assets/images/Fox.svg";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTokenValue } from "../../Redux/actions/actions";
import { tokenSymbol } from "../TokenInfo";
const TokenBalance = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.auth.transactionLists);
  const valueOfToken = useSelector((state) => state.auth.tokenValue);
  console.log("valueOfToken", valueOfToken);
  let tokens = transactions
    .map((t) => t.tokens)
    ?.reduce((value, item) => item + value, 0);
  useEffect(() => {
    dispatch(getTokenValue());
  }, []);

  return (
    <div className="token-statistics card card-token height-auto">
      <div className="card-innr">
        <div className="token-balance token-balance-with-icon">
          <div className="token-balance-icon">
            <img src={logoFox} alt="logo" />
          </div>
          <div className="token-balance-text">
            <h6 className="card-sub-title">Tokens Balance</h6>
            <span className="lead">
              {tokens.toFixed(3)}
              {/* {valueOfToken.number_tokens ? valueOfToken.number_tokens : 0} */}
              <span>{" " + tokenSymbol}</span>
            </span>
          </div>
        </div>
        <div className="token-balance token-balance-s2">
          <h6 className="card-sub-title">Your Contribution</h6>
          <ul className="token-balance-list">
            <li className="token-balance-sub">
              <span className="lead">
                {/* {valueOfToken.ethprice ? valueOfToken.ethprice?.toFixed(3) : 0} */}
                {tokens.toFixed(3)}
              </span>
              <span className="sub">ETH</span>
            </li>
            <li className="token-balance-sub">
              <span className="lead">
                {/* {valueOfToken?.btcprice ? valueOfToken?.btcprice.toFixed(3) : 0} */}
                {valueOfToken.btcprice
                  ? (
                      (valueOfToken.btcprice * tokens) /
                      valueOfToken.ethprice
                    ).toFixed(3)
                  : 0}
              </span>
              <span className="sub">BTC</span>
            </li>
            <li className="token-balance-sub">
              <span className="lead">
                {/* {valueOfToken?.ltcprice ? valueOfToken?.ltcprice.toFixed(3) : 0} */}
                {valueOfToken.ltcprice
                  ? (
                      (valueOfToken.ltcprice * tokens) /
                      valueOfToken.ethprice
                    ).toFixed(3)
                  : 0}
              </span>
              <span className="sub">LTC</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TokenBalance;
