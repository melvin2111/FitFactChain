import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/DoctorLogin.css';

const DoctorLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    medicalLicenseNo: ''
  });
  const [formErrors, setFormErrors] = useState({});
  
  const { loginDoctor, loading, error } = useAuth();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear field-specific error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    
    if (!formData.medicalLicenseNo) {
      errors.medicalLicenseNo = 'Medical license number is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await loginDoctor(formData);
      } catch (err) {
        console.error('Login failed', err);
      }
    }
  };
  
  return (
    <div className="doctor-login-container">
      <div className="doctor-login-card">
        <h2>Doctor Login</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {formErrors.email && <span className="error">{formErrors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="medicalLicenseNo">Medical License Number</label>
            <input
              type="text"
              id="medicalLicenseNo"
              name="medicalLicenseNo"
              value={formData.medicalLicenseNo}
              onChange={handleChange}
              placeholder="Enter your medical license number"
            />
            {formErrors.medicalLicenseNo && <span className="error">{formErrors.medicalLicenseNo}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {formErrors.password && <span className="error">{formErrors.password}</span>}
          </div>
          
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="register-link">
          <p>Don't have an account? <Link to="/doctor/register">Register here</Link></p>
        </div>
        
        <div className="back-link">
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;