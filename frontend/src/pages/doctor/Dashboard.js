import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const quickLinks = [
  { label: 'Calendar', path: '/doctor/calendar' },
  { label: 'Appointments', path: '/doctor/appointments' },
  { label: 'Patient Search', path: '/doctor/patient-search' },
  { label: 'Patient History', path: '/doctor/patient-history' },
  { label: 'Profile', path: '/doctor/profile' },
  { label: 'Analytics', path: '/doctor/analytics' },
];

const DoctorDashboard = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Welcome, Doctor
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
        Manage your schedule, appointments, and patient information from your dashboard.
      </Typography>
      <Grid container spacing={3}>
        {quickLinks.map(link => (
          <Grid item xs={12} sm={6} md={4} key={link.path}>
            <Card>
              <CardActionArea onClick={() => navigate(link.path)}>
                <CardContent>
                  <Typography variant="h6" align="center">
                    {link.label}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DoctorDashboard;
