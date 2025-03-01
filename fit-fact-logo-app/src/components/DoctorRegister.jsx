import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/DoctorRegister.css';

const DoctorRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    nationality: '',
    contactNo: '',
    email: '',
    medicalLicenseNo: '',
    licenseExpiryDate: '',
    issuingAuthority: '',
    qualification: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});
  
  const { registerDoctor, loading, error } = useAuth();
  
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
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.dob) {
      errors.dob = 'Date of birth is required';
    }
    
    if (!formData.nationality.trim()) {
      errors.nationality = 'Nationality is required';
    }
    
    if (!formData.contactNo.trim()) {
      errors.contactNo = 'Contact number is required';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.medicalLicenseNo.trim()) {
      errors.medicalLicenseNo = 'Medical license number is required';
    }
    
    if (!formData.licenseExpiryDate) {
      errors.licenseExpiryDate = 'License expiry date is required';
    }
    
    if (!formData.issuingAuthority.trim()) {
      errors.issuingAuthority = 'Issuing authority is required';
    }
    
    if (!formData.qualification.trim()) {
      errors.qualification = 'Qualification is required';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Create a copy without confirmPassword
      const doctorData = { ...formData };
      delete doctorData.confirmPassword;
      
      try {
        await registerDoctor(doctorData);
      } catch (err) {
        console.error('Registration failed', err);
      }
    }
  };
  
  return (
    <div className="doctor-register-container">
      <div className="doctor-register-card">
        <h2>Doctor Registration</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
              {formErrors.name && <span className="error">{formErrors.name}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
              {formErrors.dob && <span className="error">{formErrors.dob}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nationality">Nationality</label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                placeholder="Enter your nationality"
              />
              {formErrors.nationality && <span className="error">{formErrors.nationality}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="contactNo">Contact Number</label>
              <input
                type="text"
                id="contactNo"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                placeholder="Enter your contact number"
              />
              {formErrors.contactNo && <span className="error">{formErrors.contactNo}</span>}
            </div>
          </div>
          
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
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="medicalLicenseNo">Medical License Number</label>
              <input
                type="text"
                id="medicalLicenseNo"
                name="medicalLicenseNo"
                value={formData.medicalLicenseNo}
                onChange={handleChange}
                placeholder="Enter your license number"
              />
              {formErrors.medicalLicenseNo && <span className="error">{formErrors.medicalLicenseNo}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="licenseExpiryDate">License Expiry Date</label>
              <input
                type="date"
                id="licenseExpiryDate"
                name="licenseExpiryDate"
                value={formData.licenseExpiryDate}
                onChange={handleChange}
              />
              {formErrors.licenseExpiryDate && <span className="error">{formErrors.licenseExpiryDate}</span>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="issuingAuthority">Issuing Medical Board/Authority</label>
            <input
              type="text"
              id="issuingAuthority"
              name="issuingAuthority"
              value={formData.issuingAuthority}
              onChange={handleChange}
              placeholder="Enter issuing authority"
            />
            {formErrors.issuingAuthority && <span className="error">{formErrors.issuingAuthority}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="qualification">Qualification</label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              placeholder="Enter your qualification"
            />
            {formErrors.qualification && <span className="error">{formErrors.qualification}</span>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
              />
              {formErrors.password && <span className="error">{formErrors.password}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
              {formErrors.confirmPassword && <span className="error">{formErrors.confirmPassword}</span>}
            </div>
          </div>
          
          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        
        <div className="login-link">
          <p>Already have an account? <Link to="/doctor/login">Login here</Link></p>
        </div>
        
        <div className="back-link">
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorRegister;