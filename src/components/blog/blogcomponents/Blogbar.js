import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import "../Blog.css";
import propTypes from 'prop-types';
import { getProfile, updateProfile } from '../../../actions/profile';
import { connect } from 'react-redux';
import { HTTP_API_PATH } from '../../../utils'

function Blobar(props) {
  useEffect(() => {
    props.getProfile()
  }, [])
  const user = true;

  const backHome = () => {
    if (props.isAuthenticated) {
      if (props.user && props.user.is_patient) {
        return <Redirect to="/patienthomepage" />;
      }
      else return <Redirect to="/doctorhomepage" />;

    }


  };
  return (
    <div className="blog_top">
      <div className="blog_topLeft">
        <i className="blog_topIcon fab fa-facebook-square"></i>
        <i className="blog_topIcon fab fa-instagram-square"></i>
        <i className="blog_topIcon fab fa-pinterest-square"></i>
        <i className="blog_topIcon fab fa-twitter-square"></i>
      </div>
      <div className="blog_topCenter">
        <ul className="blog_topList">
          <li className="blog_topListItem">
            {/* If the user is a patient return to patient homepage else return to dactorhomepage */}
            <Link className="blog_link" to={props.user && props.user.is_patient?"/patienthomepage":"/doctorhomepage"}>
              HOME
            </Link>
          </li>
          <li className="blog_topListItem">
            <Link className="blog_link" to="/newblog">
              BLOGS
            </Link>
          </li>

         {props.user &&!props.user.is_patient? <li className="blog_topListItem">
            <Link className="blog_link" to="/writeblog">
              WRITE
            </Link>
          </li>:""}

        </ul>
      </div>
      <div className="blog_topRight">
        {/* <Link className="link" to="/settings"> */}
        <img
          className="blog_topImg"
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
  isAuthenticated: propTypes.bool.isRequired,
  user: propTypes.object.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  imageUrl: state.profile.image,
  user: state.auth.user
});

export default connect(mapStateToProps, { getProfile })(Blobar)

