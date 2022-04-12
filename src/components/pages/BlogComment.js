import CommentForm from "./CommentForm";
import './Appointment.css';
import { getComments } from '../../actions/blogs';

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const BlogComment = ({
  comment,
//   replies,
//   setActiveComment,
  activeComment,
//   updateComment,
//   deleteComment,
//   addComment,
//   parentId = null,
//   currentUserId,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
//   const isReplying =
//     activeComment &&
//     activeComment.id === comment.id &&
//     activeComment.type === "replying";
//   const fiveMinutes = 300000;
//   const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
//   const canDelete =
//     currentUserId === comment.userId && replies.length === 0 && !timePassed;
//   const canReply = Boolean(currentUserId);
//   const canEdit = currentUserId === comment.userId && !timePassed;
//   const replyId = parentId ? parentId : comment.id;
//   const createdAt = new Date(comment.createdAt).toLocaleDateString();
  return (
    <div className="comment">
      <div className="comment-image-container">
        <img src="/user-icon.png" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">James</div>
          <div>Date Created</div>
        </div>
          {!isEditing && <div className="comment-text">{'comment body'}</div>}
        {/* {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={'comment body'}

            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}  */}
       
        
       
      </div>
    </div>
  );
};


BlogComment.propTypes = {
  getComments: propTypes.func.isRequired,
};

export default connect(null,{getComments})(BlogComment);