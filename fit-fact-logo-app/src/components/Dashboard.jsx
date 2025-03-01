// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import '../styles/Dashboard.css';
// import './Hospitals.jsx';

// const Dashboard = () => {
//   const { currentUser, role, logout } = useAuth();
//   const [greeting, setGreeting] = useState('');
  
//   useEffect(() => {
//     // Set greeting based on time of day
//     const hour = new Date().getHours();
//     let greetText = '';
    
//     if (hour < 12) greetText = 'Good morning';
//     else if (hour < 18) greetText = 'Good afternoon';
//     else greetText = 'Good evening';
    
//     setGreeting(greetText);
//   }, []);
  
//   if (!currentUser) {
//     return (
//       <div className="dashboard-container">
//         <div className="dashboard-card">
//           <h2>Loading...</h2>
//         </div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="dashboard-container">
//       <header className="dashboard-header">
//         <h1>Fit Fact Portal</h1>
//         <button className="logout-btn" onClick={logout}>Logout</button>
//       </header>
      
//       <div className="dashboard-content">
//         <div className="welcome-card">
//           <h2>{greeting}, {currentUser.name}</h2>
//           <p>You are logged in as a {role}</p>
//         </div>
        
//         <div className="info-card">
//           <h3>Your Profile</h3>
//           <div className="profile-info">
//             <p><strong>Name:</strong> {currentUser.name}</p>
//             <p><strong>Email:</strong> {currentUser.email}</p>
//             <p><strong>Account Type:</strong> {role === 'user' ? 'User' : 'Doctor'}</p>
            
//             {role === 'doctor' && (
//               <>
//                 <p><strong>Medical License:</strong> {currentUser.medicalLicenseNo}</p>
//                 <p><strong>Qualification:</strong> {currentUser.qualification}</p>
//                 <p><strong>License Expiry:</strong> {new Date(currentUser.licenseExpiryDate).toLocaleDateString()}</p>
//               </>
//             )}
//           </div>
//         </div>
        
//         {role === 'user' ? (
//           <div className="dashboard-cards">
//             <div className="dashboard-card">
//               <h3>My Health History</h3>
//               <p>View past medical history </p>
//               <button className="card-btn">View History</button>
//             </div>
            
//             <div className="dashboard-card">
//               <h3>Nearby Hospitals</h3>
//               <p>Find nearby hospitals</p>
//               <button className="card-btn">View Hospitals</button>
//             </div>
            
//             <div className="dashboard-card">
//               <h3>Health News</h3>
//               <p>Stay updated with health news</p>
//               <button className="card-btn">View News</button>
//             </div>
//           </div>
//         ) : (
//           <div className="dashboard-cards">
//             <div className="dashboard-card">
//               <h3>My Health History</h3>
//               <p>View past medical history </p>
//               <button className="card-btn">Manage</button>
//             </div>
            
//             <div className="dashboard-card">
//               <h3>Nearby Hospitals</h3>
//               <p>Find nearby hospitals</p>
//               <button className="card-btn">View Patients</button>
//             </div>
            
//             <div className="dashboard-card">
//               <h3>Health News</h3>
//               <p>Stay updated with health news</p>
//               <button className="card-btn">Manage Prescriptions</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;






// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import '../styles/Dashboard.css';

// const Dashboard = () => {
//   const { currentUser, role, logout } = useAuth();
//   const [greeting, setGreeting] = useState('');
//   const [showMap, setShowMap] = useState(false);
//   const [userLocation, setUserLocation] = useState(null);
//   const [hospitals, setHospitals] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   useEffect(() => {
//     // Set greeting based on time of day
//     const hour = new Date().getHours();
//     let greetText = '';
    
//     if (hour < 12) greetText = 'Good morning';
//     else if (hour < 18) greetText = 'Good afternoon';
//     else greetText = 'Good evening';
    
//     setGreeting(greetText);
//   }, []);
  
//   // Get user's current location
//   const getUserLocation = () => {
//     setLoading(true);
//     setError(null);
    
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation({ lat: latitude, lng: longitude });
//           fetchNearbyHospitals(latitude, longitude);
//         },
//         (error) => {
//           setLoading(false);
//           setError('Unable to retrieve your location. Please enable location services.');
//           console.error('Geolocation error:', error);
//         }
//       );
//     } else {
//       setLoading(false);
//       setError('Geolocation is not supported by your browser.');
//     }
//   };
  
