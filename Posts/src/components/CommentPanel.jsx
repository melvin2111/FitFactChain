// components/CommentPanel.jsx
import React, { useState } from 'react';
import './CommentPanel.css';

const Comment = ({ comment, onReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleSubmitReply = (e) => {
    e.preventDefault();
    onReply(comment.id, replyText);
    setReplyText('');
    setShowReplyForm(false);
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <span className="comment-author">{comment.author}</span>
        <span className="comment-date">{comment.date}</span>
      </div>
      <div className="comment-content">{comment.content}</div>
      <div className="comment-actions">
        <button 
          className="reply-button"
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          Reply
        </button>
      </div>
      
      {showReplyForm && (
        <form className="reply-form" onSubmit={handleSubmitReply}>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            required
          />
          <div className="reply-form-actions">
            <button type="button" onClick={() => setShowReplyForm(false)}>Cancel</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
      
      {comment.replies && comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map(reply => (
            <Comment 
              key={reply.id} 
              comment={reply} 
              onReply={onReply} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentPanel = ({ postId }) => {
  const [comments, setComments] = useState([
    // Sample comments (in a real app, you would fetch these from your backend)
    {
      id: 1,
      author: 'User1',
      date: '2 hours ago',
      content: 'This is a great post!',
      replies: [
        {
          id: 3,
          author: 'User3',
          date: '1 hour ago',
          content: 'I agree with you!',
          replies: []
        }
      ]
    },
    {
      id: 2,
      author: 'User2',
      date: '1 day ago',
      content: 'Interesting perspective.',
      replies: []
    }
  ]);
  
  const [newComment, setNewComment] = useState('');
  
  const handleAddComment = (e) => {
    e.preventDefault();
    
    // Create a new comment
    const comment = {
      id: Date.now(), // Simple unique ID for demo
      author: 'Current User', // In a real app, you would get the current user
      date: 'Just now',
      content: newComment,
      replies: []
    };
    
    // Add the new comment to the comments array
    setComments([comment, ...comments]);
    setNewComment('');
    
    // In a real app, you would send this comment to your backend
    console.log(`Added new comment to post ${postId}`);
  };
  
  const handleAddReply = (commentId, replyContent) => {
    // Create a new reply
    const reply = {
      id: Date.now(), // Simple unique ID for demo
      author: 'Current User', // In a real app, you would get the current user
      date: 'Just now',
      content: replyContent,
      replies: []
    };
    
    // Helper function to recursively find and update the comment with the reply
    const addReplyToComment = (comments) => {
      return comments.map(comment => {
        if (comment.id === commentId) {
          // Add reply to this comment
          return {
            ...comment,
            replies: [...comment.replies, reply]
          };
        } else if (comment.replies && comment.replies.length > 0) {
          // Check in the replies
          return {
            ...comment,
            replies: addReplyToComment(comment.replies)
          };
        }
        return comment;
      });
    };
    
    // Update the comments with the new reply
    setComments(addReplyToComment(comments));
    
    // In a real app, you would send this reply to your backend
    console.log(`Added reply to comment ${commentId} on post ${postId}`);
  };
  
  return (
    <div className="comment-panel">
      <h3>Comments</h3>
      
      <form className="comment-form" onSubmit={handleAddComment}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          required
        />
        <button type="submit">Post Comment</button>
      </form>
      
      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map(comment => (
            <Comment 
              key={comment.id} 
              comment={comment} 
              onReply={handleAddReply} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentPanel;