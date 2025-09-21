import React, { useEffect, useState } from 'react';
import { getClinics } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import './Clinics.css';

const Clinics = () => {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const res = await getClinics();
        setClinics(res.data);
      } catch (err) {
        setError('Failed to load clinics');
      } finally {
        setLoading(false);
      }
    };
    fetchClinics();
  }, []);

  if (loading) return <div className="status-message">Loading clinics...</div>;
  if (error) return <div className="status-message" style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="clinics-list-container">
      <h2>Available Clinics</h2>
      <ul className="clinics-list">
        {clinics.map(clinic => (
          <li key={clinic.id} className="clinic-item">
            <div className="clinic-details">
              <strong>{clinic.name}</strong><br />
              {clinic.address}<br />
              {clinic.phone}<br />
            </div>
            <button className="book-btn" onClick={() => navigate(`/patient/book?clinicId=${clinic.id}`)}>
              Book Appointment
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clinics;
