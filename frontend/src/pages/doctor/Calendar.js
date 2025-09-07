import React, { useEffect, useState } from 'react';
import { getDoctorAppointments } from '../../services/api';

const Calendar = () => {
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
        setError('Failed to load appointments');
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
    // eslint-disable-next-line
  }, []);

  // Group appointments by date
  const grouped = appointments.reduce((acc, appt) => {
    (acc[appt.date] = acc[appt.date] || []).push(appt);
    return acc;
  }, {});

  if (loading) return <div>Loading calendar...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="doctor-calendar-container">
      <h2>Appointment Calendar</h2>
      {Object.keys(grouped).length === 0 && <div>No appointments found.</div>}
      {Object.keys(grouped).sort().map(date => (
        <div key={date} style={{ marginBottom: 24 }}>
          <h4>{date}</h4>
          <ul>
            {grouped[date].map(appt => (
              <li key={appt.id}>
                <strong>Time:</strong> {appt.time} <strong>Patient:</strong> {appt.patient?.name} <strong>Status:</strong> {appt.status}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Calendar;
