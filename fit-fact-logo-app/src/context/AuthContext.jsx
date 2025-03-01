import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  // Check if user is logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    const savedRole = localStorage.getItem('role');
    
    if (token && savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setRole(savedRole);
    }
    
    setLoading(false);
  }, []);

  // User registration
  const registerUser = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await authService.registerUser(userData);
      
      // Save token and user info
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data));
      localStorage.setItem('role', 'user');
      
      setCurrentUser(response.data.data);
      setRole('user');
      
      setLoading(false);
      navigate('/dashboard');
      
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'An error occurred during registration');
      throw err;
    }
  };

  // User login
  const loginUser = async (credentials) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await authService.loginUser(credentials);
      
      // Save token and user info
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data));
      localStorage.setItem('role', 'user');
      
      setCurrentUser(response.data.data);
      setRole('user');
      
      setLoading(false);
      navigate('/dashboard');
      
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Invalid credentials');
      throw err;
    }
  };

  // Doctor registration
  const registerDoctor = async (doctorData) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await authService.registerDoctor(doctorData);
      
      // Save token and user info
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data));
      localStorage.setItem('role', 'doctor');
      
      setCurrentUser(response.data.data);
      setRole('doctor');
      
      setLoading(false);
      navigate('/dashboard');
      
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'An error occurred during registration');
      throw err;
    }
  };

  // Doctor login
  const loginDoctor = async (credentials) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await authService.loginDoctor(credentials);
      
      // Save token and user info
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data));
      localStorage.setItem('role', 'doctor');
      
      setCurrentUser(response.data.data);
      setRole('doctor');
      
      setLoading(false);
      navigate('/dashboard');
      
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Invalid credentials');
      throw err;
    }
  };

  // Logout
  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    setRole(null);
    navigate('/');
  };

  const value = {
    currentUser,
    role,
    loading,
    error,
    registerUser,
    loginUser,
    registerDoctor,
    loginDoctor,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};