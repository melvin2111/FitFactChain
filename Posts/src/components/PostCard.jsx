// components/PostCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const [voted, setVoted] = useState(null);
  
  // Calculate percentages
  const totalVotesA = post.upvotesTypeA + post.downvotesTypeA;
  const upvotePercentageA = Math.round((post.upvotesTypeA / totalVotesA) * 100);
  const downvotePercentageA = 100 - upvotePercentageA;
  
  const totalVotesB = post.upvotesTypeB + post.downvotesTypeB;
  const upvotePercentageB = Math.round((post.upvotesTypeB / totalVotesB) * 100);
  const downvotePercentageB = 100 - upvotePercentageB;
  
  const handleVote = (voteType) => {
    setVoted(voteType);
    // In a real app, you would send this vote to your backend
    console.log(`Voted ${voteType} on post ${post.id}`);
  };
  
  const handleDiscuss = () => {
    // In a real app, you would navigate to discussion page or open a modal
    console.log(`Opening discussion for post ${post.id}`);
  };
  
  return (
    <div className="post-card">
      {post.image && (
        <div className="post-image">
          <img src={post.image} alt={post.title} />
        </div>
      )}
      
      <div className="post-content">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-description">{post.description}</p>
        
        <Link to={`/post/${post.id}`} className="read-more-button">
          Read More
        </Link>
        
        <div className="post-actions">
          <div className="vote-section">
            <div className="vote-buttons">
              <button 
                className={`vote-button upvote ${voted === 'upvote' ? 'voted' : ''}`}
                onClick={() => handleVote('upvote')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
              </button>
              
              <button 
                className={`vote-button downvote ${voted === 'downvote' ? 'voted' : ''}`}
                onClick={() => handleVote('downvote')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12l7 7 7-7"/>
                </svg>
              </button>
              
              <button 
                className="discuss-button"
                onClick={handleDiscuss}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </button>
            </div>
            
            <div className="vote-stats">
              <div className="vote-group">
                <div className="vote-label">Type A Users</div>
                <div className="vote-bars">
                  <div className="vote-bar-container">
                    <div 
                      className="vote-bar upvote-bar" 
                      style={{ width: `${upvotePercentageA}%` }}
                    >
                      {upvotePercentageA > 10 && `${upvotePercentageA}%`}
                    </div>
                    <div 
                      className="vote-bar downvote-bar" 
                      style={{ width: `${downvotePercentageA}%` }}
                    >
                      {downvotePercentageA > 10 && `${downvotePercentageA}%`}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="vote-group">
                <div className="vote-label">Type B Users</div>
                <div className="vote-bars">
                  <div className="vote-bar-container">
                    <div 
                      className="vote-bar upvote-bar" 
                      style={{ width: `${upvotePercentageB}%` }}
                    >
                      {upvotePercentageB > 10 && `${upvotePercentageB}%`}
                    </div>
                    <div 
                      className="vote-bar downvote-bar" 
                      style={{ width: `${downvotePercentageB}%` }}
                    >
                      {downvotePercentageB > 10 && `${downvotePercentageB}%`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;