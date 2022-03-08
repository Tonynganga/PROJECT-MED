import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BlogNavbar from '../BlogNavbar';

function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [featuredBlog, setFeaturedBlog] = useState([]);

    //     useEffect(() => {
    //         const fetchData = async () => {
    //             try {
    //                 const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/featured`);
    //                 setFeaturedBlog(res.data[0]);
    //                 console.log(res.data)
    //             }
    //             catch (err) {

    //             }
    //         }

    //         fetchData();
    //     }, []);

    //     useEffect(() => {
    //         const fetchBlogs = async () => {
    //             try {
    //                 const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/`);
    //                 setBlogs(res.data);
    //             }
    //             catch (err) {

    //             }
    //         }

    //         fetchBlogs();
    //     }, []);

    //     const capitalizeFirstLetter = (word) => {
    //         if (word)
    //             return word.charAt(0).toUpperCase() + word.slice(1);
    //         return '';
    //     };

    //code to retrieve all the blogs
        const getBlogs = () => {
            let list = [];
            let result = [];

            blogs.map(blogPost => {
                return list.push(
                    <div className="mb-4 overflow-hidden border rounded shadow-sm row no-gutters flex-md-row h-md-250 position-relative">
                        <div className="p-4 col d-flex flex-column position-static">
                            <strong className="mb-2 d-inline-block text-primary">{blogPost.category.charAt(0).toUpperCase() + blogPost.category.slice(1)}</strong>
                            <h3 className="mb-0">{blogPost.title}</h3>
                            <div className="mb-1 text-muted">{blogPost.month} {blogPost.day}</div>
                            <p className="mb-auto card-text">{blogPost.excerpt}</p>
                            <Link to={`/blog/${blogPost.slug}`} className="stretched-link">Continue reading</Link>
                        </div>
                        <div className="col-auto d-none d-lg-block">
                            <img width='200' height='250' src={blogPost.thumbnail} alt='thumbnail' />
                        </div>
                    </div>
                );
            });

            for (let i = 0; i < list.length; i += 2) {
                result.push(
                    <div key={i} className='mb-2 row'>
                        <div className='col-md-6'>
                            {list[i]}
                        </div>
                        <div className='col-md-6'>
                            {list[i+1] ? list[i+1] : null}
                        </div>
                    </div>
                )
            }

            return result;
        };

    return (
        <div>
            <div className='ml-5 blognav'>
                <BlogNavbar />
            </div>

            <div className='container mt-3'>
                <div className="py-1 mb-2 nav-scroller">
                    <nav className="nav d-flex justify-content-between">
                        <Link className="p-2 text-muted" to='/category/world'>Health Issues</Link>
                        {/* <Link className="p-2 text-muted" to='/category/environment'>Environment</Link>
                        <Link className="p-2 text-muted" to='/category/technology'>Technology</Link>
                        <Link className="p-2 text-muted" to='/category/design'>Design</Link>
                        <Link className="p-2 text-muted" to='/category/culture'>Culture</Link>
                        <Link className="p-2 text-muted" to='/category/business'>Business</Link>
                        <Link className="p-2 text-muted" to='/category/politics'>Politics</Link>
                        <Link className="p-2 text-muted" to='/category/opinion'>Opinion</Link>
                        <Link className="p-2 text-muted" to='/category/science'>Science</Link>
                        <Link className="p-2 text-muted" to='/category/health'>Health</Link>
                        <Link className="p-2 text-muted" to='/category/style'>Style</Link>
                        <Link className="p-2 text-muted" to='/category/travel'>Travel</Link> */}
                    </nav>
                </div>

                <div className="p-4 text-white rounded jumbotron p-md-5 bg-dark">
                    <div className="px-0 col-md-6">
                        <h1 className="display-4 font-italic">{featuredBlog.title}</h1>
                        <p className="my-3 lead">{featuredBlog.excerpt}</p>
                        <p className="mb-0 lead">
                            <Link to={`/blog/${featuredBlog.slug}`} className="text-white font-weight-bold">
                                Continue reading...
                            </Link>
                        </p>
                    </div>
                </div>

                {/* {getBlogs()} */}
            </div>
        </div>


    );
}

export default Blog;
