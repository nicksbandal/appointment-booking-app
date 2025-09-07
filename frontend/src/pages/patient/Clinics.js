import React, { useEffect, useState } from 'react';
import { getClinics } from '../../services/api';
import { useNavigate } from 'react-router-dom';

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

  if (loading) return <div>Loading clinics...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="clinics-list-container">
      <h2>Available Clinics</h2>
      <ul>
        {clinics.map(clinic => (
          <li key={clinic.id}>
            <div>
              <strong>{clinic.name}</strong><br />
              {clinic.address}<br />
              {clinic.phone}<br />
              <button onClick={() => navigate(`/patient/book?clinicId=${clinic.id}`)}>
                Book Appointment
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clinics;
