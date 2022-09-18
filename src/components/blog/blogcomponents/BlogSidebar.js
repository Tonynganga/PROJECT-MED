import React from "react";
import "../Blog.css";

function BlogSidebar(props) {
  return (
    <div className="blog_sidebar">
      {props.children?props.children:""}
      <div className="blog_sidebarItem">
        <span className="blog_sidebarTitle">ABOUT US</span>
        <img
          src="https://www.aims-co.com/wp-content/uploads/2016/12/Health-insurance-clipart.jpg"
          alt=""
        />
        <p>
        We make all kinds of awesome blog topics about health issues and concerns.
        </p>
      </div>
      
      <div className="blog_sidebarItem">
        <span className="blog_sidebarTitle">FOLLOW US</span>
        <div className="blog_sidebarSocial">
          <i className="blog_sidebarIcon fab fa-facebook-square"></i>
          <i className="blog_sidebarIcon fab fa-instagram-square"></i>
          <i className="blog_sidebarIcon fab fa-pinterest-square"></i>
          <i className="blog_sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}


export default BlogSidebar;
