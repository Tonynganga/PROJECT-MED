import React, { useEffect,useState } from 'react';
import propTypes from 'prop-types';
// import {addPost, updatePost} from '../../action/posts';
import { connect } from 'react-redux';
import BlogNavbar from '../BlogNavbar';
import {addBlog} from '../../actions/blogs'

const NewPost=(props)=> {
  const [title,setTitle]=useState("")
  const [content,setContent]=useState("")
  const onSubmit=(e)=>{
    e.preventDefault()
    const body={
      blog_title:title,
      blog_content:content
    }

    props.addBlog(body)

  }
    return (
      <div>
        <div className='blognav ml-5'>
          <BlogNavbar />
        </div>
        <div className="d-flex justify-content-center mt-5">

          <form onSubmit={onSubmit} >
            <fieldset className="form-group">
              <legend className="border-bottom  ml-4">Blog Post</legend>
              {/* <div className="uploadimage__form">
                <img id="img" alt="#" width="100px" height="100px" />
                <input type="file" accept="image/*" name="image-upload" id="input" />
                <div className="upload__btn">
                  <label className="image-upload" htmlFor="input">
                    <i className="material-icons">add_photo_alternate</i>
                    {'Choose file'}
                  </label>
                </div>
              </div> */}
              <div className="form-group  mt-2">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  name="title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                required
                />
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="content"
                value={content}
                onChange={(e)=>setContent(e.target.value)}
                required
                />
              </div>
              <div className="form-group mt-3">
                <button type="submit" className="btn btn btn-outline-info">
                  Post
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>

    );
  }

NewPost.propTypes = {
  addBlog:propTypes.func.isRequired,
};

export default connect(null, { addBlog })(NewPost)
