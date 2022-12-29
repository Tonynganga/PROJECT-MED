import React from "react";
import { Link } from "react-router-dom";
import "../Blog.css";
import { HTTP_API_PATH, capitalizeFirstLetter, monthNames } from '../../../utils'

function Post({ img, blog }) {
    let datePosted

    datePosted = new Date(blog.date_posted)
    return (
        <div className="blog_post">
            <img
                className="blog_postImg"
                src={blog.thumbnail ? HTTP_API_PATH + blog.thumbnail : img}
                alt=""
            />
            <div className="blog_postInfo">
                <div className="blog_postCats">

                </div>
                <span className="blog_postTitle">
                    <h3 className="link">
                        {blog.blog_title ? capitalizeFirstLetter(blog.blog_title) : "Lorem ipsum dolor sit amet"}
                    </h3>
                </span>
                <div className="blog_authorprofile">
                    <div className="blog_authorimgand">
                        <img
                            className="blog_topImg"
                            src={HTTP_API_PATH + blog.blogger_profile_pic}
                            alt=""
                        />
                        <div className="blog_authorname">
                            <span>{blog ? blog.blogger_first_name + " " + blog.blogger_last_name : "Author Name"}</span>
                        </div>

                    </div>

                    <div className="blog_authorhour">
                        <span className="blog_postDate">{blog ? monthNames[datePosted.getMonth()] + " " + datePosted.getDate() : "1 hour ago"}</span>
                        <span className="blog_postDate">{blog ? blog.category : "Dentry"}</span>
                    </div>


                </div>



            </div>
            <p className="blog_postDesc">
                {blog ? blog.excerpt : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumendaia architecto deserunt deleniti? Labore ipsum aspernatur magnam"}
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
