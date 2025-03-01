// pages/PostDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Sample post data for demonstration (this would come from an API in a real app)
const samplePosts = [
  {
    id: 1,
    title: "Getting Started with React and Vite",
    description: "Learn how to set up a new React project using Vite and explore its benefits over traditional create-react-app.",
    content: `
      <p>React is a popular JavaScript library for building user interfaces, and Vite is a modern build tool that provides a faster and leaner development experience.</p>
      
      <h3>Why Vite?</h3>
      <p>Vite offers several advantages over traditional tools like Create React App:</p>
      <ul>
        <li>Lightning-fast server start</li>
        <li>Instant hot module replacement (HMR)</li>
        <li>True on-demand compilation</li>
        <li>Optimized production builds out of the box</li>
      </ul>
      
      <h3>Getting Started</h3>
      <p>To create a new React project with Vite, you can use the following command:</p>
      <pre><code>npm create vite@latest my-react-app -- --template react</code></pre>
      
      <p>This will set up a new React project with Vite as the build tool. After the project is created, you can navigate to the project directory and install the dependencies:</p>
      <pre><code>cd my-react-app
npm install</code></pre>
      
      <p>After the installation is complete, you can start the development server:</p>
      <pre><code>npm run dev</code></pre>
      
      <h3>Project Structure</h3>
      <p>A Vite-based React project has a simpler structure compared to Create React App. The main files and directories are:</p>
      <ul>
        <li><code>index.html</code>: The entry point of your application</li>
        <li><code>src/main.jsx</code>: The JavaScript entry point</li>
        <li><code>src/App.jsx</code>: The main React component</li>
        <li><code>vite.config.js</code>: Vite configuration file</li>
      </ul>
      
      <h3>Conclusion</h3>
      <p>Vite provides a modern and efficient development experience for React projects. Its fast startup time and hot module replacement make it an excellent choice for new React projects.</p>
    `,
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
    content: `
      <p>Modern CSS has evolved significantly in recent years, providing powerful features that make it easier to create responsive, accessible, and visually appealing websites.</p>
      
      <h3>CSS Grid Layout</h3>
      <p>CSS Grid is a two-dimensional layout system that allows you to create complex layouts with ease. It's perfect for organizing content into rows and columns.</p>
      <pre><code>.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}</code></pre>
      
      <h3>Flexbox</h3>
      <p>Flexbox is a one-dimensional layout method designed for laying out items in rows or columns. It's excellent for aligning items and distributing space within a container.</p>
      <pre><code>.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}</code></pre>
      
      <h3>CSS Custom Properties (Variables)</h3>
      <p>CSS variables allow you to define reusable values that can be used throughout your stylesheet. This makes it easier to maintain consistency and implement themes.</p>
      <pre><code>:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
}

.button {
  background-color: var(--primary-color);
}</code></pre>
      
      <h3>CSS Animations and Transitions</h3>
      <p>CSS animations and transitions can add life to your website without the need for JavaScript.</p>
      <pre><code>.button {
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #2980b9;
}</code></pre>
      
      <h3>Media Queries</h3>
      <p>Media queries allow you to apply CSS styles based on device characteristics, such as screen width, height, or orientation.</p>
      <pre><code>@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}</code></pre>
      
      <h3>Conclusion</h3>
      <p>By leveraging these modern CSS techniques, you can create more flexible, maintainable, and visually appealing websites. The key is to understand when and how to use each feature effectively.</p>
    `,
    upvotesTypeA: 85,
    downvotesTypeA: 15,
    upvotesTypeB: 90,
    downvotesTypeB: 10
  },
  {
    id: 3,
    title: "JavaScript Best Practices",
    description: "A comprehensive guide to writing clean, efficient, and maintainable JavaScript code for your projects.",
    content: `
      <p>Writing clean, efficient, and maintainable JavaScript code is essential for developing robust web applications. Here are some best practices to follow in your JavaScript projects.</p>
      
      <h3>Use Strict Mode</h3>
      <p>Strict mode enables a stricter parsing and error handling of JavaScript code. It helps you write cleaner code and catch common coding mistakes.</p>
      <pre><code>'use strict';

function myFunction() {
  // This will cause an error in strict mode
  undeclaredVariable = 42;
}</code></pre>
      
      <h3>Avoid Global Variables</h3>
      <p>Global variables can lead to naming conflicts and make your code harder to maintain. Instead, use modules or closures to encapsulate your code.</p>
      <pre><code>// Avoid
var data = { name: 'John' };

// Better
const MyModule = (function() {
  const data = { name: 'John' };
  
  return {
    getData: function() {
      return data;
    }
  };
})();</code></pre>
      
      <h3>Use Arrow Functions</h3>
      <p>Arrow functions provide a more concise syntax and lexically bind the <code>this</code> value, which can help avoid common pitfalls.</p>
      <pre><code>// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;</code></pre>
      
      <h3>Destructuring Assignment</h3>
      <p>Destructuring makes it easier to extract data from arrays and objects, leading to cleaner code.</p>
      <pre><code>// Object destructuring
const person = { name: 'John', age: 30 };
const { name, age } = person;

// Array destructuring
const numbers = [1, 2, 3];
const [first, second] = numbers;</code></pre>
      
      <h3>Promises and Async/Await</h3>
      <p>Use Promises and async/await for handling asynchronous operations, which makes your code more readable and easier to reason about.</p>
      <pre><code>// Using async/await
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}</code></pre>
      
      <h3>Conclusion</h3>
      <p>Following these best practices will help you write cleaner, more efficient, and maintainable JavaScript code. Remember that good code is not just about working functionality but also about readability and maintainability.</p>
    `,
    image: "https://picsum.photos/800/400?random=2",
    upvotesTypeA: 65,
    downvotesTypeA: 35,
    upvotesTypeB: 45,
    downvotesTypeB: 55
  }
];

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [voted, setVoted] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the post data from an API
    // For now, we'll use the sample data
    const foundPost = samplePosts.find(p => p.id === parseInt(id));
    setPost(foundPost);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!post) {
    return <div className="error">Post not found</div>;
  }

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
    <div className="post-detail-page">
      <div className="post-detail">
        <h1 className="post-detail-title">{post.title}</h1>
        
        {post.image && (
          <div className="post-detail-image">
            <img src={post.image} alt={post.title} />
          </div>
        )}
        
        <div className="post-detail-content" 
             dangerouslySetInnerHTML={{ __html: post.content }} />
        
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

export default PostDetail;