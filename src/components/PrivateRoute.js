import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";

function PrivateRoutes({ component: Component, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isLoading) {
          return <h1>Loading.....</h1>;
        } else if (!auth.isAuthenticated) {
          localStorage.setItem(
            "next",
            JSON.stringify({props})
          );
          return <Redirect to="/loginsignup" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  )
}

PrivateRoutes.propTypes = {
  auth: propTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoutes);
