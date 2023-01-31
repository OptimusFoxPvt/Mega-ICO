import React from "react";
import { Link } from "react-router-dom";
import browserRoute from "./../../../Routes/browserRoutes";
import withMainLayout from "./../../HOC/withMainLayout";
import { DropzoneArea } from "material-ui-dropzone";

import "./KycApplication.css";
const size = 100242880;

const KycTier3 = () => {
  return (
    <>
      {/*hey*/}
      <div className="page-content">
        <div className="container">
          <div
            className="row"
            style={{ display: "flex", marginTop: "80px", marginBottom: "50px" }}
          >
            {/* <!-- .Tier1 --> */}

            <div className="aside tier sidebar-right col-lg-6 col-md-6">
              <div className="card-innr mt-5 ">
                <DropzoneArea
                  maxFileSize={size}
                  acceptedFiles={["image/*"]}
                  dropzoneText={"AML Upload (Tax)"}
                  filesLimit={1}
                  dropzoneClass="material-uiDropzone shadow-lg"
                />
              </div>
            </div>
            {/* <!-- .Tier2 --> */}
            <div className="aside tier sidebar-right col-lg-6 col-md-6">
              <div className="card-innr mt-5 ">
                <DropzoneArea
                  maxFileSize={size}
                  acceptedFiles={["image/*"]}
                  dropzoneText={"Approved Law Firm"}
                  filesLimit={1}
                  dropzoneClass="material-uiDropzone shadow-lg"
                />
              </div>
            </div>

            {/* <!-- .col --> */}
          </div>
          <div className="text-center">
            <button className="btn btn-auto btn-lg mt-2 mb-5  px-5 btn-xs btn-primary">
              SUBMIT
            </button>
          </div>
          {/* <!-- .container --> */}
        </div>
        {/* <!-- .container --> */}
      </div>
    </>
  );
};

export default withMainLayout(KycTier3);
