import React, { useEffect, useState } from 'react';
import { getClinics, getDoctorsByClinic, getAvailableSlots, bookAppointment } from '../../services/api';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookAppointment.css';

const BookAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const initialClinicId = query.get('clinicId') || '';

  const [clinics, setClinics] = useState([]);
  const [clinicId, setClinicId] = useState(initialClinicId);
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [time, setTime] = useState('');
  const [type, setType] = useState('NEW');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getClinics().then(res => setClinics(res.data));
  }, []);

  useEffect(() => {
    if (clinicId) {
      getDoctorsByClinic(clinicId).then(res => setDoctors(res.data));
    } else {
      setDoctors([]);
    }
    setDoctorId('');
    setSlots([]);
    setTime('');
  }, [clinicId]);

  useEffect(() => {
    if (clinicId && date) {
      getAvailableSlots(clinicId, date).then(res => setSlots(res.data));
    } else {
      setSlots([]);
    }
    setTime('');
  }, [clinicId, date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      // Replace with actual patientId from auth context/session
      const patientId = 1;
      await bookAppointment({ patientId, doctorId, clinicId, date, time, type });
      setSuccess(true);
      setTimeout(() => navigate('/patient/history'), 1500);
    } catch (err) {
      setError(err.response?.data || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-appointment-container">
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Clinic:</label>
          <select value={clinicId} onChange={e => setClinicId(e.target.value)} required>
            <option value="">Select Clinic</option>
            {clinics.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label>Doctor:</label>
          <select value={doctorId} onChange={e => setDoctorId(e.target.value)} required>
            <option value="">Select Doctor</option>
            {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        </div>
        <div>
          <label>Time Slot:</label>
          <select value={time} onChange={e => setTime(e.target.value)} required>
            <option value="">Select Slot</option>
            {slots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
          </select>
        </div>
        <div>
          <label>Type:</label>
          <select value={type} onChange={e => setType(e.target.value)}>
            <option value="NEW">New</option>
            <option value="FOLLOWUP">Follow-up</option>
          </select>
        </div>
        <button type="submit" disabled={loading || !clinicId || !doctorId || !date || !time}>
          {loading ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Appointment booked successfully!</div>}
    </div>
  );
};

export default BookAppointment;
