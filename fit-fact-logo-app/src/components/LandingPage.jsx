import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="overlay">
        <div className="landing-content">
          <h1>Welcome to Fit Fact</h1>
          <p>Please select your role to continue</p>
          
          <div className="landing-buttons">
            <button 
              className="btn btn-primary btn-large user-btn"
              onClick={() => navigate('/user/login')}
            >
              I am a User
            </button>
            <button 
              className="btn btn-secondary btn-large doctor-btn"
              onClick={() => navigate('/doctor/login')}
            >
              I am a Doctor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;