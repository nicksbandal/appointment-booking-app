import React, { useEffect, useState } from 'react';
import { getAppointmentsForPatient, cancelAppointment } from '../../services/api';
import { useNavigate } from 'react-router-dom';

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

  if (loading) return <div>Loading appointment history...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="appointment-history-container">
      <h2>Appointment History</h2>
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <ul>
        {appointments.map(appt => (
          <li key={appt.id} style={{ marginBottom: 16 }}>
            <div>
              <strong>Date:</strong> {appt.date} <strong>Time:</strong> {appt.time}<br />
              <strong>Clinic:</strong> {appt.clinic?.name} <strong>Doctor:</strong> {appt.doctor?.name}<br />
              <strong>Type:</strong> {appt.type} <strong>Status:</strong> {appt.status}<br />
              {appt.status === 'PENDING' && (
                <>
                  <button onClick={() => navigate(`/patient/book?clinicId=${appt.clinic?.id}&doctorId=${appt.doctor?.id}&date=${appt.date}`)}>
                    Reschedule
                  </button>
                  <button onClick={() => handleCancel(appt.id)} disabled={canceling === appt.id}>
                    {canceling === appt.id ? 'Cancelling...' : 'Cancel'}
                  </button>
                </>
              )}
              {appt.status === 'COMPLETED' && (
                <button onClick={() => navigate(`/patient/feedback?appointmentId=${appt.id}`)}>
                  Give Feedback
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      {appointments.length === 0 && <div>No appointments found.</div>}
    </div>
  );
};

export default AppointmentHistory;
