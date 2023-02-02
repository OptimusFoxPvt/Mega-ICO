import { useSelector } from "react-redux";
import { tokenSymbol } from "../TokenInfo";
const PreSaleTokens = () => {
  const valueOfToken = useSelector((state) => state.auth.tokenValue);
  const coin = useSelector((state) => state.auth.coindata);
  return (
    <div className="card-innr">
      <div className="card-head">
        <h5 className="card-title card-title-sm">Pre-Sale Token Sales</h5>
      </div>
      <div className="token-rate-wrap row">
        <div className="token-rate col-md-6 col-lg-12">
          <span className="card-sub-title">{coin.symbol} Token Price</span>
          <h4 className="font-mid text-dark">
            1 ETH ={" "}
            <span>
              {1} {tokenSymbol}
              {/* {valueOfToken?.ethtotoken?.toFixed(3)} {tokenSymbol} */}
            </span>
          </h4>
        </div>
        <div className="token-rate col-md-6 col-lg-12">
          <span className="card-sub-title">Exchange Rate</span>
          {/* <span>
            1 ETH = {valueOfToken?.priceeth?.toFixed(2)} USD ={" "}
            {(
              valueOfToken?.priceeth /
              ((valueOfToken?.number_tokens * 100) / valueOfToken?.btcprice)
            ).toFixed(3)}
            BTC
          </span> */}
          <span>1 ETH = 3100 USD = 0.1 BTC</span>
        </div>
      </div>
      <div className="token-bonus-current">
        <div className="fake-className">
          <span className="card-sub-title">Current Bonus</span>
          <div className="h3 mb-0">20 %</div>
        </div>
        <div className="token-bonus-date">
          End at <br />
          10 Jan, 2019
        </div>
      </div>
    </div>
  );
};

export default PreSaleTokens;
