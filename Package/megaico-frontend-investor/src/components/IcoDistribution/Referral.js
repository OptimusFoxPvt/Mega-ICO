import { useSelector, useDispatch } from "react-redux";
import { tokenSymbol } from "../TokenInfo";
const Referral = () => {
  const dispatch = useDispatch();
  const genReferralLink = useSelector((state) => state.auth.referralLink);

  return (
    <>
      {/* new design ========================== */}

      <div class="content-area card">
        <div class="card-innr">
          <div class="card-head">
            <h5 class="card-title card-title-md">
              Invite your friends and family and receive free tokens
            </h5>
          </div>
          <div class="card-text">
            <p>
              Each member have a unique {tokenSymbol} referral link to share
              with friends and family and receive a{" "}
              <strong>bonus - 15% of the value of their contribution</strong>.
              If any one sign-up with this link, will be added to your referral
              program. The referral link may be used during a token sales
              running.
            </p>
          </div>
          <div class="referral-form">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="mb-0 font-bold">Referral URL</h5>
              {/* <!-- <a href="#" class="link link-primary link-ucap">See Your referral</a> --> */}
            </div>
            <div class="copy-wrap mgb-1-5x mgt-1-5x">
              <span class="copy-feedback"></span>
              <em class="fas fa-link"></em>
              <input
                type="text"
                class="copy-address"
                value={
                  genReferralLink?.referral
                    ? genReferralLink?.referral?.referral_link
                    : "SUBMIT YOUR KYC"
                }
                disabled
              />
              <button
                class="copy-trigger copy-clipboard"
                data-clipboard-text={genReferralLink?.referral?.referral_link}
              >
                <svg
                  width="13"
                  height="16"
                  viewBox="0 0 13 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.36">
                    <path
                      d="M8.73994 0.910947L8.70345 0.875H8.65223H1H0.875V1V15V15.125H1H12H12.125V15V4.29764V4.24531L12.0877 4.20858L8.73994 0.910947ZM1.7077 14.3052V1.6948H8.11456V4.69991V4.82491H8.23956H11.2923V14.3052H1.7077ZM8.94726 4.00512V2.27484L10.7038 4.00512H8.94726Z"
                      fill="#77838F"
                      stroke="#77838F"
                      stroke-width="0.25"
                    />
                    <path
                      d="M7.55818 4.13V4.005H7.43318H2.69873H2.57373V4.13V4.6998V4.8248H2.69873H7.43318H7.55818V4.6998V4.13Z"
                      fill="#77838F"
                      stroke="#77838F"
                      stroke-width="0.25"
                    />
                    <path
                      d="M10.4255 6.7406V6.6156H10.3005H2.69873H2.57373V6.7406V7.3104V7.4354H2.69873H10.3005H10.4255V7.3104V6.7406Z"
                      fill="#77838F"
                      stroke="#77838F"
                      stroke-width="0.25"
                    />
                    <path
                      d="M10.4255 9.35107V9.22607H10.3005H2.69873H2.57373V9.35107V9.92087V10.0459H2.69873H10.3005H10.4255V9.92087V9.35107Z"
                      fill="#77838F"
                      stroke="#77838F"
                      stroke-width="0.25"
                    />
                    <path
                      d="M10.4255 11.9614V11.8364H10.3005H2.69873H2.57373V11.9614V12.5312V12.6562H2.69873H10.3005H10.4255V12.5312V11.9614Z"
                      fill="#77838F"
                      stroke="#77838F"
                      stroke-width="0.25"
                    />
                  </g>
                </svg>
              </button>
            </div>
            {/* <!-- .copy-wrap --> */}
          </div>
          {/* <!-- <ul class="share-links">
                                        <li>Share with : </li>
                                        <li><a href="#"><em class="fab fa-google-plus-g"></em></a></li>
                                        <li><a href="#"><em class="fab fa-twitter"></em></a></li>
                                        <li><a href="#"><em class="fab fa-facebook-f"></em></a></li>
                                        <li><a href="#"><em class="fab fa-linkedin-in"></em></a></li>
                                    </ul> --> */}
          <div class="">
            <div class="pdb-1x">
              <span class="schedule-bonus b-button-hovereffect">
                Enable 2FA
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
// // return (
// //   <div className="content-area card">
// //     <div className="card-innr">
// //       <div className="card-head">
// //         <h5 className="card-title card-title-md">
// //           Invite your friends and family and receive free tokens
// //         </h5>
// //       </div>
// //       <div className="card-text">
// //         <p>
// //           Each member have a unique {tokenSymbol} referral link to share with
// //           friends and family and receive a
// //           <strong>bonus - 15% of the value of their contribution</strong>. If
// //           any one sign-up with this link, will be added to your referral
// //           program. The referral link may be used during a token sales running.
// //         </p>
// //       </div>
// //       <div className="referral-form">
// //         <div className="d-flex justify-content-between align-items-center">
// //           <h5 className="mb-0 font-bold">Referral URL</h5>
// //           <a href="#" className="link link-primary link-ucap">
// //             See Your referral
// //           </a>
// //         </div>
// //         <div className="copy-wrap mgb-1-5x mgt-1-5x">
// //           <span className="copy-feedback"></span>
// //           <em className="fas fa-link"></em>
// //           <input
// //             type="text"
// //             className="copy-address"
// //             value={
// //               genReferralLink?.referral
// //                 ? genReferralLink?.referral?.referral_link
// //                 : "SUBMIT YOUR KYC"
// //             }
// //             disabled
// //           />
// //           <button
// //             className="copy-trigger copy-clipboard"
// //             data-clipboard-text={genReferralLink?.referral?.referral_link}
// //           >
// //             <em className="ti ti-files"></em>
// //           </button>
// //         </div>
// {
//   /* <!-- .copy-wrap --> */
// }
// // </div>
// {
//   /* <button
//           data-toggle="modal"
//           data-target="#pay-confirm"
//           className="btn btn-outline-primary"
//           style={{ float: "right" }}
//         >
//           Collect Referral Bonus
//         </button> */
// }
// //         <ul className="share-links">
// //           <li>Share with :</li>
// //           <li>
// //             <a href="#">
// //               <em className="fab fa-google-plus-g"></em>
// //             </a>
// //           </li>
// //           <li>
// //             <a href="#">
// //               <em className="fab fa-twitter"></em>
// //             </a>
// //           </li>
// //           <li>
// //             <a href="#">
// //               <em className="fab fa-facebook-f"></em>
// //             </a>
// //           </li>
// //           <li>
// //             <a href="#">
// //               <em className="fab fa-linkedin-in"></em>
// //             </a>
// //           </li>
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

export default Referral;
