import React, { Component } from 'react';
import propTypes from 'prop-types';
// import {addPost, updatePost} from '../../action/posts';
import { connect } from 'react-redux';
import BlogNavbar from '../BlogNavbar';

class NewPost extends Component {
  // constructor (props) {
  //   super (props);
  //   if (props.location && props.location.state !== undefined) {
  //     const {id, title, content} = props.location.state.post;
  //     this.state = {title, id, content};
  //   } else {
  //     this.state = {
  //       title: '',
  //       content: '',
  //     };
  //   }
  // }

  // onChangeHandler = e => this.setState ({[e.target.name]: e.target.value});
  // onSubmitHandler = e => {
  //   e.preventDefault ();
  //   const {title, content} = this.state;
  //   const body = JSON.stringify ({
  //     title,
  //     content,
  //   });
  //   if (this.state.id) {
  //     this.props.updatePost (this.state.id, body);
  //   } else {
  //     this.props.addPost (body);
  //     this.setState ({
  //       title: '',
  //       content: '',
  //     });
  //   }
  // };
  render() {
    // if (this.props.update == true && this.props.location.state == undefined)
    //   return <h2>404 Page not Found</h2>;
    // const {title, content} = this.state;
    return (
      <div>
        <div className='blognav ml-5'>
          <BlogNavbar />
        </div>
        <div className="d-flex justify-content-center mt-5">

          <form >
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
                // value={title}
                // onChange={this.onChangeHandler}
                />
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="content"
                // value={content}
                // onChange={this.onChangeHandler}
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
}

// PostForm.propTypes = {};

export default NewPost;
