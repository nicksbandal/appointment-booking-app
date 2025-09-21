import React, { useEffect, useState } from 'react';
import { getAppointmentsForPatient, cancelAppointment } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import './AppointmentHistory.css';

const AppointmentHistory = () => {
  // Replace with actual patientId from auth/session
  const patientId = 1;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [canceling, setCanceling] = useState(null);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAppointmentsForPatient(patientId);
      setAppointments(res.data);
    } catch (err) {
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, []);

  const handleCancel = async (id) => {
    setCanceling(id);
    setSuccess('');
    try {
      await cancelAppointment(id);
      setSuccess('Appointment cancelled');
      fetchAppointments();
    } catch (err) {
      setError(err.response?.data || 'Cancellation failed');
    } finally {
      setCanceling(null);
    }
  };

  return (
    <div className="appointment-history-container">
      <h2>Appointment History</h2>
      {loading ? (
        <div className="status-message">Loading...</div>
      ) : error ? (
        <div className="status-message" style={{ color: 'red' }}>{error}</div>
      ) : (
        <ul className="appointment-list">
          {appointments.length === 0 ? (
            <li className="status-message">No appointments found.</li>
          ) : appointments.map(appt => (
            <li key={appt.id} className="appointment-item">
              <div className="appointment-details">
                <div><strong>Doctor:</strong> {appt.doctor?.name || '-'}</div>
                <div><strong>Clinic:</strong> {appt.clinic?.name || '-'}</div>
                <div><strong>Date:</strong> {appt.date}</div>
                <div><strong>Time:</strong> {appt.time}</div>
                <div><strong>Type:</strong> {appt.type}</div>
                <div><strong>Status:</strong> {appt.status}</div>
              </div>
              <button
                className="cancel-btn"
                onClick={() => handleCancel(appt.id)}
                disabled={canceling === appt.id || !['PENDING', 'CONFIRMED'].includes(appt.status)}
              >
                {canceling === appt.id ? 'Cancelling...' : 'Cancel'}
              </button>
            </li>
          ))}
        </ul>
      )}
      {success && <div className="status-message" style={{ color: 'green' }}>{success}</div>}
    </div>
  );
};

export default AppointmentHistory;
