import { tokenName, tokenNameF, tokenSymbol } from '../TokenInfo';
import { useSelector } from 'react-redux';
export const getHoursMinutes = (t) => {
  let dt = new Date(t);
  let h = dt.getHours();
  let m = dt.getMinutes();
  m = m.toString();
  m = m.length < 2 ? '0' + m : m;
  return h > 12
    ? h - 12 + ':' + m + ' PM'
    : h === 12
    ? h + ':' + m + ' PM'
    : h + ':' + m + ' AM';
};
const getDate = (t) => {
  return new Date(t).toString().substring(0, 15) + ' ' + getHoursMinutes(t);
};
const IcoStage = () => {
  const tokenData = useSelector((state) => state.auth.tokenData);
  console.log('tokenDtata', tokenData);
  return (
    <>
      {/* new design ========================== */}
      <div class='card-head b-card-headpadding'>
        <h4 class='card-title'>ICO Distribution</h4>
      </div>
      {/* <div class="row"> */}
      {/* <div class="main-content col-lg-9"> */}
      <div class='content-area card'>
        <div class='card-innr'>
          <div class='card-text'>
            <h4 class='card-title'>Two Factors Authorization</h4>
            <p>
              To become a part of {tokenNameF} project, you can found all
              details of ICO. <br class='d-none d-sm-block' /> You can
              contribute and <a href='#'>buy {tokenSymbol} tokens</a>.
            </p>
            <p>
              You can get a quick response and chat with our team in Telegram:{' '}
              <a href='#'>htts://t.me/{tokenName}</a>
            </p>
          </div>
          <div class='gaps-3x'></div>
          <div class='card-head'>
            <h5 class='card-title card-title-md'>ICO Schedule</h5>
          </div>
          <div class='schedule-item'>
            <div class='row'>
              <div class='col-lg-6 pb-3'>
                <div class=' b-border-right'>
                  <div class='pdb-1x pb-4 '>
                    <h5 class='schedule-title'>
                      <span>Pre-Sale ICO</span>
                      <span
                        className={`badge badge-${
                          tokenData?.preIcoHasClosed ? 'danger' : 'success'
                        } ucap badge-xs`}
                      >
                        {tokenData?.preIcoHasClosed ? 'Expired' : 'Running'}
                      </span>
                    </h5>
                    <span>
                      Start at
                      {tokenData?.preIcoOpeningTime &&
                        ' ' +
                          getDate(Number(tokenData?.preIcoOpeningTime + '000'))}
                    </span>
                    <span>
                      End at
                      {tokenData.preIcoClosingTime &&
                        ' ' +
                          getDate(Number(tokenData?.preIcoClosingTime + '000'))}
                    </span>
                  </div>
                </div>
                <div class=' b-border-right'>
                  <div class='pdb-1x'>
                    <h5 class='schedule-title'>
                      <span>{tokenData?.currentRateInEth} ETH</span>
                    </h5>
                    <span>
                      Min purchase - {tokenData?.investorMinCap + ' ETH'}
                    </span>
                    <span>Token Distribute - 250,000</span>
                  </div>
                </div>
              </div>
              {/* <!-- <div class="col-xl-3 col-md-3 align-self-center text-xl-right">
                                                <div class="pdb-1x">
                                                    <span class="schedule-bonus">20% Bonus</span>
                                                </div>
                                            </div> --> */}
              <div class='col-lg-6'>
                <div>
                  <div class='pdb-1x pb-4'>
                    <h5 class='schedule-title'>
                      <span>Main ICO Sale</span>
                      <span
                        className={`badge badge-${
                          tokenData?.preIcoHasClosed
                            ? tokenData?.icoClosed
                              ? 'danger'
                              : 'success'
                            : 'secondary'
                        } ucap badge-xs`}
                      >
                        {' '}
                        {tokenData?.preIcoHasClosed
                          ? tokenData?.icoClosed
                            ? 'Expired'
                            : 'Running'
                          : 'Upcomming'}
                      </span>
                    </h5>
                    <span>
                      Start at{' '}
                      {tokenData.postIcoOpeningTime &&
                        ' ' +
                          getDate(
                            Number(tokenData?.postIcoOpeningTime + '000')
                          )}
                    </span>
                    <span>
                      End at{' '}
                      {tokenData.postIcoClosingTime &&
                        ' ' +
                          getDate(
                            Number(tokenData?.postIcoClosingTime + '000')
                          )}
                    </span>
                  </div>
                </div>
                <div>
                  <div class='pdb-1x'>
                    <h5 class='schedule-title'>
                      <span>{tokenData?.currentRateInEth} ETH</span>
                    </h5>
                    <span>
                      Min purchase - {tokenData?.investorMinCap + ' ETH'}
                    </span>
                    <span>Token Distribute - 250,000</span>
                  </div>
                </div>
              </div>
            </div>

            <div class='schedule-item'>
              <div class=''>
                {/* <!-- <div class="col-xl-5 col-md col-lg-6">
                                                <div class="pdb-1x">
                                                    <h5 class="schedule-title"><span>0.00080 ETH</span></h5>
                                                    <span>Min purchase - 0.35 ETH</span>
                                                    <span>Token Distribute - 250,000</span>
                                                </div>
                                            </div>
                                            <div class="col-xl-5 col-md col-lg-6">
                                                <div class="pdb-1x">
                                                    <h5 class="schedule-title"><span>0.00080 ETH</span></h5>
                                                    <span>Min purchase - 0.35 ETH</span>
                                                    <span>Token Distribute - 250,000</span>
                                                </div> --> */}
              </div>
            </div>
          </div>
          <div class=''>
            <div class='pdb-1x'>
              <span class='schedule-bonus b-button-hovereffect'>20% Bonus</span>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

// return (

// <div className="content-area card">
//   <div className="card-innr">
//     <div className="card-head">
//       <h4 className="card-title">
//         ICO Distribution, Rate &amp; Sales Info
//       </h4>
//     </div>
//     <div className="card-text">
//       <p>
//         To become a part of {tokenNameF} project, you can found all details
//         of ICO. <br className="d-none d-sm-block" />
//         You can contribute and <a href="#">buy {tokenSymbol} tokens</a>.
//       </p>
//       <p>
//         You can get a quick response and chat with our team in Telegram:{" "}
//         <a href="#">htts://t.me/{tokenName}</a>
//       </p>
//     </div>
//     <div className="gaps-3x"></div>
//     <div className="card-head">
//       <h5 className="card-title card-title-md">ICO Schedule</h5>
//     </div>
//     <div className="schedule-item">
//       <div className="row">
//         <div className="col-xl-5 col-md-5 col-lg-6">
//           <div className="pdb-1x">
//             <h5 className="schedule-title">
//               <span>Pre-Sale ICO</span>
//               <span
//                 className={`badge badge-${
//                   tokenData?.preIcoHasClosed ? "danger" : "success"
//                 } ucap badge-xs`}
//               >
//                 {tokenData?.preIcoHasClosed ? "Expired" : "Running"}
//               </span>
//             </h5>
//             <span>
//               Start at
//               {tokenData.preIcoOpeningTime &&
//                 " " + getDate(Number(tokenData?.preIcoOpeningTime + "000"))}
//             </span>
//             <span>
//               End at{" "}
//               {tokenData.preIcoClosingTime &&
//                 " " + getDate(Number(tokenData?.preIcoClosingTime + "000"))}
//             </span>
//           </div>
//         </div>
//         <div className="col-xl-4 col-md col-lg-6">
//           <div className="pdb-1x">
//             <h5 className="schedule-title">
//               <span>{tokenData?.currentRateInEth} ETH</span>
//             </h5>
//             <span>Min purchase - {tokenData?.investorMinCap + " ETH"}</span>
//             <span>Token Distribute - 250,000</span>
//           </div>
//         </div>
//         <div className="col-xl-3 col-md-3 align-self-center text-xl-right">
//           <div className="pdb-1x">
//             <span className="schedule-bonus">20% Bonus</span>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="schedule-item">
//       <div className="row">
//         <div className="col-xl-5 col-md-5 col-lg-6">
//           <div className="pdb-1x">
//             <h5 className="schedule-title">
//               <span>Main ICO Sale</span>
//               <span
//                 className={`badge badge-${
//                   tokenData?.preIcoHasClosed
//                     ? tokenData?.icoClosed
//                       ? "danger"
//                       : "success"
//                     : "secondary"
//                 } ucap badge-xs`}
//               >
//                 {tokenData?.preIcoHasClosed
//                   ? tokenData?.icoClosed
//                     ? "Expired"
//                     : "Running"
//                   : "Upcomming"}
//               </span>
//             </h5>
//             <span>
//               Start at
//               {tokenData.postIcoOpeningTime &&
//                 " " +
//                   getDate(Number(tokenData?.postIcoOpeningTime + "000"))}
//             </span>
//             <span>
//               End at{" "}
//               {tokenData.postIcoClosingTime &&
//                 " " +
//                   getDate(Number(tokenData?.postIcoClosingTime + "000"))}
//             </span>
//           </div>
//         </div>
//         <div className="col-xl-4 col-md col-lg-6">
//           <div className="pdb-1x">
//             <h5 className="schedule-title">
//               <span>{tokenData?.currentRateInEth} ETH</span>
//             </h5>
//             <span>Min purchase - {tokenData?.investorMinCap + " ETH"}</span>
//             <span>Token Distribute - 250,000</span>
//           </div>
//         </div>
//       </div>
//     </div>
//     <h6 className="text-light mb-0">
//       * Time zone set in (GMT +6) Dhaka, Bangladesh
//     </h6>
//   </div>
// </div>
// );
// };

export default IcoStage;
