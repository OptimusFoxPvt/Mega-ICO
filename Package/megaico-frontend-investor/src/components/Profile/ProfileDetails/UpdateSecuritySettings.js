import React from "react";

const SecuritySettings = () => {
  return (
    <div className="tab-pane fade" id="settings">
      <div className="pdb-1-5x">
        <h5 className="card-title card-title-sm text-dark">
          Security Settings
        </h5>
      </div>
      <div className="input-item">
        <input
          type="checkbox"
          className="input-switch input-switch-sm"
          id="save-log"
          checked
        />
        <label htmlFor="save-log">Save my Activities Log</label>
      </div>
      <div className="input-item">
        <input
          type="checkbox"
          className="input-switch input-switch-sm"
          id="pass-change-confirm"
        />
        <label htmlFor="pass-change-confirm">
          Confirm me through email before password change
        </label>
      </div>
      <div className="pdb-1-5x">
        <h5 className="card-title card-title-sm text-dark">
          Manage Notification
        </h5>
      </div>
      <div className="input-item">
        <input
          type="checkbox"
          className="input-switch input-switch-sm"
          id="latest-news"
          checked
        />
        <label htmlFor="latest-news">
          Notify me by email about sales and latest news
        </label>
      </div>
      <div className="input-item">
        <input
          type="checkbox"
          className="input-switch input-switch-sm"
          id="activity-alert"
          checked
        />
        <label htmlFor="activity-alert">
          Alert me by email htmlFor unusual activity.
        </label>
      </div>
      <div className="gaps-1x"></div>
      <div className="d-flex justify-content-between align-items-center">
        <span></span>
        <span className="text-success">
          <em className="ti ti-check-box"></em> Setting has been updated
        </span>
      </div>
    </div>
  );
};

export default SecuritySettings;
