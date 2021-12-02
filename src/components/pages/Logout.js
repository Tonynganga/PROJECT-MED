import React ,{useEffect} from 'react';
import {connect} from 'react-redux';
import {LogoutAction} from '../../actions/auth';
import { Redirect } from "react-router-dom";
function Logout(props) {
    useEffect(() => {  
    props.LogoutAction();  
});  
    return  <Redirect to="/" />;
}

export default connect (null, {LogoutAction}) (Logout);
