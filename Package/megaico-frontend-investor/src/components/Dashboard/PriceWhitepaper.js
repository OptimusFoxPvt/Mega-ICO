import logoFox from "../../assets/images/Fox.svg";
import { useDispatch, useSelector } from "react-redux";
import { downloadWP } from "../../Redux/actions/actions";
import { tokenSymbol, tokenNameF } from "../TokenInfo";
const PriceWhitepaper = () => {
  const dispatch = useDispatch();

  const valueOfToken = useSelector((state) => state.auth.tokenValue);
  // const EthToTWZ = (1).toFixed(3);
  const EthToTWZ = (
    (valueOfToken?.number_tokens ? valueOfToken?.number_tokens : 0) /
    (valueOfToken?.ethprice ? valueOfToken?.ethprice : 1)
  ).toFixed(3);
  const EthToUsd = (
    ((valueOfToken?.number_tokens ? valueOfToken?.number_tokens : 0) /
      (valueOfToken?.ethprice ? valueOfToken?.ethprice : 1)) *
    (valueOfToken?.usdprice ? valueOfToken?.usdprice : 1)
  ).toFixed(2);
  return (
    // <div className='col-lg-8'>
    //   <div className='token-information card card-full-height'>
    //     <div className='row no-gutters height-100'>
    //       <div className='col-md-6 text-center'>
    //         <div className='token-info'>
    //           <img className='token-info-icon' src={logoFox} alt='logo-sm' />
    //           <div className='gaps-2x'></div>

    //           <h4 className='token-info-head'>
    //             1 ETH ={EthToTWZ}
    //             {' ' + tokenSymbol}
    //           </h4>
    //           <h5 className='token-info-sub text-dark'>
    //             1 ETH = <strong>$</strong>
    //             {EthToUsd}
    //           </h5>
    //         </div>
    //       </div>
    //       <div className='col-md-6'>
    //         <div className='token-info bdr-tl'>
    //           <div>
    //             <ul className='token-info-list'>
    //               <li>
    //                 <span>Token Name:</span>
    //                 {tokenNameF}
    //               </li>
    //               <li>
    //                 <span>Ticket Symbol:</span>
    //                 {tokenSymbol}
    //               </li>
    //             </ul>
    //             <button
    //               onClick={() => dispatch(downloadWP)}
    //               className='btn btn-primary'
    //             >
    //               <em className='fas fa-download mr-3'></em>Download Whitepaper
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   {/* <!-- .card --> */}
    // </div>

    //new design ====================================

    <div className="col-lg-9">
      <div
        className="token-information card card-full-height b-border"
        style={{ border: "1px solid #C4C4C4" }}
      >
        <div className="row no-gutters height-100">
          <div className="col-md-6 text-center">
            <div className="token-info">
              <img className="token-info-icon" src={logoFox} alt="logo-sm" />
              <div className="gaps-2x"></div>
              <div>
                <h1 className="token-info-head text-light">
                  1 ETH = {EthToTWZ} {" " + tokenSymbol}
                </h1>
                <h5 className="token-info-sub">1 ETH ={EthToUsd} USD</h5>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="token-info">
              <div>
                <ul className="token-info-list d-flex ">
                  <li style={{ flexDirection: "column", display: "flex" }}>
                    <span>Token Name:</span> {tokenNameF}
                  </li>
                  <li style={{ flexDirection: "column", display: "flex" }}>
                    <span>Ticket Symbol:</span>
                    <img src={logoFox} style={{ width: "30px" }} alt="" />
                  </li>
                </ul>
                <button
                  onClick={() => dispatch(downloadWP)}
                  className="btn button-color b-button-hovereffect"
                >
                  <em className="fas fa-download mr-3"></em>Download Whitepaper
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PriceWhitepaper;
