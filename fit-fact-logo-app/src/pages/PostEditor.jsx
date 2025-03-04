import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill'; // For rich text editing
import 'react-quill/dist/quill.snow.css'; // Quill styles

const PostEditor = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    description: '',
    content: '',
    image: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Quill editor modules config
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['code-block', 'link'],
      ['clean']
    ]
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value
    });
  };

  const handleContentChange = (content) => {
    setPost({
      ...post,
      content: content
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, you would send the post data to your API here
      console.log("Submitting post:", post);
      
      // Mock API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock post ID (in a real app, this would come from the server)
      const newPostId = Math.floor(Math.random() * 1000) + 4;
      
      alert(`Post created successfully! Post ID: ${newPostId}`);
      navigate(`/posts/${newPostId}`);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <div className="post-editor-page">
      <div className="post-editor-container">
        <h1 className="editor-title">Create New Post</h1>
        
        <div className="editor-mode-toggle">
          <button 
            className={`mode-button ${!previewMode ? 'active' : ''}`} 
            onClick={() => setPreviewMode(false)}
          >
            Edit
          </button>
          <button 
            className={`mode-button ${previewMode ? 'active' : ''}`} 
            onClick={() => setPreviewMode(true)}
            disabled={!post.title && !post.content}
          >
            Preview
          </button>
        </div>
        
        {previewMode ? (
          <div className="post-preview">
            <h1 className="preview-title">{post.title}</h1>
            <p className="preview-description">{post.description}</p>
            
            {post.image && (
              <div className="preview-image">
                <img src={post.image} alt={post.title} onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://picsum.photos/800/400";
                }} />
              </div>
            )}
            
            <div className="preview-content" dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        ) : (
          <form className="post-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter post title"
                value={post.title}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="A brief description of your post"
                value={post.description}
                onChange={handleInputChange}
                required
                rows={3}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="image">Image URL (optional)</label>
              <input
                type="url"
                id="image"
                name="image"
                placeholder="Enter image URL"
                value={post.image}
                onChange={handleInputChange}
              />
              {!post.image && (
                <div className="helper-text">
                  If left empty, a random image will be used from Picsum Photos.
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <ReactQuill
                theme="snow"
                value={post.content}
                onChange={handleContentChange}
                modules={modules}
                placeholder="Write your post content here..."
              />
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting || !post.title || !post.content}
              >
                {isSubmitting ? 'Creating...' : 'Create Post'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PostEditor;