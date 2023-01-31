import React from "react";
import withAuthLayout from "../../HOC/withAuthLayout";

const SignUpSuccess = () => {
  return (
    <div class="page-ath-text">
      <h2 class="page-ath-heading">
        Thank you! <small>Your sign-up process is almost done.</small>{" "}
        <span class="text-success">Please check your mail and verify.</span>
      </h2>
    </div>
  );
};

export default withAuthLayout(SignUpSuccess);
