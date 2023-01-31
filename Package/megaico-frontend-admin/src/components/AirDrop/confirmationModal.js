import React, { useState } from "react";
import { AirDropSending } from "../../Redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

const ConfirmationModal = ({ data }) => {
  const airDropData = useSelector((state) => state.auth.AirdropData);
  const RegisteredUsers = airDropData.RegisteredUsers;
  const [tokens, setTokens] = useState(0);
  const dispatch = useDispatch();
  const SendAirDrop = () => {
    dispatch(AirDropSending(data, tokens));
  };
  return (
    <div class="modal fade" id="Confirmation-details" tabindex="-1">
      <div class="modal-dialog modal-dialog-md modal-dialog-centered">
        <div class="modal-content">
          <div class="popup-body" style={{ textAlign: "center" }}>
            <h4 class="popup-title">Requested Details</h4>
            <p class="lead text-primary">
              <strong>AirDrop will be sent to following Addresses</strong>
              <p>Enter Amount of Tokens to Send</p>
              <input
                className="form-control"
                value={tokens}
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    setTokens(e.target.value);
                  } else {
                    setTokens(tokens);
                    console.log(tokens);
                  }
                }}
                type="number"
              />
              <div
                style={{ height: "200px", overflow: "auto" }}
                className="mt-5"
              >
                {RegisteredUsers?.map((d) => (
                  <p key={d}>{d}</p>
                ))}
              </div>
            </p>
            <button
              onClick={() => SendAirDrop()}
              disabled={RegisteredUsers?.length === 0}
              className="btn btn-info"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
