import React from "react";
import { Link } from "react-router-dom";
import "../Blog.css";
import {HTTP_API_PATH,capitalizeFirstLetter,monthNames} from '../../../utils'

function Post({ img,blog }) {
    let datePosted 
    
    datePosted = new Date(blog.date_posted)
    return (
        <div className="post">
            <img
                className="postImg"                
                src={blog.thumbnail?HTTP_API_PATH + blog.thumbnail:img}
                alt=""
            />
            <div className="postInfo">
                <div className="postCats">

                </div>
                <span className="postTitle">
                    <h3 className="link">
                        {blog.blog_title?capitalizeFirstLetter(blog.blog_title):"Lorem ipsum dolor sit amet"}
                    </h3>
                </span>
                <div className="authorprofile">
                    <div className="authorimgand">
                        <img
                            className="topImg"
                            src={HTTP_API_PATH + blog.blogger_profile_pic}
                            alt=""
                        />
                        <div className="authorname">
                        <span>{blog?blog.blogger_first_name+" " +blog.blogger_last_name:"Author Name"}</span>
                        </div>
                        
                    </div>

                    <div className="authorhour">
                        <span className="postDate">{blog?monthNames[datePosted.getMonth()]+" "+datePosted.getDate():"1 hour ago"}</span>
                        <span className="postDate">{blog?blog.category:"Dentry"}</span>
                    </div>


                </div>



            </div>
            <p className="postDesc">
            {blog?blog.excerpt:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumendaia architecto deserunt deleniti? Labore ipsum aspernatur magnam"}
            </p>
            <Link to={{
                            pathname: '/blogdetail',
                            state: {
                                blog
                            },
                        }} >Continue reading</Link>
            
        </div>
    );
}

export default Post;
