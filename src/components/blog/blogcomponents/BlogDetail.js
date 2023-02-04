import React, { useState, useEffect, useContext } from 'react';
import BlogSidebar from "./BlogSidebar";
import "../Blog.css";
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SinglePost from "./SinglePost";
import Blobar from "./Blogbar";
import Footer from "../../Footer";

function BlogDetail(props) {
    const { blog } = props.location.state
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);


    if (!isAuthenticated) {
        return <Redirect to="/" />;
      }
    return (
        <div>
            <Blobar />
            <div className="blog_single">
                <div className="blog_detailsingle">
                    <SinglePost blog={blog} />
                </div>
                <div className="blog_detailsidebar">
                    <BlogSidebar />
                </div>


            </div>
            <Footer />
        </div>

    );
}

export default BlogDetail;