//   // Fetch nearby hospitals using coordinates
//   const fetchNearbyHospitals = async (latitude, longitude) => {
//     try {
//       // In a real application, you would call your backend API or a maps service API
//       // This is a mock implementation with sample data
//       setTimeout(() => {
//         const mockHospitals = [
//           { id: 1, name: 'General Hospital', distance: '0.8 miles', lat: latitude + 0.01, lng: longitude - 0.01 },
//           { id: 2, name: 'City Medical Center', distance: '1.2 miles', lat: latitude - 0.01, lng: longitude + 0.02 },
//           { id: 3, name: 'Community Health Clinic', distance: '2.5 miles', lat: latitude + 0.02, lng: longitude + 0.01 },
//           { id: 4, name: 'University Hospital', distance: '3.0 miles', lat: latitude - 0.03, lng: longitude - 0.02 },
//         ];
        
//         setHospitals(mockHospitals);
//         setLoading(false);
//       }, 1000);
      
//       // For a real implementation, you would use something like:
//       /*
//       const response = await fetch(`/api/hospitals?lat=${latitude}&lng=${longitude}`);
//       const data = await response.json();
//       setHospitals(data);
//       setLoading(false);
//       */
//     } catch (error) {
//       setLoading(false);
//       setError('Failed to fetch nearby hospitals. Please try again later.');
//       console.error('Fetch error:', error);
//     }
//   };
  
//   // Handle the view hospitals button click
//   const handleViewHospitals = () => {
//     setShowMap(true);
//     getUserLocation();
//   };
  
//   // Close the map modal
//   const closeMap = () => {
//     setShowMap(false);
//     setHospitals([]);
//     setUserLocation(null);
//   };
  
//   // Map Component
//   const HospitalMap = () => {
//     useEffect(() => {
//       if (!userLocation || !showMap) return;
      
//       // Initialize map
//       const mapScript = document.createElement('script');
//       mapScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
//       mapScript.async = true;
      
//       window.initMap = function() {
//         const mapDiv = document.getElementById('hospital-map');
//         const map = new window.google.maps.Map(mapDiv, {
//           center: userLocation,
//           zoom: 13,
//         });
        
//         // Add user marker
//         new window.google.maps.Marker({
//           position: userLocation,
//           map: map,
//           title: 'Your Location',
//           icon: {
//             path: window.google.maps.SymbolPath.CIRCLE,
//             scale: 10,
//             fillColor: '#4285F4',
//             fillOpacity: 1,
//             strokeWeight: 2,
//             strokeColor: '#FFFFFF',
//           }
//         });
        
//         // Add hospital markers
//         hospitals.forEach(hospital => {
//           new window.google.maps.Marker({
//             position: { lat: hospital.lat, lng: hospital.lng },
//             map: map,
//             title: hospital.name,
//           });
//         });
//       };
      
//       document.head.appendChild(mapScript);
      
//       return () => {
//         document.head.removeChild(mapScript);
//         window.initMap = null;
//       };
//     }, [userLocation, hospitals, showMap]);
    
//     return (
//       <div className="map-container">
//         <div id="hospital-map" style={{ width: '100%', height: '400px' }}></div>
//       </div>
//     );
//   };
  
//   if (!currentUser) {
//     return (
//       <div className="dashboard-container">
//         <div className="dashboard-card">
//           <h2>Loading...</h2>
//         </div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="dashboard-container">
//       <header className="dashboard-header">
//         <h1>Fit Fact Portal</h1>
//         <button className="logout-btn" onClick={logout}>Logout</button>
//       </header>
      
//       <div className="dashboard-content">
//         <div className="welcome-card">
//           <h2>{greeting}, {currentUser.name}</h2>
//           <p>You are logged in as a {role}</p>
//         </div>
        
//         <div className="info-card">
//           <h3>Your Profile</h3>
//           <div className="profile-info">
//             <p><strong>Name:</strong> {currentUser.name}</p>
//             <p><strong>Email:</strong> {currentUser.email}</p>
//             <p><strong>Account Type:</strong> {role === 'user' ? 'User' : 'Doctor'}</p>
            
