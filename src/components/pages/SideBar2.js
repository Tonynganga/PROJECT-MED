import React ,{useEffect,useState}from "react";
import "./Main.css";
import { SidebarData2 } from "./SidebarData2";
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profile';

const SideBar2 = props => {
  const [usernameState, setUsername] = useState("");
  const [addressState, setAddress] = useState("");
  const [imageState, setImage] = useState("");
  useEffect(
    () => {
        props.getProfile()
        if (props.user) {
            const { user } = props
            setUsername(user.username)
            setAddress(user.address)            
        }
    },
    [props.user]
);
useEffect(() => {
  setImage('http://localhost:8000' + props.imageUrl)
}, [props.imageUrl])
  return (
    <div className="sidebar">
      <div className="image__view">
      <img src={imageState} id="img" alt="#"width="60px" height="60px"/>
        <div className="name__doctor">
          <h4 className="doctor_profilename">{usernameState?usernameState:""}</h4>
          <p className="doctor_address">{addressState?addressState:""}</p>
        </div>
      </div>
      <ul className="SidebarList">
          {SidebarData2.map((val, key) => {
              return (<li 
                        key={key}
                        className="row" 
                        id={window.location.pathname === val.link ? "active": ""}
                        onClick={() => {window.location.pathname = val.link   }}>
                  
                  <div id="icon">{val.icon}</div>
                  <div id="title">{val.title}</div>
              </li>
              );
        })}
      </ul>
    </div>
  );
};

SideBar2.propTypes = {
  imageUrl: propTypes.string.isRequired,
  user: propTypes.object.isRequired,
  getProfile: propTypes.func.isRequired,
};
const mapStateToProps = state => ({
  imageUrl: state.profile.image,
  user: state.auth.user
});

export default connect(mapStateToProps, { getProfile})(SideBar2)