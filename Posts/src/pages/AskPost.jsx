// pages/AskPost.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AskPostCard from '../components/AskPostCard';

const AskPost = () => {
  const { specialtyName } = useParams();
  const navigate = useNavigate();
  
  // Mock data for specialty posts - in a real app you would fetch this
  const specialtyPosts = [
    {
      id: 'sp1',
      title: `Common Questions in ${specialtyName.charAt(0).toUpperCase() + specialtyName.slice(1).replace(/-/g, ' ')}`,
      description: "This post covers frequently asked questions by patients seeking medical advice in this specialty.",
      image: "https://via.placeholder.com/800x400",
      upvotesTypeA: 0,
      downvotesTypeA: 0,
      upvotesTypeB: 0,
      downvotesTypeB: 0
    },
    {
      id: 'sp2',
      title: `Latest Research in ${specialtyName.charAt(0).toUpperCase() + specialtyName.slice(1).replace(/-/g, ' ')}`,
      description: "An overview of recent medical breakthroughs and ongoing research in this field.",
      image: "https://via.placeholder.com/800x400",
      upvotesTypeA: 0,
      downvotesTypeA: 0,
      upvotesTypeB: 0,
      downvotesTypeB: 0
    }
  ];
  
  const handleCreatePost = () => {
    // In a real app, this would navigate to a form or open a modal
    console.log('Creating a new post');
  };
  
  const handleManagePosts = () => {
    // In a real app, this would navigate to a management page
    console.log('Managing posts');
  };
  
  const formattedSpecialty = specialtyName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return (
    <div className="ask-post-page">
      <div className="page-header">
        <h1>{formattedSpecialty} Community</h1>
        <p>Connect with doctors and patients in this specialty</p>
      </div>
      
      <div className="action-buttons">
        <button className="create-post-button" onClick={handleCreatePost}>
          Create a Post
        </button>
        <button className="manage-posts-button" onClick={handleManagePosts}>
          Manage Posts
        </button>
      </div>
      
      <div className="ask-post-feed">
        {specialtyPosts.map((post) => (
          <AskPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default AskPost;