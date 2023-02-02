const ReferralModal = () => {
  return (
    <div class="modal fade" id="pay-confirm" tabIndex="-1">
      <div class="modal-dialog modal-dialog-md modal-dialog-centered">
        <div class="modal-content">
          <div style={{ textAlign: "center" }} class="popup-body">
            <h4 class="popup-title">Confirmation</h4>
            <p>Are you sure you want to Collect your referral bonus?</p>

            <ul
              style={{ justifyContent: "center" }}
              class="d-flex flex-wrap align-items-center guttar-30px"
            >
              <li>
                <a
                  href="#"
                  data-dismiss="modal"
                  data-toggle="modal"
                  // data-target="#pay-review"
                  class="btn btn-primary"
                >
                  Confirm
                </a>
              </li>
              <li class="pdt-1x pdb-1x">
                <a
                  href="#"
                  data-dismiss="modal"
                  data-toggle="modal"
                  // data-target="#pay-review"
                  class="btn btn-danger"
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

export default ReferralModal;