//             {role === 'doctor' && (
//               <>
//                 <p><strong>Medical License:</strong> {currentUser.medicalLicenseNo}</p>
//                 <p><strong>Qualification:</strong> {currentUser.qualification}</p>
//                 <p><strong>License Expiry:</strong> {new Date(currentUser.licenseExpiryDate).toLocaleDateString()}</p>
//               </>
//             )}
//           </div>
//         </div>
        
//         {role === 'user' ? (
//           <div className="dashboard-cards">
//             <div className="dashboard-card">
//               <h3>My Health History</h3>
//               <p>View past medical history </p>
//               <button className="card-btn">View History</button>
//             </div>
            
//             <div className="dashboard-card">
//               <h3>Nearby Hospitals</h3>
//               <p>Find nearby hospitals</p>
//               <button className="card-btn" onClick={handleViewHospitals}>View Hospitals</button>
//             </div>
            
//             <div className="dashboard-card">
//               <h3>Health News</h3>
//               <p>Stay updated with health news</p>
//               <button className="card-btn">View News</button>
//             </div>
//           </div>
//         ) : (
//           <div className="dashboard-cards">
//             <div className="dashboard-card">
//               <h3>My Health History</h3>
//               <p>View past medical history </p>
//               <button className="card-btn">View History</button>
//             </div>
            
//             <div className="dashboard-card">
//               <h3>Nearby Hospitals</h3>
//               <p>Find nearby hospitals</p>
//               <button className="card-btn">View Hospitals</button>
//             </div>
            
//             <div className="dashboard-card">
//               <h3>Health News</h3>
//               <p>Stay updated with health news</p>
//               <button className="card-btn">View News</button>
//             </div>
//           </div>
//         )}
//       </div>
      
//       {/* Hospital Map Modal */}
//       {showMap && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h2>Nearby Hospitals</h2>
//               <button className="close-btn" onClick={closeMap}>×</button>
//             </div>
            
//             {loading && <p className="loading-text">Loading nearby hospitals...</p>}
//             {error && <p className="error-text">{error}</p>}
            
//             {userLocation && !loading && !error && (
//               <>
//                 <HospitalMap />
                
//                 <div className="hospitals-list">
//                   <h3>Hospitals Near You</h3>
//                   {hospitals.length > 0 ? (
//                     <ul>
//                       {hospitals.map(hospital => (
//                         <li key={hospital.id}>
//                           <span className="hospital-name">{hospital.name}</span>
//                           <span className="hospital-distance">{hospital.distance}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p>No hospitals found in your area.</p>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;




