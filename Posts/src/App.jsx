// App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import SpecialtyList from './pages/SpecialtyList';
import AskPost from './pages/AskPost';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/ask" element={<SpecialtyList />} />
            <Route path="/specialty/:specialtyName" element={<AskPost />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;