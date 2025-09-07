import React, { useState } from 'react';
import { getPatient } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const PatientSearch = () => {
  const [searchType, setSearchType] = useState('mrdNumber');
  const [searchValue, setSearchValue] = useState('');
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPatient(null);
    try {
      // For demo, use getPatient by ID (in real app, backend should support search by MRD/phone)
      const res = await getPatient(searchValue);
      setPatient(res.data);
    } catch (err) {
      setError('Patient not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="patient-search-container">
      <h2>Patient Search</h2>
      <form onSubmit={handleSearch}>
        <label>Search by:</label>
        <select value={searchType} onChange={e => setSearchType(e.target.value)}>
          <option value="mrdNumber">MRD Number</option>
          <option value="phone">Phone</option>
        </select>
        <input
          type="text"
          placeholder={searchType === 'mrdNumber' ? 'Enter MRD Number' : 'Enter Phone'}
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>{loading ? 'Searching...' : 'Search'}</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {patient && (
        <div style={{ marginTop: 24 }}>
          <h4>Patient Info</h4>
          <div><strong>Name:</strong> {patient.name}</div>
          <div><strong>Phone:</strong> {patient.phone}</div>
          <div><strong>MRD Number:</strong> {patient.mrdNumber}</div>
          <button onClick={() => navigate(`/doctor/patient-history?patientId=${patient.id}`)}>
            View Appointment History
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientSearch;
