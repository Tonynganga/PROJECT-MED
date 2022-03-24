import React ,{useEffect,useState}from "react";
// import "./Main.css";
import "./SideBar.css";
import propTypes from 'prop-types';
import { SidebarData } from "./SidebarData";
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profile';
import {NavLink} from 'react-router-dom'

const SideBar = props => {
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
        <div className="name__patient">
        <h4 >{usernameState?usernameState:""}</h4>
          <p>{addressState?addressState:""}</p>
        </div>
      </div>
      <div className="sidebar__list">
        <ul className="SidebarList">
          {SidebarData.map((val, key) => {
            return (
              <NavLink style={{ textDecoration: 'none' }} exact to={val.link}>
            <li
              key={key}
              className="row"
              id={window.location.pathname === val.link ? "active" : ""}
              >

              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </li>
            </NavLink>
            );
          })}
        </ul>
      </div>

    </div>
  );
};

SideBar.propTypes = {
  imageUrl: propTypes.string.isRequired,
  user: propTypes.object.isRequired,
  getProfile: propTypes.func.isRequired,
};
const mapStateToProps = state => ({
  imageUrl: state.profile.image,
  user: state.auth.user
});

export default connect(mapStateToProps, { getProfile})(SideBar)
