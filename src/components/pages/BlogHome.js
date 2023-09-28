import React from 'react';
import { Link } from 'react-router-dom';
import BlogNavbar from '../BlogNavbar';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

function BlogHome() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);


    if (!isAuthenticated) {
        return <Redirect to="/" />;
      }
    return (
        <div>
            <div className='blognav ml-5'>
            <BlogNavbar/>
            </div>
            
            <div className='container'>

                <div className="jumbotron mt-5">
                    <h1 className="display-4">Welcome to Blog Lyfe!</h1>
                    <p className="lead">We make all kinds of awesome blog topics about health issues and concerns</p>
                    <hr className="my-4" />
                    <p>Click the button below to check out our awesome blog.</p>
                    <Link className="btn btn-primary btn-lg" to='/blog' role="button">Check out our Blog</Link>
                </div>
            </div>
        </div>


    );
}

export default BlogHome;