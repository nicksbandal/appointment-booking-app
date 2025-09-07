import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import { useAuth } from './context/AuthContext';
// Patient pages
import PatientLogin from './pages/patient/Login';
import PatientRegister from './pages/patient/Register';
import PatientDashboard from './pages/patient/Dashboard';
import Clinics from './pages/patient/Clinics';
import BookAppointment from './pages/patient/BookAppointment';
import AppointmentHistory from './pages/patient/AppointmentHistory';
import PatientProfile from './pages/patient/Profile';
import Feedback from './pages/patient/Feedback';
// Doctor pages
import DoctorLogin from './pages/doctor/Login';
import DoctorDashboard from './pages/doctor/Dashboard';
import Calendar from './pages/doctor/Calendar';
import Appointments from './pages/doctor/Appointments';
import PatientSearch from './pages/doctor/PatientSearch';
import PatientHistory from './pages/doctor/PatientHistory';
import DoctorProfile from './pages/doctor/Profile';
import Analytics from './pages/doctor/Analytics';

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to={role === 'doctor' ? '/doctor/login' : '/patient/login'} state={{ from: location }} replace />;
  if (role && user.role !== role) return <Navigate to={`/${user.role}/dashboard`} replace />;
  return children;
}

function App() {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <Routes>
        {/* Patient routes */}
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/patient/register" element={<PatientRegister />} />
        <Route path="/patient/dashboard" element={
          <ProtectedRoute role="patient"><PatientDashboard /></ProtectedRoute>
        } />
        <Route path="/patient/clinics" element={
          <ProtectedRoute role="patient"><Clinics /></ProtectedRoute>
        } />
        <Route path="/patient/book" element={
          <ProtectedRoute role="patient"><BookAppointment /></ProtectedRoute>
        } />
        <Route path="/patient/history" element={
          <ProtectedRoute role="patient"><AppointmentHistory /></ProtectedRoute>
        } />
        <Route path="/patient/profile" element={
          <ProtectedRoute role="patient"><PatientProfile /></ProtectedRoute>
        } />
        <Route path="/patient/feedback" element={
          <ProtectedRoute role="patient"><Feedback /></ProtectedRoute>
        } />
        {/* Doctor routes */}
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/dashboard" element={
          <ProtectedRoute role="doctor"><DoctorDashboard /></ProtectedRoute>
        } />
        <Route path="/doctor/calendar" element={
          <ProtectedRoute role="doctor"><Calendar /></ProtectedRoute>
        } />
        <Route path="/doctor/appointments" element={
          <ProtectedRoute role="doctor"><Appointments /></ProtectedRoute>
        } />
        <Route path="/doctor/patient-search" element={
          <ProtectedRoute role="doctor"><PatientSearch /></ProtectedRoute>
        } />
        <Route path="/doctor/patient-history" element={
          <ProtectedRoute role="doctor"><PatientHistory /></ProtectedRoute>
        } />
        <Route path="/doctor/profile" element={
          <ProtectedRoute role="doctor"><DoctorProfile /></ProtectedRoute>
        } />
        <Route path="/doctor/analytics" element={
          <ProtectedRoute role="doctor"><Analytics /></ProtectedRoute>
        } />
        {/* Default route */}
        <Route path="*" element={<Navigate to={user ? `/${user.role}/dashboard` : '/patient/login'} />} />
      </Routes>
    </>
  );
}

export default App;
