import { KYCApproval } from "../../../Redux/actions/actions";
import { useDispatch } from "react-redux";
import { useState } from "react";
const ConfirmationModal = ({ status, id }) => {
  const [string, setString] = useState(status);
  const dispatch = useDispatch();
  console.log(status);
  return (
    <div class="modal fade" id="Kyc-confirm" tabindex="-1">
      <div class="modal-dialog modal-dialog-md modal-dialog-centered">
        <div class="modal-content">
          <div style={{ textAlign: "center" }} class="popup-body">
            <h4 class="popup-title">Confirmation</h4>
            {status === "approved" ? (
              <p>Are you sure you want to Approve KYC?</p>
            ) : (
              <p>Are you sure you want to Reject KYC?</p>
            )}
            <ul
              style={{ justifyContent: "center" }}
              class="d-flex flex-wrap align-items-center guttar-30px"
            >
              <li>
                <a
                  data-dismiss="modal"
                  data-toggle="modal"
                  onClick={() => dispatch(KYCApproval(status, id))}
                  class="btn btn-warning btn-sm"
                >
                  {status === "approved" ? "Approve" : "Reject"}
                </a>
              </li>
              <li class="pdt-1x pdb-1x">
                <a
                  href="#"
                  data-dismiss="modal"
                  data-toggle="modal"
                  // data-target="#pay-review"
                  class="btn btn-danger btn-sm"
                >
                  Cancel
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
