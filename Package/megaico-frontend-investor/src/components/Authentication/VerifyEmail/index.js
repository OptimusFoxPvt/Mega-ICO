import React, { useEffect } from "react";
import { useHistory } from "react-router";

import { verifyEmail } from "../../../Redux/actions/actions";
import Loader from "../../Loader/Loader";
const VerifyEmail = (props) => {
  const id = props.match.params.id;
  const history = useHistory();

  useEffect(() => {
    verifyEmail(id, history);
  }, []);

  return (
    <>
      <Loader />
    </>
  );
};

export default VerifyEmail;
