import React from "react";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";
import browserRoute from "../../Routes/browserRoutes";

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  isLoading,
  ...rest
}) => {
  const token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated || token ? (
          // true || true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: browserRoute.SIGNIN,
            }}
          />
        )
      }
    />
  );
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
