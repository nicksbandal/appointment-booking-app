import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const quickLinks = [
  { label: 'Clinics', path: '/patient/clinics' },
  { label: 'Book Appointment', path: '/patient/book' },
  { label: 'Appointment History', path: '/patient/history' },
  { label: 'Profile', path: '/patient/profile' },
  { label: 'Feedback', path: '/patient/feedback' },
];

const PatientDashboard = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Welcome, Patient
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
        Book appointments, manage your profile, and view your appointment history from your dashboard.
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

export default PatientDashboard;
