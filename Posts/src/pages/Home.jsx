// pages/Home.jsx
import React from 'react';
import PostCard from '../components/PostCard';

// Sample post data for demonstration
const samplePosts = [
  {
    id: 1,
    title: "Getting Started with React and Vite",
    description: "Learn how to set up a new React project using Vite and explore its benefits over traditional create-react-app.",
    image: "https://picsum.photos/800/400",
    upvotesTypeA: 75,
    downvotesTypeA: 25,
    upvotesTypeB: 60,
    downvotesTypeB: 40
  },
  {
    id: 2,
    title: "CSS Tips for Modern Web Design",
    description: "Explore the latest CSS techniques that can enhance your web design and improve user experience.",
    upvotesTypeA: 85,
    downvotesTypeA: 15,
    upvotesTypeB: 90,
    downvotesTypeB: 10
  },
  {
    id: 3,
    title: "JavaScript Best Practices",
    description: "A comprehensive guide to writing clean, efficient, and maintainable JavaScript code for your projects.",
    image: "https://picsum.photos/800/400?random=2",
    upvotesTypeA: 65,
    downvotesTypeA: 35,
    upvotesTypeB: 45,
    downvotesTypeB: 55
  }
];

const Home = () => {
  return (
    <div className="home-page">
      <header className="page-header">
        <h1>My React Post Feed</h1>
      </header>
      
      <main className="post-feed">
        {samplePosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
};

export default Home;