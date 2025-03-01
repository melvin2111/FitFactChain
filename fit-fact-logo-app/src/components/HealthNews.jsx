import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HealthNews.css';

const HealthNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHealthNews();
  }, []);

  const fetchHealthNews = async () => {
    try {
      setLoading(true);
      
      // Replace with your actual News API key
      const apiKey = '11c9015e1471424b9b641b9b8364b424';
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?category=health&language=en&apiKey=${apiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setNews(data.articles || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching health news:', error);
      setError('Failed to load health news. Please try again later.');
      setLoading(false);
      
      // If API is not available, load fallback data
      setNews(fallbackNewsData);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  // Format the publication date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="health-news-container">
      <header className="news-header">
        <h1>Health News</h1>
        <button className="back-btn" onClick={handleBackToDashboard}>
          Back to Dashboard
        </button>
      </header>

      <div className="news-content">
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading health news...</p>
          </div>
        )}

        {error && !loading && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="no-news-message">
            <p>No health news available at the moment.</p>
          </div>
        )}

        {!loading && !error && news.length > 0 && (
          <div className="news-grid">
            {news.map((article, index) => (
              <div className="news-card" key={index}>
                {article.urlToImage && (
                  <div className="news-image">
                    <img 
                      src={article.urlToImage} 
                      alt={article.title} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/news-placeholder.jpg';
                      }}
                    />
                  </div>
                )}
                <div className="news-details">
                  <h3 className="news-title">
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </a>
                  </h3>
                  <p className="news-source">
                    {article.source.name} • {formatDate(article.publishedAt)}
                  </p>
                  <p className="news-description">
                    {article.description || 'No description available.'}
                  </p>
                  <a 
                    className="read-more" 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Read Full Article
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Fallback data in case the API is unavailable
const fallbackNewsData = [
  {
    source: { name: 'Health Journal' },
    author: 'Dr. Jane Smith',
    title: 'New Study Shows Benefits of Mediterranean Diet',
    description: 'Research confirms the Mediterranean diet can reduce risk of heart disease and improve overall health.',
    url: '#',
    urlToImage: '/images/news-placeholder.jpg',
    publishedAt: '2025-02-28T14:30:00Z',
    content: 'Full content of the article...'
  },
//   {
//     source: { name: 'Medical News Today' },
//     author: 'Dr. John Brown',
//     title: 'Breakthrough in Alzheimer's Research Shows Promise',
//     description: 'Scientists discover new mechanism that could lead to early detection and treatment of Alzheimer's disease.',
//     url: '#',
//     urlToImage: '/images/news-placeholder.jpg',
//     publishedAt: '2025-02-27T09:15:00Z',
//     content: 'Full content of the article...'
//   },
  {
    source: { name: 'Wellness Report' },
    author: 'Sarah Johnson',
    title: 'Mental Health Awareness: The Importance of Self-Care',
    description: 'Experts emphasize the need for regular self-care practices to maintain good mental health.',
    url: '#',
    urlToImage: '/images/news-placeholder.jpg',
    publishedAt: '2025-02-26T16:45:00Z',
    content: 'Full content of the article...'
  },
  {
    source: { name: 'Fitness Today' },
    author: 'Mark Williams',
    title: '30 Minutes of Daily Exercise Can Add Years to Your Life',
    description: 'New research suggests that just 30 minutes of moderate activity each day can significantly increase longevity.',
    url: '#',
    urlToImage: '/images/news-placeholder.jpg',
    publishedAt: '2025-02-25T11:20:00Z',
    content: 'Full content of the article...'
  }
];

export default HealthNews;