import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { currentUser, role, logout } = useAuth();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    let greetText = '';
    
    if (hour < 12) greetText = 'Good morning';
    else if (hour < 18) greetText = 'Good afternoon';
    else greetText = 'Good evening';
    
    setGreeting(greetText);
  }, []);
  
  // Get user's current location
  const getUserLocation = () => {
    setLoading(true);
    setError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          fetchNearbyHospitals(latitude, longitude);
        },
        (error) => {
          setLoading(false);
          setError('Unable to retrieve your location. Please enable location services.');
          console.error('Geolocation error:', error);
        }
      );
    } else {
      setLoading(false);
      setError('Geolocation is not supported by your browser.');
    }
  };
  
  // Fetch nearby hospitals using coordinates
  const fetchNearbyHospitals = async (latitude, longitude) => {
    try {
      // In a real application, you would call your backend API or a maps service API
      // This is a mock implementation with sample data
      setTimeout(() => {
        const mockHospitals = [
          { id: 1, name: 'General Hospital', distance: '0.8 miles', lat: latitude + 0.01, lng: longitude - 0.01 },
          { id: 2, name: 'City Medical Center', distance: '1.2 miles', lat: latitude - 0.01, lng: longitude + 0.02 },
          { id: 3, name: 'Community Health Clinic', distance: '2.5 miles', lat: latitude + 0.02, lng: longitude + 0.01 },
          { id: 4, name: 'University Hospital', distance: '3.0 miles', lat: latitude - 0.03, lng: longitude - 0.02 },
        ];
        
        setHospitals(mockHospitals);
        setLoading(false);
      }, 1000);
      
      // For a real implementation, you would use something like:
      /*
      const response = await fetch(`/api/hospitals?lat=${latitude}&lng=${longitude}`);
      const data = await response.json();
      setHospitals(data);
      setLoading(false);
      */
    } catch (error) {
      setLoading(false);
      setError('Failed to fetch nearby hospitals. Please try again later.');
      console.error('Fetch error:', error);
    }
  };
  
  // Handle the view hospitals button click
  const handleViewHospitals = () => {
    setShowMap(true);
    getUserLocation();
  };
  
  // Handle the view news button click - Redirect to health news page
  const handleViewNews = () => {
    navigate('/health-news');
  };
  
  // Close the map modal
  const closeMap = () => {
    setShowMap(false);
    setHospitals([]);
    setUserLocation(null);
  };
  
  // Map Component
  const HospitalMap = () => {
    useEffect(() => {
      if (!userLocation || !showMap) return;
      
      // Initialize map
      const mapScript = document.createElement('script');
      mapScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
      mapScript.async = true;
      
      window.initMap = function() {
        const mapDiv = document.getElementById('hospital-map');
        const map = new window.google.maps.Map(mapDiv, {
          center: userLocation,
          zoom: 13,
        });
        
        // Add user marker
        new window.google.maps.Marker({
          position: userLocation,
          map: map,
          title: 'Your Location',
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#4285F4',
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#FFFFFF',
          }
        });
        
        // Add hospital markers
        hospitals.forEach(hospital => {
          new window.google.maps.Marker({
            position: { lat: hospital.lat, lng: hospital.lng },
            map: map,
            title: hospital.name,
          });
        });
      };
      
      document.head.appendChild(mapScript);
      
      return () => {
        document.head.removeChild(mapScript);
        window.initMap = null;
      };
    }, [userLocation, hospitals, showMap]);
    
    return (
      <div className="map-container">
        <div id="hospital-map" style={{ width: '100%', height: '400px' }}></div>
      </div>
    );
  };
  
  if (!currentUser) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-card">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Fit Fact Portal</h1>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </header>
      
      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>{greeting}, {currentUser.name}</h2>
          <p>You are logged in as a {role}</p>
        </div>
        
        <div className="info-card">
          <h3>Your Profile</h3>
          <div className="profile-info">
            <p><strong>Name:</strong> {currentUser.name}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>Account Type:</strong> {role === 'user' ? 'User' : 'Doctor'}</p>
            
            {role === 'doctor' && (
              <>
                <p><strong>Medical License:</strong> {currentUser.medicalLicenseNo}</p>
                <p><strong>Qualification:</strong> {currentUser.qualification}</p>
                <p><strong>License Expiry:</strong> {new Date(currentUser.licenseExpiryDate).toLocaleDateString()}</p>
              </>
            )}
          </div>
        </div>
        
        {role === 'user' ? (
          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h3>My Health History</h3>
              <p>View past medical history </p>
              <button className="card-btn">View History</button>
            </div>
            
            <div className="dashboard-card">
              <h3>Nearby Hospitals</h3>
              <p>Find nearby hospitals</p>
              <button className="card-btn" onClick={handleViewHospitals}>View Hospitals</button>
            </div>
            
            <div className="dashboard-card">
              <h3>Health News</h3>
              <p>Stay updated with health news</p>
              <button className="card-btn" onClick={handleViewNews}>View News</button>
            </div>
          </div>
        ) : (
          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h3>My Health History</h3>
              <p>View past medical history </p>
              <button className="card-btn">View History</button>
            </div>
            
            <div className="dashboard-card">
              <h3>Nearby Hospitals</h3>
              <p>Find nearby hospitals</p>
              <button className="card-btn" onClick={handleViewHospitals}>View Hospitals</button>
            </div>
            
            <div className="dashboard-card">
              <h3>Health News</h3>
              <p>Stay updated with health news</p>
              <button className="card-btn" onClick={handleViewNews}>View News</button>
            </div>
          </div>
        )}
      </div>
      
      {/* Hospital Map Modal */}
      {showMap && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Nearby Hospitals</h2>
              <button className="close-btn" onClick={closeMap}>×</button>
            </div>
            
            {loading && <p className="loading-text">Loading nearby hospitals...</p>}
            {error && <p className="error-text">{error}</p>}
            
            {userLocation && !loading && !error && (
              <>
                <HospitalMap />
                
                <div className="hospitals-list">
                  <h3>Hospitals Near You</h3>
                  {hospitals.length > 0 ? (
                    <ul>
                      {hospitals.map(hospital => (
                        <li key={hospital.id}>
                          <span className="hospital-name">{hospital.name}</span>
                          <span className="hospital-distance">{hospital.distance}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No hospitals found in your area.</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;