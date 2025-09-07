import React, { useState } from 'react';
import { registerPatient } from '../../services/api';

const PatientRegister = () => {
  const [form, setForm] = useState({ name: '', phone: '', mrdNumber: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      await registerPatient(form);
      setSuccess(true);
      setForm({ name: '', phone: '', mrdNumber: '' });
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Patient Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone:</label>
          <input name="phone" value={form.phone} onChange={handleChange} required />
        </div>
        <div>
          <label>MRD Number:</label>
          <input name="mrdNumber" value={form.mrdNumber} onChange={handleChange} required />
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Registration successful!</div>}
    </div>
  );
};

export default PatientRegister;
