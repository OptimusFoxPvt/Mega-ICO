import browserRoute from "../../Routes/browserRoutes";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { transactionList } from "../../Redux/actions/actions";
import { tokenSymbol } from "../TokenInfo";
export const getHoursMinutes = (t) => {
  let dt = new Date(t);
  let h = dt.getHours();
  let m = dt.getMinutes();
  m = m.toString();
  m = m.length < 2 ? "0" + m : m;
  return h > 12
    ? h - 12 + ":" + m + " PM"
    : h === 12
    ? h + ":" + m + " PM"
    : h + ":" + m + " AM";
};
const Transactions = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(transactionList());
  }, []);
  const getTranx = useSelector((state) => state.auth.transactionLists);
  const time = (t) => {
    return new Date(t);
  };

  const recentTrans = getTranx
    .sort((a, b) => (time(b?.updated_at) > time(a?.updated_at) ? 1 : -1))
    .slice(0, 3);
  console.log("recent", recentTrans);
  return (
    <div className="col-xl-8 col-lg-7">
      <div className="token-transaction card card-full-height">
        <div className="card-innr">
          <div className="card-head has-aside">
            <h4 className="card-title">Transaction</h4>
            <div className="card-opt">
              <Link to={browserRoute.TRANSACTIONS} className="link ucap">
                View ALL <em className="fas fa-angle-right ml-2"></em>
              </Link>
            </div>
          </div>
          <table className="table tnx-table">
            <thead>
              <tr style={{ borderBottom: "1px solid #C4C4C4" }}>
                <th>{tokenSymbol} Tokens</th>
                <th>Amount</th>
                <th className="d-none d-sm-table-cell tnx-date">Date</th>
                <th className="tnx-type">
                  <div className="tnx-type-text"></div>
                </th>
              </tr>
              {/* <!-- tr --> */}
            </thead>
            {/* <!-- thead --> */}
            <tbody>
              {recentTrans.map((recentList) => (
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="data-state data-state-pending"></div>
                      <span className="lead">
                        {" "}
                        {recentList.tokens.toString().length > 12
                          ? recentList.tokens
                              .toPrecision(40)
                              .substring(
                                0,
                                recentList.tokens.toString().length - 12
                              ) + " Trillion"
                          : recentList.tokens.toPrecision(35).split(".")[0]
                              .length > 9
                          ? recentList.tokens
                              .toPrecision(40)
                              .substring(
                                0,
                                recentList.tokens.toPrecision(35).split(".")[0]
                                  .length - 9
                              ) + " B"
                          : recentList.tokens.toPrecision(35).split(".")[0]
                              .length > 6
                          ? recentList.tokens
                              .toString()
                              .substring(
                                0,
                                recentList.tokens.toPrecision(35).split(".")[0]
                                  .length - 6
                              ) + " M"
                          : recentList.tokens}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span>
                      <span className="lead">{recentList.eth.toFixed(5)}</span>
                      <span className="sub">
                        ETH{" "}
                        <em
                          className="fas fa-info-circle"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          data-original-title="1 ETH = 590.54 USD"
                        ></em>
                      </span>
                    </span>
                  </td>
                  <td className="d-none d-sm-table-cell tnx-date">
                    <span className="sub sub-s2">
                      {new Date(recentList.updated_at)
                        .toString("dddd MMM yyyy")
                        .substring(0, 15)}
                      {" " + getHoursMinutes(recentList.updated_at)}
                    </span>
                  </td>
                  <td className="tnx-type">
                    <span className="tnx-type-md badge badge-outline b-badge-success badge-md b-button-hovereffect">
                      Purchase
                    </span>
                    <span className="tnx-type-sm badge badge-sq badge-outline badge-success badge-md">
                      Purchase
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* <!-- tbody --> */}
          </table>
          {/* <!-- .table --> */}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
// {recentTrans.map((recentList) => (
//   <tr>
//     <td>
//       <div className='d-flex align-items-center'>
//         <div className='data-state data-state-approved'></div>
//         <span className='lead'>
//           {' '}
//           {recentList.tokens.toString().length > 12
//             ? recentList.tokens
//                 .toPrecision(40)
//                 .substring(
//                   0,
//                   recentList.tokens.toString().length - 12
//                 ) + ' Trillion'
//             : recentList.tokens.toPrecision(35).split('.')[0]
//                 .length > 9
//             ? recentList.tokens
//                 .toPrecision(40)
//                 .substring(
//                   0,
//                   recentList.tokens.toPrecision(35).split('.')[0]
//                     .length - 9
//                 ) + ' B'
//             : recentList.tokens.toPrecision(35).split('.')[0]
//                 .length > 6
//             ? recentList.tokens
//                 .toString()
//                 .substring(
//                   0,
//                   recentList.tokens.toPrecision(35).split('.')[0]
//                     .length - 6
//                 ) + ' M'
//             : recentList.tokens}
//         </span>
//       </div>
//     </td>
//     <td>
//       <span>
//         <span className='lead'>{recentList.eth.toFixed(5)}</span>
//         <span className='sub'>
//           ETH
//           <em
//             className='fas fa-info-circle'
//             data-toggle='tooltip'
//             data-placement='bottom'
//             data-original-title='1 ETH = 590.54 USD'
//           ></em>
//         </span>
//       </span>
//     </td>
//     <td className='d-none d-sm-table-cell tnx-date'>
//       <span className='sub sub-s2'>
//         {new Date(recentList.updated_at)
//           .toString('dddd MMM yyyy')
//           .substring(0, 15)}
//         {' ' + getHoursMinutes(recentList.updated_at)}
//       </span>
//     </td>
//     <td className='tnx-type'>
//       <span
//         className='
//     tnx-type-md
//     badge badge-outline badge-success badge-md tran-btn
//   '
//       >
//         Purchase
//       </span>
//       {/* <span
//     className="
//     tnx-type-sm
//     badge badge-sq badge-outline badge-success badge-md
//   "
//   >
//     P
//   </span> */}
//     </td>
//   </tr>
// ))}
