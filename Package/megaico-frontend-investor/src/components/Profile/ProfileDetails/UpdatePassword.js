import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updatePassword } from "../../../Redux/actions/actions";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userDetails);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [minPasswordLength, setMinPasswordLength] = useState(6);
  const [error, setError] = useState(false);

  const initialvalues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialvalues);
  const { currentPassword, newPassword, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      newPassword !== confirmPassword ||
      newPassword.length < minPasswordLength
    ) {
      return setError(true);
      // return toast.error("Password donot match");
    }
    setError(false);
    dispatch(
      updatePassword({
        formData,
        setFormData,
        initialvalues,
        setPasswordUpdated,
      })
    );
  };

  return (
    <div className="tab-pane fade" id="password">
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="input-item input-with-label">
              <input
                className="input-bordered"
                type="password"
                id="old-pass"
                placeholder="Enter Old Password"
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            {/* <!-- .input-item --> */}
          </div>
          {/* <!-- .col --> */}
        </div>
        {/* <!-- .row --> */}
        <div className="row">
          <div className="col-md-6">
            <div className="input-item input-with-label">
              <input
                className="input-bordered"
                type="password"
                id="new-pass"
                placeholder="Enter New Password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            {/* <!-- .input-item --> */}
            {error && newPassword.length < minPasswordLength && (
              <div className="note note-plane note-info pdb-1x">
                <em className="fas fa-info-circle"></em>
                <p>Password should be minimum 6 letter.</p>
              </div>
            )}
          </div>
          {/* <!-- .col --> */}
          <div className="col-md-6">
            <div className="input-item input-with-label">
              <input
                className="input-bordered"
                type="password"
                id="confirm-pass"
                placeholder="Enter Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            {/* <div
              style={{ left: "-55vh" }}
              class="note note-plane note-info pdb-1x"
            >
              <em class="fas fa-info-circle"></em>
              <p>
                Password should be minmum 8 letter and include lower and
                uppercase letter.
              </p>
            </div> */}
            <div class="gaps-1x"></div>
            <div class="d-sm-flex justify-content-between align-items-center">
              <div class="gaps-2x d-sm-none"></div>
              {/* <span class="text-success">
                <em class="ti ti-check-box"></em> Changed Password
              </span> */}
            </div>

            {error && newPassword !== confirmPassword && (
              <div className="note note-plane note-info pdb-1x">
                <em className="fas fa-info-circle"></em>
                <p>Password donot match</p>
              </div>
            )}
          </div>
          {/* <!-- .col --> */}
        </div>
        {/* <!-- .row --> */}
        {/* <div className="note note-plane note-info pdb-1x">
          <em className="fas fa-info-circle"></em>
          <p>Password should be minimum 6 letter.</p>
        </div> */}
        <div className="gaps-1x"></div>
        {/* <!-- 10px gap --> */}
        <div className="d-sm-flex justify-content-between align-items-center">
          <button className="btn btn-primary" type="submit">
            Update
          </button>
          <div className="gaps-2x d-sm-none"></div>
          {/* {passwordUpdated && (
            <span className="text-success">
              <em className="ti ti-check-box"></em> Changed Password
            </span>
          )} */}
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
