import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import browserRoute from "./../../../Routes/browserRoutes";
import { SERVER_URL_MAIN } from "../../../Routes/serverRoutes";
import withMainLayout from "./../../HOC/withMainLayout";
import { DropzoneArea } from "material-ui-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateCompliance_Tier1,
  GetCompliance_Tier1,
} from "../../../Redux/actions/actions";
import Loading from "../../Loader/Loader";
import { BtnLoading } from "../../Loader/BtnLoading";
import "./KycApplication.css";

const size = 100242880;

const KycTier1 = () => {
  const [formData, setFormData] = useState({
    utilityBill: "",
    selfie: "",
    passportImage: "",
  });
  const [data, setData] = useState({
    KycTier1: "",
    KycTier2: "",
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(true);
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("userDetails"));
    dispatch(
      GetCompliance_Tier1(user._id, history, setLoading2, setData, data)
    );
  }, []);

  const submitTier = () => {
    let form = new FormData();
    form.append("personal_photo", formData.selfie);
    form.append("passport_photo", formData.passportImage);
    form.append("utility_bill_photo", formData.utilityBill);
    dispatch(CreateCompliance_Tier1(form, history, setLoading));
  };

  return (
    <>
      {/*hey*/}
      <div className="page-content">
        {loading2 ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <div className="container">
              <div
                className="row"
                style={{
                  display: "flex",
                  marginTop: "80px",
                  marginBottom: "50px",
                }}
              >
                {/* <!-- .Tier1 --> */}

                <div className="aside tier sidebar-right col-lg-4 col-md-6">
                  <div className="card-innr mt-5 ">
                    {/* <!-- .KYC TIER2 --> */}

                    {data.KycTier2 ? (
                      <>
                        <a
                          href={`${SERVER_URL_MAIN}/${data.KycTier2.utility_bill_photo}`}
                        >
                          <img
                            src={`${SERVER_URL_MAIN}/${data.KycTier2.utility_bill_photo}`}
                            style={{
                              width: "300px",
                              height: "300px",
                              objectFit: "cover",
                            }}
                            alt="Random Creativity Outburst"
                          />
                          <div className="cardbanner">
                            <div>Utility Bill</div>
                            <div
                              style={{
                                fontSize: "0.7rem",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              Status : {data.KycTier2.kyc_tier2_status}
                            </div>
                          </div>
                        </a>
                      </>
                    ) : (
                      <>
                        <DropzoneArea
                          maxFileSize={size}
                          acceptedFiles={["image/*"]}
                          dropzoneText={"Utility Bill"}
                          filesLimit={1}
                          dropzoneClass="material-uiDropzone shadow-lg"
                          onChange={(e) => {
                            setFormData({ ...formData, utilityBill: e[0] });
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
                {/* <!-- .Tier2 --> */}
                <div className="aside tier sidebar-right col-lg-4 col-md-6">
                  <div className="card-innr mt-5 ">
                    {data.KycTier1 ? (
                      <>
                        <a
                          href={`${SERVER_URL_MAIN}/${data.KycTier1.personal_photo}`}
                        >
                          <img
                            src={`${SERVER_URL_MAIN}/${data.KycTier1.personal_photo}`}
                            style={{
                              width: "300px",
                              height: "300px",
                              objectFit: "cover",
                            }}
                            alt="Random Creativity Outburst"
                          />
                          <div className="cardbanner">
                            <div>Selfie</div>
                            <div
                              style={{
                                fontSize: "0.7rem",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              Status : {data.KycTier1.kyc_tier1_status}
                            </div>
                          </div>
                        </a>
                      </>
                    ) : (
                      <>
                        <DropzoneArea
                          maxFileSize={size}
                          acceptedFiles={["image/*"]}
                          dropzoneText={"Selfie"}
                          filesLimit={1}
                          dropzoneClass="material-uiDropzone shadow-lg"
                          onChange={(e) => {
                            setFormData({ ...formData, selfie: e[0] });
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* <!-- .Tier3 --> */}

                <div className="aside tier sidebar-right col-lg-4  col-md-6">
                  <div className="card-innr mt-5 ">
                    {data.KycTier1 ? (
                      <>
                        <a
                          href={`${SERVER_URL_MAIN}/${data.KycTier1.passport_photo}`}
                        >
                          {" "}
                          <img
                            src={`${SERVER_URL_MAIN}/${data.KycTier1.passport_photo}`}
                            style={{
                              width: "300px",
                              height: "300px",
                              objectFit: "cover",
                            }}
                            alt="Random Creativity Outburst"
                          />
                          <div className="cardbanner">
                            <div>Passport</div>
                            <div
                              style={{
                                fontSize: "0.7rem",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              Status : {data.KycTier1.kyc_tier1_status}
                            </div>
                          </div>
                        </a>
                      </>
                    ) : (
                      <>
                        <DropzoneArea
                          maxFileSize={size}
                          acceptedFiles={["image/*"]}
                          dropzoneText={"Passport Image"}
                          filesLimit={1}
                          dropzoneClass="material-uiDropzone shadow-lg"
                          onChange={(e) => {
                            setFormData({ ...formData, passportImage: e[0] });
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* <!-- .col --> */}
              </div>
              {!data.KycTier1 ? (
                <>
                  <div className="text-center">
                    <button
                      className="btn btn-primary btn-lg mt-2 mb-5  px-5 btn-xs btn-primary"
                      disabled={
                        !formData.utilityBill ||
                        !formData.selfie ||
                        !formData.passportImage
                      }
                      onClick={submitTier}
                    >
                      SUBMIT
                      {loading ? (
                        <>
                          <BtnLoading height="25px" width="25px" />
                        </>
                      ) : null}
                    </button>
                  </div>
                </>
              ) : null}

              {/* <!-- .container --> */}
            </div>
          </>
        )}
        {/* <!-- .container --> */}
      </div>
    </>
  );
};

export default withMainLayout(KycTier1);
