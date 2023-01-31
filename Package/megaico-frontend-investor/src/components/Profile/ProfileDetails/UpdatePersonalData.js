import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../../../Redux/actions/actions";
import PersonalDataModel from "./PersonalDataModal";
const PersonalData = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.userDetails);
  const [userUpdated, setUserUpdated] = useState(false);
  const [showProfileUpdateModal, setShowProfileUpdateModal] = useState(false); // It shows ProfileUpdate modal

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    contact_no: "",
    dob: "",
    nationality: "",
    address: "",
  });
  const { fname, lname, contact_no, dob, nationality, address, email } =
    formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      name: fname + " " + lname,
    });
  };
  const popUpModal = () => {
    setShowProfileUpdateModal(true);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserDetails({ formData, setUserUpdated }));
  };

  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        fname: user?.first_name,
        lname: user?.last_name,
        email: user?.email,
        contact_no: user?.contact_no,
        dob: user?.dob,
        nationality: user?.nationality,
        address: user?.address,
      });
    }
  }, [user]);

  return (
    <div className="tab-pane fade show active" id="personal-data">
      <form>
        <div className="row">
          <div className="col-md-6">
            <div className="input-item input-with-label">
              <input
                className="input-bordered"
                type="text"
                id="full-name"
                name="fname"
                placeholder={fname}
                disabled
              />
            </div>
            {/* <!-- .input-item --> */}
          </div>
          <div className="col-md-6">
            <div className="input-item input-with-label">
              <input
                className="input-bordered"
                type="text"
                id="full-name"
                placeholder={`${lname}`}
                name="lname"
                disabled
              />
            </div>
            {/* <!-- .input-item --> */}
          </div>
          <div className="col-md-6">
            <div className="input-item input-with-label">
              <input
                className="input-bordered"
                type="email"
                id="email-address"
                placeholder={email}
                name="email"
                disabled
              />
            </div>
            {/* <!-- .input-item --> */}
          </div>
          <div className="col-md-6">
            <div className="input-item input-with-label">
              <input
                className="input-bordered"
                type="text"
                id="mobile-number"
                placeholder={contact_no}
                name="contact_no"
                disabled
              />
            </div>
            {/* <!-- .input-item --> */}
          </div>
          <div className="col-md-6">
            <div className="input-item input-with-label">
              <input
                className="input-bordered date-picker-dob"
                type="text"
                id="date-of-birth"
                placeholder={dob}
                name="dob"
                disabled
              />
            </div>
            {/* <!-- .input-item --> */}
          </div>
          {/* <!-- .col --> */}
          <div className="col-md-6">
            <div className="input-item input-with-label">
              <input
                className="input-bordered"
                id="nationality"
                placeholder={nationality}
                name="nationality"
                disabled
              />
            </div>{" "}
          </div>
          {/* <!-- .input-item --> */}
          <div className="col-md-12">
            <div class="input-item input-with-label">
              <input
                class="input-bordered disabled"
                type="text"
                id="Adress"
                name="Adress"
                placeholder={address}
                disabled
              />
            </div>
            {/* <!-- .input-item --> */}
          </div>
          {/* <!-- .col --> */}
        </div>
        {/* <!-- .row --> */}
        <div className="gaps-1x"></div>
        {/* <!-- 10px gap --> */}
        {/* <div className="d-sm-flex justify-content-between align-items-center">
          // <button className="btn btn-primary" type="submit">
          //   Update Profile
          // </button>

          <div className="gaps-2x d-sm-none"></div>
          {userUpdated && (
            <span className="text-success">
              <em className="ti ti-check-box"></em> All Changes are saved
            </span>
          )}
        </div> */}
        {/* <button className="btn btn-primary">Update</button> */}
      </form>
      <button
        className="dt-status-md badge badge-outline badge-success badge-md b-button-hovereffect"
        onClick={popUpModal}
      >
        {" "}
        Update
      </button>
      <PersonalDataModel
        showProfileUpdateModal={showProfileUpdateModal}
        setShowProfileUpdateModal={setShowProfileUpdateModal}
      />
    </div>
  );
};

export default PersonalData;
