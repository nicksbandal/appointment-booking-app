import React, { useState } from 'react';
import { submitFeedback } from '../../services/api';
import { useLocation, useNavigate } from 'react-router-dom';

const Feedback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const appointmentId = query.get('appointmentId');

  // Replace with actual patientId from auth/session
  const patientId = 1;
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      await submitFeedback({ appointmentId, patientId, rating, comments });
      setSuccess(true);
      setTimeout(() => navigate('/patient/history'), 1500);
    } catch (err) {
      setError(err.response?.data || 'Feedback submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-container">
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rating:</label>
          <select value={rating} onChange={e => setRating(Number(e.target.value))}>
            {[5,4,3,2,1].map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label>Comments:</label>
          <textarea value={comments} onChange={e => setComments(e.target.value)} rows={4} />
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Feedback'}</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Feedback submitted! Thank you.</div>}
    </div>
  );
};

export default Feedback;
