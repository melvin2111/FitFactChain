// pages/SpecialtyList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SpecialtyList = () => {
  const navigate = useNavigate();
  
  // List of medical specialties
  const specialties = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Neurology",
    "Obstetrics & Gynecology",
    "Oncology",
    "Ophthalmology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Pulmonology",
    "Rheumatology",
    "Urology"
  ];
  
  const handleSpecialtyClick = (specialty) => {
    // Later we can navigate to a specific specialty page
    navigate(`/specialty/${specialty.toLowerCase().replace(/\s+/g, '-')}`);
  };
  
  return (
    <div className="specialty-page">
      <div className="page-header">
        <h1>Choose a Medical Specialty</h1>
        <p>Select a specialty to connect with the community of doctors in that field</p>
      </div>
      
      <div className="specialty-list">
        {specialties.map((specialty, index) => (
          <button 
            key={index} 
            className="specialty-button"
            onClick={() => handleSpecialtyClick(specialty)}
          >
            {specialty}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpecialtyList;