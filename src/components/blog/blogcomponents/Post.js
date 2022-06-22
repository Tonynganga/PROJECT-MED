import React from "react";
import { Link } from "react-router-dom";
import "../Blog.css";

function Post({ img }) {
    return (
        <div className="post">
            <img
                className="postImg"
                src={img}
                alt=""
            />
            <div className="postInfo">
                <div className="postCats">

                </div>
                <span className="postTitle">
                    <h3 className="link">
                        Lorem ipsum dolor sit amet
                    </h3>
                </span>
                <div className="authorprofile">
                    <div className="authorimgand">
                        <img
                            className="topImg"
                            src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""
                        />
                        <div className="authorname">
                        <span>Author Name</span>
                        </div>
                        
                    </div>

                    <div className="authorhour">
                        <span className="postDate">1 hour ago</span>
                        <span className="postDate">Dentry</span>
                    </div>


                </div>



            </div>
            <p className="postDesc">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
                officia architecto deserunt deleniti? Labore ipsum aspernatur magnam
                fugiat, reprehenderit praesentium blanditiis quos cupiditate ratione
                atque, exercitationem quibusdam, reiciendis odio laboriosam?
            </p>
            <Link to={{
                pathname: '/blogdetail',

            }} className="stretched-link">Continue reading</Link>
        </div>
    );
}

export default Post;
