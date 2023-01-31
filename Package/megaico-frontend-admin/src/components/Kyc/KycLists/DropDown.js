import { useState } from "react";
import { Link } from "react-router-dom";
import browserRoute from "../../../Routes/browserRoutes";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import ConfirmationModal from "./confirmModal";
import { useHistory } from "react-router";
function DropDown({ item, from }) {
  const history = useHistory();
  console.log(item);
  const [status, setStatus] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(status);
  return (
    <>
      <div>
        {status !== null && <ConfirmationModal status={status} id={item._id} />}
        <em
          size="small"
          className="btn btn-light-alt btn-xs btn-icon toggle-tigger"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <em className="ti ti-more-alt"></em>
        </em>

        <Menu
          transformOrigin={{ horizontal: "right", vertical: "center" }}
          anchorOrigin={{ horizontal: "left", vertical: "center" }}
          className="list-group"
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <div
            style={{ cursor: "pointer" }}
            className="dropdown-content-top-left"
          >
            <ul className="dropdown-list">
              {from !== "Details" && (
                <li>
                  <Link
                    to={{
                      pathname: `${browserRoute.KYC_DETAILS_BTN}${item._id}`,
                    }}
                  >
                    <em className="ti ti-eye"></em> View Details
                  </Link>
                </li>
              )}
              {from === "Details" && (
                <li>
                  <a onClick={() => history.goBack()}>
                    <em className="fas fa-arrow-left mr-3"></em> Go Back{" "}
                  </a>
                </li>
              )}
              {item.kyc_status === "pending" && (
                <>
                  {" "}
                  <li>
                    <a
                      data-toggle="modal"
                      data-target="#Kyc-confirm"
                      onClick={() => {
                        handleClose();
                        setStatus("approved");
                      }}
                    >
                      <em className="ti ti-check"></em> Approve
                    </a>
                  </li>
                  <li>
                    <a
                      data-toggle="modal"
                      data-target="#Kyc-confirm"
                      onClick={() => {
                        handleClose();
                        setStatus("rejected");
                      }}
                    >
                      <em className="ti ti-na"></em> Reject
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </Menu>
      </div>
      {/* <div className="relative d-inline-block">
        <a
          href="#"
          className="btn btn-light-alt btn-xs btn-icon toggle-tigger"
          onClick={(e) => toogleMenuBtn(e)}
        >
          <em className="ti ti-more-alt"></em>
        </a>

        <div
          className={`${
            toggleMenu ? null : "toggle-class"
          } dropdown-content dropdown-content-top-left`}
        >
          <ul className="dropdown-list">
            <li>
              <Link to={`${browserRoute.KYC_DETAILS_BTN}${item}`}>
                <em className="ti ti-eye"></em> View Details
              </Link>
            </li>
            <li>
              <a href="#">
                <em className="ti ti-check"></em> Approve
              </a>
            </li>
            <li>
              <a href="#">
                <em className="ti ti-na"></em> Reject
              </a>
            </li>
          </ul>
        </div>
      </div> */}
    </>
  );
}

export default DropDown;
