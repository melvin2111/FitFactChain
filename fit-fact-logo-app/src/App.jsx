import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Main components
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
// User authentication
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';
import DoctorLogin from './components/DoctorLogin';
import DoctorRegister from './components/DoctorRegister';
// Dashboard and protected components
import Dashboard from './components/Dashboard';
import HealthNews from './components/HealthNews';
// Pages
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import SpecialtyList from './pages/SpecialtyList';
import AskPost from './pages/AskPost';
// Context and styles
import { AuthProvider } from './context/AuthContext';
import './styles/global.css';
import './App.css';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Navbar />
          <div className="content-container">
            <Routes>
              {/* Landing and Authentication Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/user/login" element={<UserLogin />} />
              <Route path="/user/register" element={<UserRegister />} />
              <Route path="/doctor/login" element={<DoctorLogin />} />
              <Route path="/doctor/register" element={<DoctorRegister />} />
              
              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/health-news"
                element={
                  <ProtectedRoute>
                    <HealthNews />
                  </ProtectedRoute>
                }
              />
              
              {/* Content Routes - Now Protected */}
              <Route 
                path="/home" 
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/post/:id" 
                element={
                  <ProtectedRoute>
                    <PostDetail />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/ask" 
                element={
                  <ProtectedRoute>
                    <SpecialtyList />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/specialty/:specialtyName" 
                element={
                  <ProtectedRoute>
                    <AskPost />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;