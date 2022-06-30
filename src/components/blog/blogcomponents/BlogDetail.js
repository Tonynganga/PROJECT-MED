
import BlogSidebar from "./BlogSidebar";
import "../Blog.css";
import SinglePost from "./SinglePost";
import Blobar from "./Blogbar";
import Footer from "../../Footer";

function BlogDetail(props) {
    const { blog } = props.location.state
    return (
        <div>
            <Blobar />
            <div className="single">
                <div className="blogdetailsingle">
                    <SinglePost blog={blog} />
                </div>
                <div className="blogdetailsisebar">
                    <BlogSidebar />
                </div>


            </div>
            <Footer />
        </div>

    );
}

export default BlogDetail;
