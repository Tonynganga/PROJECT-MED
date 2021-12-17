import React ,{useEffect} from 'react';
import {connect} from 'react-redux';
import {LogoutAction} from '../../actions/auth';
import { Redirect } from "react-router-dom";
import propTypes from 'prop-types';
function Logout(props) {
    useEffect(() => {  
    props.LogoutAction();  
});  
    return  <Redirect to="/" />;
}
Logout.propTypes = {
    LogoutAction: propTypes.func.isRequired,
    isAuthenticated: propTypes.bool.isRequired,

  };
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
  });
export default connect (mapStateToProps, {LogoutAction}) (Logout);
