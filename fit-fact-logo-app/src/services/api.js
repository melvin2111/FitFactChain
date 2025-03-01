import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to attach the token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  // User authentication
  registerUser: (userData) => api.post('/auth/users/register', userData),
  loginUser: (userData) => api.post('/auth/users/login', userData),
  
  // Doctor authentication
  registerDoctor: (doctorData) => api.post('/auth/doctors/register', doctorData),
  loginDoctor: (doctorData) => api.post('/auth/doctors/login', doctorData),
  
  // Get current user/doctor
  getCurrentUser: () => api.get('/auth/me'),
  
  // Logout (client-side only)
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  }
};

export default api;