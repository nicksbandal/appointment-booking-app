import React, { useEffect, useState } from 'react';
import { getDoctorAppointments, updateAppointment } from '../../services/api';

const Appointments = () => {
  // Replace with actual doctorId from auth/session
  const doctorId = 1;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const [success, setSuccess] = useState('');

  const fetchAppointments = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getDoctorAppointments(doctorId);
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

  const handleStatus = async (id, status) => {
    setActionLoading(id + status);
    setSuccess('');
    try {
      await updateAppointment(id, { status });
      setSuccess(`Appointment ${status.toLowerCase()}`);
      fetchAppointments();
    } catch (err) {
      setError('Action failed');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <div>Loading appointments...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="doctor-appointments-container">
      <h2>My Appointments</h2>
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <ul>
        {appointments.map(appt => (
          <li key={appt.id} style={{ marginBottom: 16 }}>
            <div>
              <strong>Date:</strong> {appt.date} <strong>Time:</strong> {appt.time}<br />
              <strong>Patient:</strong> {appt.patient?.name} <strong>Type:</strong> {appt.type}<br />
              <strong>Status:</strong> {appt.status}
              {appt.status === 'PENDING' && (
                <>
                  <button onClick={() => handleStatus(appt.id, 'CONFIRMED')} disabled={actionLoading === appt.id + 'CONFIRMED'}>
                    {actionLoading === appt.id + 'CONFIRMED' ? 'Accepting...' : 'Accept'}
                  </button>
                  <button onClick={() => handleStatus(appt.id, 'REJECTED')} disabled={actionLoading === appt.id + 'REJECTED'}>
                    {actionLoading === appt.id + 'REJECTED' ? 'Rejecting...' : 'Reject'}
                  </button>
                </>
              )}
              {appt.status === 'CONFIRMED' && (
                <button onClick={() => handleStatus(appt.id, 'COMPLETED')} disabled={actionLoading === appt.id + 'COMPLETED'}>
                  {actionLoading === appt.id + 'COMPLETED' ? 'Completing...' : 'Mark as Completed'}
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

export default Appointments;
