import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HealthHistory.css';

const HealthHistory = () => {
  const navigate = useNavigate();
  const [historyEntries, setHistoryEntries] = useState([]);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().substr(0, 10),
    symptom: '',
    mood: 'Neutral',
    sleepHours: '',
    waterIntake: '',
    additionalNotes: ''
  });

  // Load existing entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('healthHistoryEntries');
    if (savedEntries) {
      setHistoryEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage whenever historyEntries changes
  useEffect(() => {
    localStorage.setItem('healthHistoryEntries', JSON.stringify(historyEntries));
  }, [historyEntries]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add new entry with unique ID
    const newEntry = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString()
    };
    
    setHistoryEntries([newEntry, ...historyEntries]);
    
    // Reset form
    setFormData({
      date: new Date().toISOString().substr(0, 10),
      symptom: '',
      mood: 'Neutral',
      sleepHours: '',
      waterIntake: '',
      additionalNotes: ''
    });
  };

  const deleteEntry = (id) => {
    setHistoryEntries(historyEntries.filter(entry => entry.id !== id));
  };

  const goBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="health-history-container">
      <header className="health-history-header">
        <h1>My Health History</h1>
        <button className="back-btn" onClick={goBack}>Back to Dashboard</button>
      </header>

      <div className="health-history-content">
        <div className="health-log-form-container">
          <h2>Log New Health Entry</h2>
          <form onSubmit={handleSubmit} className="health-log-form">
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="symptom">Health Symptom or Reason:</label>
              <input
                type="text"
                id="symptom"
                name="symptom"
                value={formData.symptom}
                onChange={handleInputChange}
                placeholder="E.g., Headache, Annual Checkup, etc."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mood">Mood:</label>
              <select
                id="mood"
                name="mood"
                value={formData.mood}
                onChange={handleInputChange}
                required
              >
                <option value="Very Happy">Very Happy</option>
                <option value="Happy">Happy</option>
                <option value="Neutral">Neutral</option>
                <option value="Sad">Sad</option>
                <option value="Very Sad">Very Sad</option>
                <option value="Anxious">Anxious</option>
                <option value="Stressed">Stressed</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="sleepHours">Hours of Sleep:</label>
              <input
                type="number"
                id="sleepHours"
                name="sleepHours"
                value={formData.sleepHours}
                onChange={handleInputChange}
                placeholder="E.g., 8"
                min="0"
                max="24"
              />
            </div>

            <div className="form-group">
              <label htmlFor="waterIntake">Water Intake (glasses):</label>
              <input
                type="number"
                id="waterIntake"
                name="waterIntake"
                value={formData.waterIntake}
                onChange={handleInputChange}
                placeholder="E.g., 8"
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="additionalNotes">Additional Notes:</label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                placeholder="Any additional information..."
                rows="3"
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">Save Entry</button>
          </form>
        </div>

        <div className="history-entries-container">
          <h2>Previous Entries</h2>
          
          {historyEntries.length === 0 ? (
            <p className="no-entries-message">No health entries yet. Add your first entry using the form.</p>
          ) : (
            <div className="history-entries-list">
              {historyEntries.map(entry => (
                <div key={entry.id} className="history-entry-card">
                  <div className="entry-header">
                    <h3>{entry.symptom}</h3>
                    <span className="entry-date">{new Date(entry.date).toLocaleDateString()}</span>
                    <button 
                      className="delete-entry-btn" 
                      onClick={() => deleteEntry(entry.id)}
                      aria-label="Delete entry"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="entry-details">
                    <p><strong>Mood:</strong> {entry.mood}</p>
                    {entry.sleepHours && <p><strong>Sleep:</strong> {entry.sleepHours} hours</p>}
                    {entry.waterIntake && <p><strong>Water:</strong> {entry.waterIntake} glasses</p>}
                    {entry.additionalNotes && (
                      <div className="entry-notes">
                        <p><strong>Notes:</strong></p>
                        <p>{entry.additionalNotes}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthHistory;