import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Navbar = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const patientLinks = [
    { to: '/patient/dashboard', label: 'Dashboard' },
    { to: '/patient/clinics', label: 'Clinics' },
    { to: '/patient/book', label: 'Book' },
    { to: '/patient/history', label: 'History' },
    { to: '/patient/profile', label: 'Profile' },
    { to: '/patient/feedback', label: 'Feedback' },
  ];
  const doctorLinks = [
    { to: '/doctor/dashboard', label: 'Dashboard' },
    { to: '/doctor/calendar', label: 'Calendar' },
    { to: '/doctor/appointments', label: 'Appointments' },
    { to: '/doctor/patient-search', label: 'Patient Search' },
    { to: '/doctor/patient-history', label: 'Patient History' },
    { to: '/doctor/profile', label: 'Profile' },
    { to: '/doctor/analytics', label: 'Analytics' },
  ];
  const links = user.role === 'patient' ? patientLinks : doctorLinks;

  return (
    <AppBar position="static" color="primary" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {user.role === 'patient' ? 'Patient App' : 'Doctor App'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {links.map(link => (
            <Button
              key={link.to}
              color="inherit"
              component={RouterLink}
              to={link.to}
            >
              {link.label}
            </Button>
          ))}
          <Button color="inherit" onClick={logout} sx={{ ml: 2 }}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
