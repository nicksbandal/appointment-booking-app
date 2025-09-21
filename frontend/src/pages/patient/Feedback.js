import React, { useState } from 'react';
import { submitFeedback } from '../../services/api';
import { useLocation, useNavigate } from 'react-router-dom';
import './Feedback.css';

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

  // Star rating component
  const StarRating = ({ rating, setRating }) => (
    <div className="star-rating">
      {[1,2,3,4,5].map(star => (
        <span
          key={star}
          className={star <= rating ? 'star filled' : 'star'}
          onClick={() => setRating(star)}
          role="button"
          tabIndex={0}
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  );

  return (
    <div className="feedback-container">
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rating:</label>
          <StarRating rating={rating} setRating={setRating} />
        </div>
        <div>
          <label>Comments:</label>
          <textarea
            value={comments}
            onChange={e => setComments(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Feedback submitted successfully!</div>}
    </div>
  );
};

export default Feedback;
