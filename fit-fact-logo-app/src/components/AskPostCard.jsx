// components/AskPostCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CommentPanel from './CommentPanel';

const AskPostCard = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  
  const handleToggleComments = () => {
    setShowComments(!showComments);
  };
  
  return (
    <div className="ask-post-card">
      {post.image && (
        <div className="post-image">
          <img src="https://picsum.photos/800/400?random=2" alt={post.title} />
        </div>
      )}
      
      <div className="post-content">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-description">{post.description}</p>
        
        <Link to={`/post/${post.id}`} className="read-more-button">
          Read More
        </Link>
        
        <div className="post-actions">
          <button 
            className={`discuss-button ${showComments ? 'active' : ''}`}
            onClick={handleToggleComments}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            {/* <span>Comments</span> */}
          </button>
        </div>
        
        {showComments && (
          <div className="comments-container">
            <CommentPanel postId={post.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AskPostCard;