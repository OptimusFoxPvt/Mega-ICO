import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import browserRoute from "../../Routes/browserRoutes";
import { WalletConnect } from "../../Redux/actions/actions";
import { tokenSymbol } from "../TokenInfo";
import { set } from "react-hook-form";
const TokenCalculation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [calculatedTokens, setCalculatedTokens] = useState(0);
  const [amount, setAmount] = useState(null);
  const [currency, setCurrency] = useState("ETH");
  const [showDropdown, setShowDropdown] = useState({
    profile: false,
    calculator: false,
    language: false,
    time: false,
  });
  const auth = useSelector((state) => state.auth);
  const valueOfToken = auth.tokenValue;
  const walletConnection = auth.walletConnection;
  const onChange = (e) => {
    let price = `${e.target.value.toLowerCase()}price`;
    setCurrency(e.target.value);
    if (price !== "usdprice") {
      setCalculatedTokens(
        (valueOfToken[price] / valueOfToken.ethprice) *
          (amount && amount >= 0 ? amount : 0)
      );
    }
    if (price !== "usdprice") {
      setCalculatedTokens(
        (valueOfToken?.number_tokens / valueOfToken[price]) *
          (amount && amount >= 0 ? amount : 0)
      );
    }
    if (price === "usdprice") {
      setCalculatedTokens(valueOfToken[price] * (amount ? amount : 0));
    }
    if (price === "usdprice") {
      setCalculatedTokens(
        (valueOfToken[price] / valueOfToken.ethprice) *
          valueOfToken?.number_tokens *
          (amount ? amount : 0)
      );
    }
    setShowDropdown({
      profile: false,
      calculator: !showDropdown.calculator,
      language: false,
      time: false,
    });
  };
  const buytoken = () => {
    if (walletConnection === "Connected") {
      history.push(browserRoute.BUY_TOKEN);
    }
    if (walletConnection === "Disconnected") {
      document.getElementById("CONNECTWALLET").click();
    }
  };
  return (
    <div className="col-xl-4 col-lg-5">
      <div className="token-calculator card card-full-height">
        <div className="card-innr">
          <div className="card-head">
            <h4 className="card-title">Token Calculation</h4>
            <p className="card-title-text">Enter amount to calculate token.</p>
          </div>
          <div className="token-calc">
            <div className="token-pay-amount">
              <input
                onChange={(e) => {
                  let price = `${currency.toLowerCase()}price`;
                  setAmount(e.target.value);
                  if (price !== "usdprice") {
                    setCalculatedTokens(
                      (valueOfToken[price] / valueOfToken.ethprice) *
                        (e.target.value && e.target.value >= 0
                          ? e.target.value
                          : 0)
                    );
                  }

                  if (price === "usdprice") {
                    console.log(
                      "tokenValue",
                      ((valueOfToken?.number_tokens
                        ? valueOfToken?.number_tokens
                        : 0) /
                        (valueOfToken?.ethprice ? valueOfToken?.ethprice : 1)) *
                        (valueOfToken?.usdprice ? valueOfToken?.usdprice : 1)
                    );
                    setCalculatedTokens(
                      ((Number(e.target.value) /
                        ((valueOfToken?.number_tokens
                          ? valueOfToken?.number_tokens
                          : 0) /
                          (valueOfToken?.ethprice
                            ? valueOfToken?.ethprice
                            : 1))) *
                        (valueOfToken?.usdprice ? valueOfToken?.usdprice : 1)) /
                        10000
                    );
                  }
                }}
                id="token-base-amount"
                className="input-bordered input-with-hint"
                type="text"
                min="0"
                value={amount}
              />
              <div className="token-pay-currency">
                <a
                  // href="#"
                  className="link ucap link-light toggle-tigger toggle-caret"
                  onClick={() =>
                    setShowDropdown({
                      profile: false,
                      calculator: !showDropdown.calculator,
                      language: false,
                      time: false,
                    })
                  }
                >
                  {currency}
                </a>
                {showDropdown.calculator && (
                  <div className="toggle-className dropdown-content">
                    <ul className="dropdown-list">
                      <li>
                        <a value="ETH">
                          <option
                            onClick={onChange}
                            style={{ cursor: "pointer" }}
                          >
                            ETH
                          </option>
                        </a>
                      </li>
                      <li>
                        <a value="BTC">
                          <option
                            onClick={onChange}
                            style={{ cursor: "pointer" }}
                          >
                            BTC
                          </option>
                        </a>
                      </li>
                      <li>
                        <a value="LTC">
                          <option
                            onClick={onChange}
                            style={{ cursor: "pointer" }}
                          >
                            LTC
                          </option>
                        </a>
                      </li>
                      <li>
                        <a value="USD">
                          <option
                            onClick={onChange}
                            style={{ cursor: "pointer" }}
                          >
                            USD
                          </option>
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="token-received">
              <div className="token-eq-sign">=</div>
              <div className="token-received-amount">
                <h5 className="token-amount">{calculatedTokens.toFixed(4)}</h5>
                <div className="token-symbol">{tokenSymbol}</div>
              </div>
            </div>
          </div>
          <div className="token-calc-note note note-plane">
            <em className="fas fa-info-circle text-dark"></em>
            <span className="note-text text-dark">
              Amount calculated based current tokens price
            </span>
          </div>
          <div className="token-buy">
            <button onClick={buytoken} className="btn btn-primary">
              Buy Tokens
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenCalculation;
