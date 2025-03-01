// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LandingPage from './components/LandingPage';
// import UserLogin from './components/UserLogin';
// import UserRegister from './components/UserRegister';
// import DoctorLogin from './components/DoctorLogin';
// import DoctorRegister from './components/DoctorRegister';
// import Dashboard from './components/Dashboard';
// import { AuthProvider } from './context/AuthContext';
// import './styles/global.css';

// // Protected route component
// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem('token');
  
//   if (!token) {
//     return <Navigate to="/" />;
//   }
  
//   return children;
// };

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/user/login" element={<UserLogin />} />
//           <Route path="/user/register" element={<UserRegister />} />
//           <Route path="/doctor/login" element={<DoctorLogin />} />
//           <Route path="/doctor/register" element={<DoctorRegister />} />
//           <Route 
//             path="/dashboard" 
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             } 
//           />
//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;



import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';
import DoctorLogin from './components/DoctorLogin';
import DoctorRegister from './components/DoctorRegister';
import Dashboard from './components/Dashboard';
import HealthNews from './components/HealthNews';
import { AuthProvider } from './context/AuthContext';
import './styles/global.css';

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
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/doctor/register" element={<DoctorRegister />} />
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
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;