import { useLocation } from "react-router";
import BlogHeader from "./blogcomponents/BlogHeader";
import Posts from "./blogcomponents/Posts";
import BlogSidebar from "./blogcomponents/BlogSidebar";
import "./Blog.css";
import Blobar from "./blogcomponents/Blogbar";

function BlogHome() {
    const location = useLocation();
    console.log(location);
    return (
        <div className="bloghome">
            <Blobar />
            <div className="blogheader">
                <BlogHeader />
            </div>
            <div className="bloghome-container">
                <div className="bloghome-posts">
                    <Posts />
                </div>
                <div className="bloghome-sidebar">
                    <BlogSidebar />
                </div>
            </div>
        </div>
    );
}

export default BlogHome; 
