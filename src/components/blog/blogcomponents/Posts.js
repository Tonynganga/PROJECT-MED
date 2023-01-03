import React, { useState, useEffect, useContext } from 'react';
import Post from "./Post";
import BlogSidebar from "../blogcomponents/BlogSidebar";
import "../Blog.css";
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBlogs } from '../../../actions/blogs';
import { WebSocketService } from '../../../websocket';


const Posts = (props) => {
  const ws = useContext(WebSocketService);
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [category, setCategory] = useState("all");
  // const [featuredBlog, setFeaturedBlog] = useState([]);

  useEffect(() => {
    // props.getBlogs()
    ws.connectWsBlog()
    ws.sendMessage('get_blogs', {})
  }, [])
  useEffect(() => {
    if (props.blogs.length > 0) {
      // setFeaturedBlog(props.blogs[props.blogs.length - 1])
      setBlogs(props.blogs)
      setFilteredBlogs(props.blogs)
      console.log(blogs)
    }
  }, [props.blogs])

  useEffect(() => {
    if (category != "all")
      setFilteredBlogs(blogs.filter(elem => elem.category === category))
    else
      setFilteredBlogs(blogs)
  }, [category])




  return (
    <div className="bloghome-container d-flex justify-content-between">
      <div className="bloghome-posts">
        <div className="blog_posts">
          {/* <Post img="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
      <Post img="https://images.pexels.com/photos/6758029/pexels-photo-6758029.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
      <Post img="https://images.pexels.com/photos/6711867/pexels-photo-6711867.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"/>
      <Post img="https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"/>
      <Post img="https://images.pexels.com/photos/4916559/pexels-photo-4916559.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"/>
      <Post img="https://images.pexels.com/photos/4916559/pexels-photo-4916559.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"/> */}
          {filteredBlogs.map(blog => (<Post key={blog.id} blog={blog} img="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />))}
        </div>
      </div>
      <div className="bloghome-sidebar">
        <BlogSidebar>
          <div className="blog_sidebarItem">
            <span className="blog_sidebarTitle">SELECT CATEGORY</span>
            <ul className="blog_sidebarList">
              <li className="sidebarListItem">
                <div onClick={(e) => { e.preventDefault(); setCategory("all") }} className={category === "all" ? "text-dark" : "text-primary"}>
                  All
                </div>

              </li>
              <li className="sidebarListItem">
                <div onClick={() => setCategory("general")} className={category === "general" ? "text-dark" : "text-primary"}>
                  General
                </div>
              </li>
              <li className="sidebarListItem">
                <div onClick={() => setCategory("dentry")} className={category === "dentry" ? "text-dark" : "text-primary"}>
                  Dentry
                </div>
              </li>
              <li className="sidebarListItem">
                <div onClick={() => setCategory("neurological")} className={category === "neurological" ? "text-dark" : "text-primary"}>
                  Neurological
                </div>
              </li>
              <li className="sidebarListItem">
                <div onClick={() => setCategory("urogenital")} className={category === "urogenital" ? "text-dark" : "text-primary"}>
                  Urogenital
                </div>
              </li>
              <li className="sidebarListItem">
                <div onClick={() => setCategory("oral")} className={category === "oral" ? "text-dark" : "text-primary"}>
                  Oral
                </div>
              </li>
              <li className="sidebarListItem">
                <div onClick={() => setCategory("dermatology")} className={category === "dermatology" ? "text-dark" : "text-primary"}>
                  Dermatology
                </div>
              </li>
              <li className="sidebarListItem">
                <div onClick={() => setCategory("psychiatry")} className={category === "psychiatry" ? "text-dark" : "text-primary"}>
                  Psychiatry
                </div>
              </li>
              <li className="sidebarListItem">
                <div onClick={() => setCategory("surgery")} className={category === "surgery" ? "text-dark" : "text-primary"}>
                  Surgery
                </div>
              </li>
              <li className="sidebarListItem">
                <div onClick={() => setCategory("urology")} className={category === "urology" ? "text-dark" : "text-primary"}>
                  Urology

                </div>
              </li>
              <li className="sidebarListItem">
                <div onClick={() => setCategory("ophthalmology")} className={category === "ophthalmology" ? "text-dark" : "text-primary"}>
                  Ophthalmology
                </div>
              </li>
              <li className="sidebarListItem">
                <div onClick={() => setCategory("allergy and immunology")} className={category === "allergy and immunology" ? "text-dark" : "text-primary"}>
                  Allergy and immunology
                </div>
              </li>
              <li className="sidebarListItem">
                <div onClick={() => setCategory("pathology")} className={category === "pathology" ? "text-dark" : "text-primary"}>
                  Pathology
                </div>
              </li>
              <li className="sidebarListItem">
                <div onClick={() => setCategory("pediatrics")} className={category === "pediatrics" ? "text-dark" : "text-primary"}>
                  Pediatrics
                </div>
              </li>
              <li className="sidebarListItem">
                <div onClick={() => setCategory("cardiology")} className={category === "cardiology" ? "text-dark" : "text-primary"}>
                  Cardiology
                </div>
              </li>
            </ul>
          </div>
        </BlogSidebar>
      </div>
    </div>
  );
}

Posts.propTypes = {
  blogs: propTypes.array.isRequired,
  getBlogs: propTypes.func.isRequired,
};
const mapStateToProps = state => ({
  blogs: state.blogs.blogs,
});

export default connect(mapStateToProps, { getBlogs })(Posts)


