import React, { useEffect, useState } from 'react';
import { getDoctorAppointments } from '../../services/api';

const Analytics = () => {
  // Replace with actual doctorId from auth/session
  const doctorId = 1;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getDoctorAppointments(doctorId);
        setAppointments(res.data);
      } catch (err) {
        setError('Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
    // eslint-disable-next-line
  }, []);

  const total = appointments.length;
  const completed = appointments.filter(a => a.status === 'COMPLETED').length;
  const pending = appointments.filter(a => a.status === 'PENDING').length;
  const confirmed = appointments.filter(a => a.status === 'CONFIRMED').length;
  const rejected = appointments.filter(a => a.status === 'REJECTED').length;

  if (loading) return <div>Loading analytics...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="doctor-analytics-container">
      <h2>Appointment Analytics</h2>
      <ul>
        <li><strong>Total Appointments:</strong> {total}</li>
        <li><strong>Completed:</strong> {completed}</li>
        <li><strong>Confirmed:</strong> {confirmed}</li>
        <li><strong>Pending:</strong> {pending}</li>
        <li><strong>Rejected:</strong> {rejected}</li>
      </ul>
    </div>
  );
};

export default Analytics;
