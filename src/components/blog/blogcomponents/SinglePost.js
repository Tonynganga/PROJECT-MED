import React,{useContext} from "react";
import { Link } from "react-router-dom";
import CommentForm from "../../pages/CommentForm";
import DisplayComment from "../../pages/DisplayComment";
import "../Blog.css";
import { capitalizeFirstLetter, monthNames,HTTP_API_PATH } from '../../../utils'
import { connect } from 'react-redux';
import { deleteBlog } from '../../../actions/blogs';
import propTypes from 'prop-types';
import { WebSocketService } from '../../../websocket';

function SinglePost(props) {
  const {blog,username}=props
  const ws = useContext(WebSocketService);
  console.log(blog.blogger_username == username,"Test")
  let img="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
  const datePosted = new Date(blog.date_posted)
    const blogContent = () => {
        return { __html: blog.blog_content }
    };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src={blog.thumbnail?HTTP_API_PATH + blog.thumbnail:img}
          alt=""
        />
        <h1 className="singlePostTitle">
        {capitalizeFirstLetter(blog.blog_title)}
        {blog.blogger_username == username ?
          <div className="singlePostEdit">
            <Link to={{
                            pathname: '/writeblog',
                            state: {
                                blog,
                                index:blog.id
                            },
                        }}><i className="singlePostIcon far fa-edit"></i></Link>
            <Link
                            onClick={() => { { props.deleteBlog(blog.id, ws) } }}
                            to={{
                                pathname: '/newblog',
                            }}><i className="singlePostIcon far fa-trash-alt"></i></Link>
            
            
          </div>:""}
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to="/posts?username=Safak">
              {blog.blogger_first_name+" " +blog.blogger_last_name}
              </Link>
            </b>
            <img
              className="authorimg"
              src={HTTP_API_PATH + blog.blogger_profile_pic}
              alt=""
            />
          </span>
          <span>{monthNames[datePosted.getMonth()]+" "+datePosted.getDate()}</span>
        </div>
        <p className="singlePostDesc">
        <div className='mt-5 mb-5' dangerouslySetInnerHTML={blogContent()} />
          {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error
          quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit!
          Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi
          eos! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste
          error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto
          impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas a
          odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea
          iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas
          a odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea
          iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas
          a odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea
          iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas
          a odit modi eos!
          <br />
          <br />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error
          quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit!
          Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi
          eos! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste
          error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto
          impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas a
          odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea
          iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas
          a odit modi eos! Lorem, ipsum dolor sit amet consectetur. */}
        </p>
        <p className='lead mb-5'><Link to='/newblog' className='font-weight-bold'>Back to Blogs</Link></p>
        <div className='comment_bucket'>
        <div className="comment_title">Write comment</div>
        <CommentForm blogId={blog.id} isEnclosed={false} />
        <DisplayComment forBlogs={true} Id={blog.id} />
        
      </div>
      </div>
      
    </div>
  );
}

SinglePost.propTypes = {
  deleteBlog: propTypes.func.isRequired,
  username: propTypes.string.isRequired

};
const mapStateToProps = (state, ownProps) => {
  return {
    username: state.auth.user.username
  }
};

export default connect(mapStateToProps, { deleteBlog })(SinglePost);

