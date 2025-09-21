import React, { useEffect, useState } from 'react';
import { getPatient, updatePatient } from '../../services/api';
import './Profile.css';

const PatientProfile = () => {
  // Replace with actual patientId from auth/session
  const patientId = 1;
  const [profile, setProfile] = useState({ name: '', phone: '', mrdNumber: '', email: '', address: '', dateOfBirth: '' });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getPatient(patientId);
        setProfile(res.data);
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await updatePatient(patientId, profile);
      setSuccess('Profile updated');
      setEditing(false);
    } catch (err) {
      setError('Update failed');
    }
  };

  return (
    <div className="profile-container">
      <h2>Patient Profile</h2>
      {loading ? (
        <div className="status-message">Loading...</div>
      ) : error ? (
        <div className="status-message" style={{ color: 'red' }}>{error}</div>
      ) : (
        <>
          {!editing ? (
            <div className="profile-details">
              <div><strong>Name:</strong> {profile.name}</div>
              <div><strong>Phone:</strong> {profile.phone}</div>
              <div><strong>MRD Number:</strong> {profile.mrdNumber}</div>
              <div><strong>Email:</strong> {profile.email}</div>
              <div><strong>Address:</strong> {profile.address}</div>
              <div><strong>Date of Birth:</strong> {profile.dateOfBirth}</div>
              <button onClick={() => setEditing(true)}>Edit Profile</button>
            </div>
          ) : (
            <form className="profile-form" onSubmit={handleSubmit}>
              <div>
                <label>Name</label>
                <input name="name" value={profile.name} onChange={handleChange} required />
              </div>
              <div>
                <label>Phone</label>
                <input name="phone" value={profile.phone} onChange={handleChange} required />
              </div>
              <div>
                <label>MRD Number</label>
                <input name="mrdNumber" value={profile.mrdNumber} onChange={handleChange} required />
              </div>
              <div>
                <label>Email</label>
                <input name="email" value={profile.email} onChange={handleChange} />
              </div>
              <div>
                <label>Address</label>
                <input name="address" value={profile.address} onChange={handleChange} />
              </div>
              <div>
                <label>Date of Birth</label>
                <input name="dateOfBirth" type="date" value={profile.dateOfBirth} onChange={handleChange} />
              </div>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditing(false)}>Cancel</button>
            </form>
          )}
        </>
      )}
      {success && <div className="status-message" style={{ color: 'green' }}>{success}</div>}
    </div>
  );
};

export default PatientProfile;
