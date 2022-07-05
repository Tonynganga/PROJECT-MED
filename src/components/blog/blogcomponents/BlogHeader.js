import React from "react";
import "../Blog.css";


function BlogHeader() {
  return (
    <div className="blog_header">
      <div className="blog_headerTitles">
        <span className="blog_headerTitleSm">Welcome to:</span>
        <span className="blog_headerTitleLg">PROJECT MED BLOG</span>
      </div>
      <img
        className="blog_headerImg"
        src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt=""
      />
    </div>
  );
}


export default BlogHeader;
