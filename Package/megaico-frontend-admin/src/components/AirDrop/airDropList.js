import React, { useState } from "react";
import withMainLayout from "../HOC/withMainLayout";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { airDropList } from "../../Redux/actions/actions";
import { tokenSymbol } from "../TokenInfo";
import ConfirmationModal from "./confirmationModal";
const AirDropList = () => {
  const dispatch = useDispatch();
  const [List, setTransactions] = useState([]);
  useEffect(() => {
    dispatch(airDropList(setTransactions));
    // console.log("dispatch");
  }, []);
  const deleteItem = (id) => {
    setTransactions(List.filter((t) => t.transaction_id !== id));
  };
  console.log(List);
  return (
    <div class="page-content">
      <div class="container">
        <div className="h-screen">
          <div className="page-content">
            <div className="">
              <div className="card content-area">
                <div className="card-innr">
                  <div className="card-head mb-3">
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#Confirmation-details"
                      className="float-right badge-lg"
                    >
                      SEND AIRDROP
                    </a>
                    <h4 className="card-title">AIR DROP</h4>
                    <hr />
                  </div>
                  <table className="data-table dt-init user-tnx">
                    <thead>
                      <tr className="data-item data-head">
                        <th className="data-col dt-account">Wallet Address</th>
                        <th className="data-col dt-token">Tokens Bought</th>
                        <th className="data-col dt-amount">Amount In ETH</th>

                        <th className="data-col">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {List.length !== 0 &&
                        List.map((list) => (
                          <tr className="data-item">
                            <td className="data-col dt-token">
                              <span className="lead token-amount">
                                {" "}
                                {list.wallet_address
                                  ? list.wallet_address
                                  : "Not Available"}
                              </span>
                            </td>
                            <td className="data-col dt-amount">
                              <span className="lead amount-pay">
                                {/* {list.eth.toFixed(3)} */}
                              </span>
                              <span className="sub sub-symbol">
                                ETH
                                <em
                                  className="fas fa-info-circle"
                                  data-toggle="tooltip"
                                  data-placement="bottom"
                                  title={`1 ETH = 100 ${tokenSymbol}`}
                                ></em>
                              </span>
                            </td>
                            <td className="data-col dt-account">
                              <span className="lead user-info">
                                0
                                <span className="sub sub-symbol">
                                  {tokenSymbol}
                                </span>
                              </span>
                            </td>
                            <td className="data-col dt-type">
                              <span
                                className="
                        dt-type-md
                        badge badge-outline badge-warning badge-md tran-btn
                      "
                              >
                                Request
                              </span>
                            </td>
                          </tr>
                        ))}

                      <ConfirmationModal data={List} />
                    </tbody>
                  </table>
                </div>
                {/* <!-- .card-innr --> */}
              </div>
              {/* <!-- .card --> */}
            </div>
            {/* <!-- .container --> */}
          </div>
        </div>
        {/* <!-- .card --> */}
      </div>
      {/* <!-- .container --> */}
    </div>
    // <!-- .page-content -->
  );
};

export default withMainLayout(AirDropList);
