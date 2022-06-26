import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../Blog.css";
import propTypes from 'prop-types';
import { getProfile, updateProfile } from '../../../actions/profile';
import { connect } from 'react-redux';
import { HTTP_API_PATH } from '../../../utils'

function Blobar(props) {
  useEffect(()=>{
    props.getProfile()
  },[])  
  const user = true;
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/newblog">
              HOME
            </Link>
          </li>

          <li className="topListItem">
            <Link className="link" to="/writeblog">
              WRITE
            </Link>
          </li>

        </ul>
      </div>
      <div className="topRight">
        {/* <Link className="link" to="/settings"> */}
        <img
          className="topImg"
          src={HTTP_API_PATH + props.imageUrl}
          // src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        {/* </Link> */}


      </div>
    </div>
  );
}

Blobar.propTypes = {
  imageUrl: propTypes.string.isRequired,
};
const mapStateToProps = state => ({
  imageUrl: state.profile.image,
});

export default connect(mapStateToProps, {getProfile})(Blobar) 

