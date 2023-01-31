import { useState, useEffect } from "react";
import * as React from "react";
import { DropzoneArea } from "material-ui-dropzone";
import PassportImg from "../../../assets/images/icon-passport.png";
import PassportImg2 from "../../../assets/images/icon-passport-color.png";
import NationalIdImg from "../../../assets/images/icon-national-id.png";
import NationalIdImg2 from "../../../assets/images/icon-national-id-color.png";
import LicenceImg from "../../../assets/images/icon-licence.png";
import LicenceImg2 from "../../../assets/images/icon-licence-color.png";
import { SubmitKyc } from "../../../Services/KycServices";
import vectorLicence from "../../../assets/images/vector-licence.png";
import withMainLayout from "./../../HOC/withMainLayout";
import { useDispatch } from "react-redux";
import KycFormInput from "./KycFormInput";
import { BtnLoading } from "../../Loader/BtnLoading";
import { useHistory } from "react-router";
import { number } from "joi";
import { toast } from "react-toastify";
const KycForm = () => {
  const history = useHistory();
  const initialValues = {
    first_name: "",
    last_name: "",
    dob: "",
    telegram_username: "",
    nationality: "",
    state: "",
    phone_number: "",
    city: "",
    zip_code: "",
    address: "",
    address2: "",
    wallet_address: "",
    wallet: "",
    email: "",
    type: "passport",
    file: [],
  };

  const [images, setImages] = useState({
    passport: [],
    driving: [],
    nationalId: ["", ""],
  });
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const [check2, setCheck2] = useState(false);
  useEffect(() => {
    console.log("FORM VALUES============>", formValues);
  }, [formValues]);
  const {
    first_name,
    last_name,
    dob,
    telegram_username,
    state,
    phone_number,
    nationality,
    zip_code,
    city,
    address,
    address2,
    wallet_address,
    wallet,
    email,
    file,
    type,
  } = formValues;

  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    let alpha = e.target.value.replace(/[^A-Za-z ]*$/gm, "");
    const { name, value } = e.target;
    if (name !== "city") {
      setFormValues({ ...formValues, [name]: value });
      // console.log(parseInt(phone_number));
      // console.log(typeof phone_number);
    } else {
      setFormValues({ ...formValues, [name]: alpha });
    }
  };

  const handleImage = (event, name) => {
    console.log(event[0]);
    if (!event[0]) {
      if (name === "passport") {
        setFormValues({ ...formValues, file: event });
        setImages({ ...images, passport: event });
      } else if (name === "driving") {
        setImages({ ...images, driving: event });
        setFormValues({ ...formValues, file: event });
      } else if (name === "NICF") {
        let array = images.nationalId;
        array[0] = "";
        setImages({ ...images, nationalId: array });
        setFormValues({ ...formValues, file: array });
      } else if (name === "NICB") {
        let array = images.nationalId;
        array[1] = "";
        setImages({ ...images, nationalId: array });
        setFormValues({ ...formValues, file: array });
      }
    }
    const reader = new FileReader();
    if (event[0]) {
      reader.readAsDataURL(event[0]);
      reader.onloadend = () => {
        const base64data = event[0];

        if (name === "passport") {
          let array = [base64data];
          setFormValues({ ...formValues, file: array });
          setImages({ ...images, passport: array });
        } else if (name === "driving") {
          let array = [base64data];
          setImages({ ...images, driving: array });
          setFormValues({ ...formValues, file: array });
        } else if (name === "NICF") {
          let array = images.nationalId;
          array[0] = base64data;
          setImages({ ...images, nationalId: array });
          setFormValues({ ...formValues, file: array });
        } else if (name === "NICB") {
          let array = images.nationalId;
          array[1] = base64data;
          setImages({ ...images, nationalId: array });
          setFormValues({ ...formValues, file: array });
        }
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !file.length ||
      (type === "nationalIdCard" && file[0] === "") ||
      file[1] === ""
    ) {
      toast.error("Please Upload Image Properly");
    } else {
      const data = {
        fname: first_name,
        lname: last_name,
        name: first_name + " " + last_name,
        contact_no: phone_number,
        dob: dob,
        nationality: nationality,
        address: address,
        email: email,
      };

      setLoading(true);
      const body = new FormData();
      body.append("first_name", first_name);
      body.append("last_name", last_name);
      body.append("address", address);
      body.append("address_2", address2);
      body.append("city", city);
      body.append("dob", dob);
      body.append("nationality", nationality);
      body.append("phone_number", phone_number);
      body.append("state", state);
      body.append("telegram_username", telegram_username);
      body.append("wallet", wallet);
      body.append("wallet_address", wallet_address);
      body.append("zip_code", zip_code);
      file.forEach((f) => body.append("file", f));
      body.append("email", email);
      body.append("identity_type", type);

      dispatch(SubmitKyc(setLoading, body, data, history));
    }
  };

  let maxDate = new Date();
  let year = maxDate.getFullYear();
  let day = maxDate.getDate();
  let month = maxDate.getMonth();

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="page-header page-header-kyc">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-xl-7 text-center">
                <h2 className="page-title">Begin your ID-Verification</h2>
                <p className="large">
                  Verify your identity to participate in tokensale.
                </p>
              </div>
            </div>
          </div>
          {/* <!-- .container --> */}
        </div>
        {/* <!-- .page-header --> */}
        <div className="page-content">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-xl-9">
                <div className="kyc-form-steps card mx-lg-4">
                  <div className="form-step form-step1">
                    <div className="form-step-head card-innr">
                      <div className="step-head">
                        <div className="step-number">01</div>
                        <div className="step-head-text">
                          <h4>Personal Details</h4>
                          <p>
                            Your simple personal information required htmlFor
                            identification
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* <!-- .step-head --> */}
                    <div className="form-step-fields card-innr">
                      <div className="note note-plane note-light-alt note-md pdb-1x">
                        <em className="fas fa-info-circle"></em>
                        <p>
                          Please type carefully and fill out the form with your
                          personal details. Your can’t edit these details once
                          you submitted the form.
                        </p>
                      </div>
                      {/* <KycFormInput
                      
                      onChange={(e) => onChange(e)}
                      value={first_name}
                      name="first_name"
                      label='First Name'
                      error={errors.first_name}
                      /> */}

                      <div class="row">
                        <div class="col-md-6">
                          <div class="input-item input-with-label">
                            <KycFormInput
                              require={"required"}
                              onChange={(e) => onChange(e)}
                              value={formValues.first_name}
                              name="first_name"
                              label="First Name"
                            />
                            {formValues.first_name.length === 0 && (
                              <p className="text-danger">
                                {formErrors.first_name}
                              </p>
                            )}
                          </div>
                        </div>
                        {/* <!-- .col --> */}
                        <div className="col-md-6">
                          <div className="input-item input-with-label">
                            <KycFormInput
                              require={"required"}
                              onChange={(e) => onChange(e)}
                              value={formValues.last_name}
                              name="last_name"
                              label="Last Name"
                            />
                            {formValues.last_name.length === 0 && (
                              <p className="text-danger">
                                {formErrors.last_name}
                              </p>
                            )}
                          </div>
                          {/* <!-- .input-item --> */}
                        </div>
                        {/* <!-- .col --> */}
                        <div className="col-md-6">
                          <div className="input-item input-with-label">
                            <KycFormInput
                              require={"required"}
                              onChange={(e) => onChange(e)}
                              value={formValues.email}
                              type="email"
                              name="email"
                              label="Email Address"
                            />
                            {formValues.email.length === 0 && (
                              <p className="text-danger">{formErrors.email}</p>
                            )}
                          </div>
                          {/* <!-- .input-item --> */}
                        </div>
                        {/* <!-- .col --> */}
                        <div className="col-md-6">
                          <div className="input-item input-with-label">
                            <KycFormInput
                              require={"required"}
                              type="number"
                              onChange={(e) => {
                                onChange(e);
                              }}
                              value={formValues.phone_number}
                              name="phone_number"
                              label="Phone Number"
                              min="0"
                            />
                            {formValues.phone_number.length > 15 && (
                              <p className="text-danger">
                                Phone Number Should be 15 Digits Max
                              </p>
                            )}
                          </div>
                          {/* <!-- .input-item --> */}
                        </div>
                        {/* <!-- .col --> */}
                        <div className="col-md-6">
                          <div className="input-item input-with-label">
                            <KycFormInput
                              max={
                                year +
                                "-" +
                                (month.toString().length < 2
                                  ? "0" + (Number(month) + 1)
                                  : Number(month) + 1) +
                                "-" +
                                day
                              }
                              autoFocus
                              require={"required"}
                              onChange={(e) => onChange(e)}
                              value={formValues.dob}
                              type="date"
                              name="dob"
                              label="Date of Birth"
                            />
                            {formValues.dob.length === 0 && (
                              <p className="text-danger">{formErrors.dob}</p>
                            )}
                          </div>
                          {/* <!-- .input-item --> */}
                        </div>
                        {/* <!-- .col --> */}
                        <div className="col-md-6">
                          <div className="input-item input-with-label">
                            <KycFormInput
                              name="telegram_username"
                              value={formValues.telegram_username}
                              onChange={(e) => onChange(e)}
                              className="input-bordered"
                              type="text"
                              label="Telegram Username"
                            />
                          </div>
                          {/* <!-- .input-item --> */}
                        </div>
                        {/* <!-- .col --> */}
                      </div>
                      {/* <!-- .row --> */}
                      <h4 className="text-secondary mgt-0-5x">Your Address</h4>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="input-item input-with-label">
                            {/* <span className="text-danger">*</span> */}

                            <KycFormInput
                              require={"required"}
                              onChange={(e) => onChange(e)}
                              value={formValues.address}
                              name="address"
                              label="Address Line 1"
                            />
                            {formValues.address.length === 0 && (
                              <p className="text-danger">
                                {formErrors.address}
                              </p>
                            )}
                          </div>
                          {/* <!-- .input-item --> */}
                        </div>
                        {/* <!-- .col --> */}
                        <div className="col-md-6">
                          <div className="input-item input-with-label">
                            <KycFormInput
                              onChange={(e) => onChange(e)}
                              value={formValues.address2}
                              name="address2"
                              label="Address Line 2"
                            />
                          </div>
                          {/* <!-- .input-item --> */}
                        </div>
                        {/* <!-- .col --> */}
                        <div className="col-md-6">
                          <div className="input-item input-with-label">
                            <KycFormInput
                              require={"required"}
                              onChange={(e) => onChange(e)}
                              value={formValues.city}
                              name="city"
                              label="City"
                            />
                            {formValues.city.length === 0 && (
                              <p className="text-danger">{formErrors.city}</p>
                            )}
                          </div>
                          {/* <!-- .input-item --> */}
                        </div>
                        {/* <!-- .col --> */}
                        <div className="col-md-6">
                          <div className="input-item input-with-label">
                            <KycFormInput
                              require={"required"}
                              onChange={(e) => onChange(e)}
                              value={formValues.state}
                              name="state"
                              label="State"
                            />
                            {formValues.state.length === 0 && (
                              <p className="text-danger">{formErrors.state}</p>
                            )}
                          </div>
                          {/* <!-- .input-item --> */}
                        </div>
                        {/* <!-- .col --> */}
                        <div className="col-md-6">
                          <div className="input-item input-with-label">
                            <label
                              htmlFor="nationality"
                              className="input-item-label"
                            >
                              Nationality <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              required
                              onChange={(e) => {
                                setFormValues({
                                  ...formValues,
                                  nationality: e.target.value,
                                });
                              }}
                              list="nationality"
                              name="nationality"
                            />
                            {/* <select
                              required
                              onChange={(e) => {
                                console.log(e.target.value);
                                setFormValues({
                                  ...formValues,
                                  nationality: e.target.value,
                                });
                              }}
                              className="select-bordered select-block"
                              name="nationality"
                              id="nationality"
                            > */}
                            <datalist id="nationality">
                              <option value="" selected disabled></option>
                              <option value="United State">United State</option>
                              <option value="United KingDom">
                                United KingDom
                              </option>
                              <option value="France">France</option>
                              <option value="China">China</option>
                              <option value="Czech Republic">
                                Czech Republic
                              </option>
                              <option value="Colombia">Colombia</option>
                            </datalist>
                            {/* </select> */}
                            {formValues.nationality.length === 0 && (
                              <p className="text-danger">
                                {formErrors.nationality}
                              </p>
                            )}
                          </div>
                          {/* <!-- .input-item --> */}
                        </div>
                        {/* <!-- .col --> */}
                        <div className="col-md-6">
                          <div className="input-item input-with-label">
                            <KycFormInput
                              min="0"
                              require={"required"}
                              type="number"
                              onChange={(e) => {
                                onChange(e);
                              }}
                              value={formValues.zip_code}
                              name="zip_code"
                              label="Zip Code"
                            />
                            {formValues.zip_code.length > 10 && (
                              <p className="text-danger">
                                zipcode should be 10 digit max
                              </p>
                            )}
                          </div>
                          {/* <!-- .input-item --> */}
                        </div>
                        {/* <!-- .col --> */}
                      </div>
                      {/* <!-- .row --> */}
                    </div>
                    {/* <!-- .step-fields --> */}
                  </div>
                  <div className="form-step form-step2">
                    <div className="form-step-head card-innr">
                      <div className="step-head">
                        <div className="step-number">02</div>
                        <div className="step-head-text">
                          <h4>Document Upload</h4>
                          <p>
                            To verify your identity, please upload any of your
                            document
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* <!-- .step-head --> */}
                    <div className="form-step-fields card-innr">
                      <div className="note note-plane note-light-alt note-md pdb-0-5x">
                        <em className="fas fa-info-circle"></em>
                        <p>
                          In order to complete, please upload any of the
                          following personal document.
                        </p>
                      </div>
                      <div className="gaps-2x"></div>
                      <ul
                        className="
                      nav nav-tabs nav-tabs-bordered
                      row
                      flex-wrap
                      guttar-20px
                      "
                        role="tablist"
                      >
                        <li
                          onClick={() =>
                            setFormValues({
                              ...formValues,
                              file: images.passport,
                              type: "passport",
                            })
                          }
                          className="nav-item flex-grow-0"
                        >
                          <a
                            className="nav-link d-flex align-items-center active"
                            data-toggle="tab"
                            href="#passport"
                          >
                            <div className="nav-tabs-icon">
                              <img src={PassportImg} alt="icon" />
                              <img src={PassportImg2} alt="icon" />
                            </div>
                            <span>Passport</span>
                          </a>
                        </li>
                        <li
                          onClick={() =>
                            setFormValues({
                              ...formValues,
                              file: images.nationalId,
                              type: "nationalIdCard",
                            })
                          }
                          className="nav-item flex-grow-0"
                        >
                          <a
                            className="nav-link d-flex align-items-center"
                            data-toggle="tab"
                            href="#national-card"
                          >
                            <div className="nav-tabs-icon">
                              <img src={NationalIdImg} alt="icon" />
                              <img src={NationalIdImg2} alt="icon" />
                            </div>
                            <span>National Card</span>
                          </a>
                        </li>
                        <li
                          onClick={() =>
                            setFormValues({
                              ...formValues,
                              file: images.driving,
                              type: "drivingLicence",
                            })
                          }
                          className="nav-item flex-grow-0"
                        >
                          <a
                            className="nav-link d-flex align-items-center"
                            data-toggle="tab"
                            href="#driver-licence"
                          >
                            <div className="nav-tabs-icon">
                              <img src={LicenceImg} alt="icon" />
                              <img src={LicenceImg2} alt="icon" />
                            </div>
                            <span>Driver’s License</span>
                          </a>
                        </li>
                      </ul>
                      {/* <!-- .nav-tabs-line --> */}
                      <div
                        className="tab-content"
                        id="myTabContent"
                        style={{ paddingTop: "30px" }}
                      >
                        <div
                          className="tab-pane fade show active"
                          id="passport"
                        >
                          <h5 className="text-secondary font-bold">
                            To avoid delays when verifying account, Please make
                            sure bellow:
                          </h5>
                          <ul className="list-check">
                            <li>Chosen credential must not be expired.</li>
                            <li>
                              Document should be good condition and clearly
                              visible.
                            </li>
                            <li>
                              Make sure that there is no light glare on the
                              card.
                            </li>
                          </ul>
                          <div className="gaps-2x"></div>
                          <h5 className="font-mid">
                            Upload Here Your Passport Copy
                          </h5>
                          <div className="row align-items-center">
                            <div className="col-sm-8">
                              <div className="upload-box">
                                <DropzoneArea
                                  showPreviews={true}
                                  showPreviewsInDropzone={false}
                                  dropzoneClass="dropZoneCustom"
                                  filesLimit={1}
                                  acceptedFiles={["image/*"]}
                                  dropzoneText={
                                    "Drag and drop an image here or click"
                                  }
                                  onChange={(e) => {
                                    handleImage(e, "passport");
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-sm-4 d-none d-sm-block">
                              <div className="mx-md-4">
                                <img src={vectorLicence} alt="vector" />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- .tab-pane --> */}
                        <div className="tab-pane fade" id="national-card">
                          <h5 className="text-secondary font-bold">
                            To avoid delays when verifying account, Please make
                            sure bellow:
                          </h5>
                          <ul className="list-check">
                            <li>Chosen credential must not be expaired.</li>
                            <li>
                              Document should be good condition and clearly
                              visible.
                            </li>
                            <li>
                              Make sure that there is no light glare on the
                              card.
                            </li>
                          </ul>
                          <div className="gaps-2x"></div>
                          <h5 className="font-mid">
                            Upload Here Your National id Front Side
                          </h5>
                          <div className="row align-items-center">
                            <div className="col-sm-8">
                              <div className="upload-box">
                                {/* <div className="upload-zone">
                                <div className="dz-message" data-dz-message>
                                  <span className="dz-message-text">
                                    Drag and drop file
                                  </span>
                                  <span className="dz-message-or">or</span>
                                  <button className="btn btn-primary">
                                    SELECT
                                  </button>
                                </div>
                              </div> */}
                                <DropzoneArea
                                  showPreviews={true}
                                  showPreviewsInDropzone={false}
                                  dropzoneClass="dropZoneCustom"
                                  filesLimit={1}
                                  acceptedFiles={["image/*"]}
                                  dropzoneText={
                                    "Drag and drop an image here or click"
                                  }
                                  onChange={(e) => {
                                    handleImage(e, "NICF");
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-sm-4 d-none d-sm-block">
                              <div className="mx-md-4">
                                <img src={vectorLicence} alt="vector" />
                              </div>
                            </div>
                          </div>
                          <div className="gaps-3x"></div>
                          <h5 className="font-mid">
                            Upload Here Your National id Back Side
                          </h5>
                          <div className="row align-items-center">
                            <div className="col-sm-8">
                              <div className="upload-box">
                                {/* <div className="upload-zone">
                                <div className="dz-message" data-dz-message>
                                  <span className="dz-message-text">
                                    Drag and drop file
                                  </span>
                                  <span className="dz-message-or">or</span>

                                  <button className="btn btn-primary">
                                    SELECT
                                  </button>
                                </div>
                              </div> */}
                                <DropzoneArea
                                  showPreviews={true}
                                  showPreviewsInDropzone={false}
                                  dropzoneClass="dropZoneCustom"
                                  filesLimit={1}
                                  acceptedFiles={["image/*"]}
                                  dropzoneText={
                                    "Drag and drop an image here or click"
                                  }
                                  onChange={(e) => {
                                    handleImage(e, "NICB");
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-sm-4 d-none d-sm-block">
                              <div className="mx-md-4">
                                <img src={vectorLicence} alt="vector" />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- .tab-pane --> */}
                        <div className="tab-pane fade" id="driver-licence">
                          <h5 className="text-secondary font-bold">
                            To avoid delays when verifying account, Please make
                            sure bellow:
                          </h5>
                          <ul className="list-check">
                            <li>Chosen credential must not be expaired.</li>
                            <li>
                              Document should be good condition and clearly
                              visible.
                            </li>
                            <li>
                              Make sure that there is no light glare on the
                              card.
                            </li>
                          </ul>
                          <div className="gaps-2x"></div>
                          <h5 className="font-mid">
                            Upload Here Your Driving Licence Copy
                          </h5>
                          <div className="row align-items-center">
                            <div className="col-sm-8">
                              <div className="upload-box">
                                {/* <div className="upload-zone">
                                <div className="dz-message" data-dz-message>
                                  <span className="dz-message-text">
                                    Drag and drop file
                                  </span>
                                  <span className="dz-message-or">or</span>
                                  <button className="btn btn-primary">
                                    SELECT
                                  </button>
                                </div>
                              </div> */}
                                <DropzoneArea
                                  showPreviews={true}
                                  showPreviewsInDropzone={false}
                                  dropzoneClass="dropZoneCustom"
                                  filesLimit={1}
                                  acceptedFiles={["image/*"]}
                                  dropzoneText={
                                    "Drag and drop an image here or click"
                                  }
                                  onChange={(e) => {
                                    handleImage(e, "driving");
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-sm-4 d-none d-sm-block">
                              <div className="mx-md-4">
                                <img src={vectorLicence} alt="vector" />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- .tab-pane --> */}
                      </div>
                      {/* <!-- .tab-content --> */}
                    </div>
                    {/* <!-- .step-fields --> */}
                  </div>
                  <div className="form-step form-step3">
                    <div className="form-step-head card-innr">
                      <div className="step-head">
                        <div className="step-number">03</div>
                        <div className="step-head-text">
                          <h4>Your Paying Wallet</h4>
                          <p>
                            Submit your wallet address that you are going to
                            send funds
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* <!-- .step-head --> */}
                    <div className="form-step-fields card-innr">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="input-item input-with-label">
                            <label
                              htmlFor="swalllet"
                              className="input-item-label"
                            >
                              Select Wallet
                            </label>
                            <select
                              required
                              className="select-bordered select-block"
                              name="wallet"
                              id="wallet"
                              onChange={(e) => {
                                setFormValues({
                                  ...formValues,
                                  wallet: e.target.value,
                                });
                              }}
                            >
                              <option value="" selected disabled></option>
                              <option value="ethereum">Ethereum</option>
                              <option value="dashcoin">DashCoin</option>
                              <option value="bitcoin">BitCoin</option>
                            </select>
                            {formValues.wallet.length === 0 && (
                              <p className="text-danger">{formErrors.wallet}</p>
                            )}
                          </div>
                          {/* <!-- .input-item --> */}
                        </div>
                        {/* <!-- .col --> */}
                      </div>
                      {/* <!-- .row --> */}
                      <div className="input-item input-with-label">
                        <label
                          htmlFor="token-address"
                          className="input-item-label"
                        >
                          Your Address htmlFor tokens:
                        </label>
                        <input
                          required
                          className="input-bordered"
                          type="text"
                          id="wallet_address"
                          name="wallet_address"
                          value={wallet_address}
                          onChange={(e) => onChange(e)}
                        />
                        {formValues.wallet_address.length === 0 && (
                          <p className="text-danger">
                            {formErrors.wallet_address}
                          </p>
                        )}

                        <span className="input-note">
                          Note: Address should be ERC20-compliant.
                        </span>
                      </div>
                      {/* <!-- .input-item --> */}
                    </div>
                    {/* <!-- .step-fields --> */}
                  </div>
                  <div className="form-step form-step-final">
                    <div className="form-step-fields card-innr">
                      <div className="input-item">
                        <input
                          className="input-checkbox input-checkbox-md"
                          id="term-condition"
                          type="checkbox"
                          onChange={() => setCheck(!check)}
                        />
                        <label htmlFor="term-condition">
                          I have read the <a href="#">Terms of Condition</a> and
                          <a href="#"> Privary Policy.</a>
                        </label>
                      </div>
                      <div className="input-item">
                        <input
                          className="input-checkbox input-checkbox-md"
                          id="info-currect"
                          type="checkbox"
                          onChange={() => setCheck2(!check2)}
                        />
                        <label htmlFor="info-currect">
                          All the personal information I have entered is
                          correct.
                        </label>
                      </div>
                      <div className="gaps-1x"></div>

                      <button
                        disabled={!(check && check2) || loading}
                        type="submit"
                        className="btn btn-primary"
                      >
                        Process htmlFor Verify{" "}
                        {loading && (
                          <BtnLoading height={"20px"} width={"20px"} />
                        )}
                      </button>
                      {/* <button onClick={onClick} type="disabled"></button> */}
                    </div>
                    {/* <!-- .step-fields --> */}
                  </div>
                </div>

                {/* <!-- .card --> */}
              </div>
            </div>
          </div>

          {/* <!-- .container --> */}
        </div>

        {/* <!-- .page-content -->   */}
      </form>
    </>
  );
};

export default withMainLayout(KycForm);
