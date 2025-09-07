import React, { useEffect, useState } from 'react';
import { getAppointmentsForPatient, getPatient } from '../../services/api';
import { useLocation } from 'react-router-dom';

const PatientHistory = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const patientId = query.get('patientId');
  const [appointments, setAppointments] = useState([]);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const [apptRes, patientRes] = await Promise.all([
          getAppointmentsForPatient(patientId),
          getPatient(patientId)
        ]);
        setAppointments(apptRes.data);
        setPatient(patientRes.data);
      } catch (err) {
        setError('Failed to load patient history');
      } finally {
        setLoading(false);
      }
    };
    if (patientId) fetchData();
    // eslint-disable-next-line
  }, [patientId]);

  if (!patientId) return <div>No patient selected.</div>;
  if (loading) return <div>Loading patient history...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="doctor-patient-history-container">
      <h2>Patient Appointment History</h2>
      {patient && (
        <div style={{ marginBottom: 16 }}>
          <strong>Name:</strong> {patient.name} <strong>MRD:</strong> {patient.mrdNumber} <strong>Phone:</strong> {patient.phone}
        </div>
      )}
      <ul>
        {appointments.map(appt => (
          <li key={appt.id} style={{ marginBottom: 12 }}>
            <div>
              <strong>Date:</strong> {appt.date} <strong>Time:</strong> {appt.time}<br />
              <strong>Clinic:</strong> {appt.clinic?.name} <strong>Type:</strong> {appt.type} <strong>Status:</strong> {appt.status}
            </div>
          </li>
        ))}
      </ul>
      {appointments.length === 0 && <div>No appointments found for this patient.</div>}
    </div>
  );
};

export default PatientHistory;
