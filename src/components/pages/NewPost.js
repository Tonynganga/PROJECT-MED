import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
// import {addPost, updatePost} from '../../action/posts';
import { connect } from 'react-redux';
import BlogNavbar from '../BlogNavbar';
import { addBlog } from '../../actions/blogs'
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import './PatientProfile.css';


const NewPost = (props) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [excrept, setExcrept] = useState("")
  const [thumbnail, setThumbnail] = useState(null);


  const onChangeThumbnail = e => {
    setThumbnail(e.target.files[0]);
};

  const onSubmit = (e) => {
    e.preventDefault()
    const formData= new FormData()
    formData.append('blog_title', title);
    formData.append('blog_content', content);
    formData.append('excerpt', excrept);
    formData.append('thumbnail', thumbnail)
    setThumbnail(null);
    props.addBlog(formData);
    

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

            <div className="form-group  mt-0">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                placeholder='Title'
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <label className='label mt--2'>Thumbnail</label>
            <div className="blog-uploadimage__form">
              
              {/* <img id="img" alt="" width="0px" height="0px" /> */}
              <div className="blogupload__btn">
                <input type="file" accept="image/*" name="image-upload" id="input"  onChange={onChangeThumbnail} />
                <label className="image-upload" htmlFor="input">
                  <i className="material-icons">add_photo_alternate</i>
                  {thumbnail ? thumbnail.name : 'Choose file'}
                </label>
              </div>
              <h6 className='selected mt-2'>{thumbnail ? "" : 'No file Selected'}</h6>
            </div>
            <div className="form-group  mt-0">
              <label>Excerpt</label>
              <input
                type="text"
                placeholder='Excerpt'
                className="form-control"
                name="excrept"
                value={excrept}
                onChange={(e)=>setExcrept(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group mt--2">
              <label>Content</label>
              <textarea
                type="text"
                className="form-control"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <div className="form-group mt-1">
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
  addBlog: propTypes.func.isRequired,
};

export default connect(null, { addBlog })(NewPost)
