import React from "react";
import UpdatePersonalData from "./UpdatePersonalData";
import UpdateSecuritySettings from "./UpdateSecuritySettings";
import UpdatePassword from "./UpdatePassword";

const ProfileDetails = () => {
  return (
    
    <div className="content-area card">
      
      <div className="card-innr">
        
        <div className="card-head">
          {/* <h4 className="card-title">Profile Details</h4> */}
        </div>
        <ul className="nav nav-tabs nav-tabs-line" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              data-toggle="tab"
              href="#personal-data"
            >
              Personal Data
            </a>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#settings">
              Settings
            </a>
          </li> */}
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#password">
              Password
            </a>
          </li>
        </ul>
        {/* <!-- .nav-tabs-line --> */}
        <div className="tab-content" id="profile-details">
          <UpdatePersonalData />
          {/* <!-- .tab-pane --> */}
          {/* <UpdateSecuritySettings /> */}
          {/* <!-- .tab-pane --> */}
          <UpdatePassword />
          {/* <!-- .tab-pane --> */}
        </div>
        {/* <!-- .tab-content --> */}
      </div>
      {/* <!-- .card-innr --> */}
    </div>
  );
};

export default ProfileDetails;
