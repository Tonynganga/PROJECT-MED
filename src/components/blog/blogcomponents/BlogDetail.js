
import BlogSidebar from "./BlogSidebar";
import "../Blog.css";
import SinglePost from "./SinglePost";
import Blobar from "./Blogbar";
import Footer from "../../Footer";

function BlogDetail() {
    return (
        <div>
            <Blobar />
            <div className="single">
                <div>
                <SinglePost />
                </div>
                <div>
                <BlogSidebar />
                </div>
                
                
            </div>
            <Footer/>
        </div>

    );
}

export default BlogDetail;
