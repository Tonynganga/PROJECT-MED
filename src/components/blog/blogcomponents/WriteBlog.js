import "../Blog.css";
import Select from 'react-select';
import Blobar from "./Blogbar";
import Footer from "../../Footer";
import React, { useEffect, useState, useContext } from 'react';
import propTypes from 'prop-types';
import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js'
import { connect } from 'react-redux';
import { addBlog, updateBlog } from '../../../actions/blogs'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { errorMessage } from '../../../actions/notifyPopUp';
import { WebSocketService } from '../../../websocket';
import BlogSidebar from "../blogcomponents/BlogSidebar";
import {blog_type} from "../../../utils"



function WriteBlog(props) {
  const selectedCategory = (selected) => {
    return blog_type.filter(elem => elem.value == selected)[0]
  }
  const ws = useContext(WebSocketService);
  const editorStateSession = (item) => {
    const contentBlock = htmlToDraft(item);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    return EditorState.createWithContent(contentState);

  }
  const [title, setTitle] = useState(sessionStorage.getItem('title') ? sessionStorage.getItem('title') : "")
  const [content, setContent] = useState(sessionStorage.getItem('content') ? sessionStorage.getItem('content') : "")
  const [excrept, setExcrept] = useState(sessionStorage.getItem('excrept') ? sessionStorage.getItem('excrept') : "")
  const [thumbnail, setThumbnail] = useState();
  const [category, setCategory] = useState(sessionStorage.getItem('category') ? selectedCategory(sessionStorage.getItem('category')) : "");
  const [editorState, setEditorState] = useState(sessionStorage.getItem('content') ? editorStateSession(sessionStorage.getItem('content')) : EditorState.createEmpty())
  useEffect(() => {
    if (props.location && props.location.state && props.location.state.blog) {
      const { blog } = props.location.state
      setTitle(blog.blog_title)
      sessionStorage.setItem('title', blog.blog_title)
      setExcrept(blog.excerpt)
      sessionStorage.setItem('excrept', blog.excerpt)
      setContent(blog.blog_content)
      editorStateSession(blog.blog_content)
      sessionStorage.setItem('content', blog.blog_content)
      setCategory(selectedCategory(blog.category))
      sessionStorage.setItem('category', blog.category)
    }

  }, [])



  const onChangeThumbnail = e => {
    setThumbnail(e.target.files[0]);
  };

  const onEditorStateChange = (e) => {
    setEditorState(e)
    let currentContentAsHTML = draftToHtml(convertToRaw(e.getCurrentContent()))
    sessionStorage.setItem('content', currentContentAsHTML)
    setContent(currentContentAsHTML)
  }
  const formValidation = () => {
    if (content.length < 10) {
      props.errorMessage("ensure you add to content")
      return false
    }
    return true

  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (formValidation) {
      const formData = new FormData()
      formData.append('blog_title', title);
      formData.append('blog_content', content);
      formData.append('excerpt', excrept);
      formData.append('category', category.value);
      if (thumbnail) {
        formData.append('thumbnail', thumbnail)
        setThumbnail(null);
      }
      if (props.location && props.location.state && props.location.state.blog) {
        const { blog } = props.location.state
        props.updateBlog(blog.id, formData, ws)
      }
      else {
        props.addBlog(formData, ws);
        // console.log(formData.entries())

      }
    }

  }
  return (
    
    <div className="write">
      <Blobar />
      <div className="bloghome-container d-flex justify-content-between">      
      <form className="writeForm" onSubmit={onSubmit} >
        <div className="d-flex justify-content-between m-5">
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
                onChange={(e) => { setTitle(e.target.value); sessionStorage.setItem('title', e.target.value) }}
                required
              />
            </div>
            <div className="form-group  mt-0">
              <label>Category</label>
              <Select
                placeholder="Select Category"
                className="blogtype"
                required
                onChange={e => {
                  setCategory(e);
                }}
                value={category}
                options={blog_type} />
            </div>
            <label className='label mt--2'>Thumbnail</label>
            <div className="blog-uploadimage__form">

              <div className="blogupload__btn">
                <input type="file" accept="image/*" name="image-upload" id="input" onChange={onChangeThumbnail} />
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
                onChange={(e) => { setExcrept(e.target.value); sessionStorage.setItem('excrept', e.target.value) }}
                required
              />
            </div>


            <div className="form-group mt--2">
              <label>Content</label>
              <Editor
                editorState={editorState}
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
                toolbar={{
                  options: ['inline', 'blockType', 'fontSize', 'list', 'colorPicker', 'textAlign', 'link', 'emoji', 'history'],
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: false, defaultTargetOption: '_blank' },
                  history: { inDropdown: true },
                }}
              />
            </div>
          </fieldset>
          <button className="writeSubmit btn-outline-info" type="submit">
            Publish
          </button>          
        </div>
        
      </form>
      <div className="bloghome-sidebar">
      <BlogSidebar/>
      </div>
      </div>
      <Footer />
    
    </div>
    
  );
}


WriteBlog.propTypes = {
  addBlog: propTypes.func.isRequired,
  updateBlog: propTypes.func.isRequired,
  errorMessage: propTypes.func.isRequired
};

export default connect(null, { addBlog, updateBlog, errorMessage })(WriteBlog)

