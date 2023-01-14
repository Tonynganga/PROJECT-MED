import React, { useEffect,useContext } from 'react';
import { connect } from 'react-redux';
import { LogoutAction } from '../../actions/auth';
import { Redirect } from "react-router-dom";
import { WebSocketService } from '../../websocket';
function Logout(props) {
    const ws = useContext(WebSocketService);
    useEffect(() => {
        ws.closeWsConnection()
        props.LogoutAction();
    }, []);
    return <Redirect to="/" />;
}

export default connect(null, { LogoutAction })(Logout);
