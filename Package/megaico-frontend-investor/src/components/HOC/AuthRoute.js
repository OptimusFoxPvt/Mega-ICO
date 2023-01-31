import React from "react";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";
import browserRoute from "../../Routes/browserRoutes";

const AuthRoute = ({
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
        !token || !isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: browserRoute.DASHBOARD,
              state: { from: props.location },
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

export default connect(mapStateToProps)(AuthRoute);
