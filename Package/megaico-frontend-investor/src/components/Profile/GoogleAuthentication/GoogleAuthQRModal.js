import React, { useEffect, useState } from "react";
import { Button, Modal, Col, Card, Form, Row } from "react-bootstrap";
import InfoIcon from "./InfoIcon";
import { useDispatch } from "react-redux";
import { update2FaStatus } from "../../../Redux/actions/actions";
import { loadUser } from "../../../Redux/actions/actions";
import { useSelector } from "react-redux";
const GoogleAuthQRModal = ({
  showGoogleAuthQRcode,
  setShowGoogleAuthQRcode,
}) => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const [status, setStatus] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShowGoogleAuthQRcode(false);
  };

  const onEnable2Fa = async (e) => {
    e.preventDefault();
    dispatch(update2FaStatus({ status: true, setLoading }));
  };

  useEffect(() => {
    setStatus(auth.userDetails.is_google_authentication_on);
  }, []);
  return (
    <Modal
      size="md"
      show={showGoogleAuthQRcode}
      onHide={handleClose}
      style={{ opacity: 1 }}
      centered
    >
      <Card>
        <Card.Header className="card-header-font">
          2 Factor Authentication
          <button type="button" className="close" onClick={handleClose}>
            <span className="font-18">&times;</span>
          </button>
        </Card.Header>
        <Card.Body>
          <div className="d-flex align-items-center">
            <div className="info-icon mr-6">
              <InfoIcon />
            </div>
            <p>
              Before Turning on 2FA, write down the 16 digit key and put keep it
              in a safe place. If your phone gets lost,stolen,or erased, you
              will need this key to get back into your account
            </p>
          </div>
          <div className="d-flex mt-3">
            <Card.Img
              style={{ width: "120px", float: "right" }}
              src={auth.googleAuth?.googleAuth?.dataURL}
              className="qrcode-img"
              alt="QR-CODE"
            />
            <p>
              In order to use 2FA, scan the QR Code to the right into the google
              authenticator app on your phone, or enter the 16-digit key that
              appears under the QR Code
            </p>
          </div>
          {/* <Divider className="mt-5 mb-3" /> */}
          <hr />
          <div style={{ textAlign: "center" }}>
            <span className="key-style"> 16-digit key:</span>{" "}
            <span className="key-digit-style">
              {auth?.googleAuth?.googleAuth?.tfaToken}
            </span>
          </div>
          {/* <Divider className="mt-3 mb-5" /> */}
          <hr />
          <Form onSubmit={onEnable2Fa}>
            <Row>
              <Col xs={12}>
                <Form.Group
                  controlId="formBasicChecbox"
                  style={{ textAlign: "center" }}
                >
                  <img
                    src="https://www.freeiconspng.com/uploads/status-warning-icon-png-29.png"
                    width="35"
                  />{" "}
                  <Form.Check
                    style={{ color: "red", textAlign: "center" }}
                    type="checkbox"
                    label="I have backed up my 16 digit key"
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <div style={{ textAlign: "center", marginTop: "5px" }}>
                  <Button
                    // variant="primary"
                    className="order-sm-first btn btn-primary b-button-hovereffect"
                    type="submit"
                  >
                    {status ? "Disable 2FA" : "Enable 2FA"}
                    {loading ? (
                      <>
                        <i
                          class="spinner-border text-light ml-3"
                          style={{ width: "20px", height: "20px" }}
                          role="status"
                        >
                          <span class="sr-only"></span>
                        </i>
                      </>
                    ) : null}
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Modal>
  );
};

export default GoogleAuthQRModal;
