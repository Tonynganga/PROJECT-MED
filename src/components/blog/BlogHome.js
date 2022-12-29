import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from "react-router";
import BlogHeader from "./blogcomponents/BlogHeader";
import Posts from "./blogcomponents/Posts";
import  propTypes from 'prop-types'
import "./Blog.css";
import Blobar from "./blogcomponents/Blogbar";
import Footer from "../Footer";

function BlogHome() {
    const location = useLocation();
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
