import React from "react";
import { Link } from "react-router-dom";
import "../Blog.css";

function BlogSidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Link className="link" to="">
              General
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Music">
              Dentry
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Sport">
              Neurological
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Style">
              Urogenital
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Tech">
              Oral
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Cinema">
              Dermatology
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Cinema">
            Psychiatry
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Cinema">
            Surgery
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Cinema">
            Urology
            
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Cinema">
            Ophthalmology
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Cinema">
            Allergy and immunology
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Cinema">
            Pathology
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Cinema">
            Pediatrics
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Cinema">
            Cardiology
            </Link>
          </li>
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}


export default BlogSidebar;
