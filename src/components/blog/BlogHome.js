import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from "react-router";
import BlogHeader from "./blogcomponents/BlogHeader";
import Posts from "./blogcomponents/Posts";
import  propTypes from 'prop-types'
import "./Blog.css";
import Blobar from "./blogcomponents/Blogbar";
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Footer from "../Footer";

function BlogHome() {
    const location = useLocation();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if(!isAuthenticated){
        return <Redirect to="/" />;
    }
    console.log(location);
    return (
        <div className="bloghome">
            <Blobar />
            <div className="blogheader">
                <BlogHeader />
            </div>
            <div >
                <Posts />
            </div>
            <Footer />
        </div>
    );
}

export default BlogHome; 
