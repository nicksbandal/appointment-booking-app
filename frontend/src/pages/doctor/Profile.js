import React, { useEffect, useState } from 'react';
import { getDoctor, updateDoctor } from '../../services/api';

const DoctorProfile = () => {
  // Replace with actual doctorId from auth/session
  const doctorId = 1;
  const [profile, setProfile] = useState({ name: '', phone: '', email: '', specialty: '', licenseNumber: '' });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getDoctor(doctorId);
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
      await updateDoctor(doctorId, profile);
      setSuccess('Profile updated');
      setEditing(false);
    } catch (err) {
      setError('Update failed');
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="doctor-profile-container">
      <h2>My Profile</h2>
      {success && <div style={{ color: 'green' }}>{success}</div>}
      {!editing ? (
        <div>
          <div><strong>Name:</strong> {profile.name}</div>
          <div><strong>Phone:</strong> {profile.phone}</div>
          <div><strong>Email:</strong> {profile.email}</div>
          <div><strong>Specialty:</strong> {profile.specialty}</div>
          <div><strong>License Number:</strong> {profile.licenseNumber}</div>
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input name="name" value={profile.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Phone:</label>
            <input name="phone" value={profile.phone} onChange={handleChange} required />
          </div>
          <div>
            <label>Email:</label>
            <input name="email" value={profile.email || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Specialty:</label>
            <input name="specialty" value={profile.specialty || ''} onChange={handleChange} />
          </div>
          <div>
            <label>License Number:</label>
            <input name="licenseNumber" value={profile.licenseNumber || ''} onChange={handleChange} />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default DoctorProfile;
