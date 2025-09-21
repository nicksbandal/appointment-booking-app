import React, { useEffect, useState } from 'react';
import { getDoctorAppointments } from '../../services/api';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';

const Analytics = () => {
  // Replace with actual doctorId from auth/session
  const doctorId = 1;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getDoctorAppointments(doctorId);
        setAppointments(res.data);
      } catch (err) {
        setError('Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
    // eslint-disable-next-line
  }, []);

  const total = appointments.length;
  const completed = appointments.filter(a => a.status === 'COMPLETED').length;
  const pending = appointments.filter(a => a.status === 'PENDING').length;
  const confirmed = appointments.filter(a => a.status === 'CONFIRMED').length;
  const rejected = appointments.filter(a => a.status === 'REJECTED').length;

  if (loading) return <Container sx={{ mt: 4 }}><Typography>Loading analytics...</Typography></Container>;
  if (error) return <Container sx={{ mt: 4 }}><Typography color="error">{error}</Typography></Container>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Appointment Analytics
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" align="center">Total Appointments</Typography>
              <Typography variant="h4" align="center">{total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" align="center">Completed</Typography>
              <Typography variant="h4" align="center" color="success.main">{completed}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" align="center">Pending</Typography>
              <Typography variant="h4" align="center" color="warning.main">{pending}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" align="center">Confirmed</Typography>
              <Typography variant="h4" align="center" color="info.main">{confirmed}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" align="center">Rejected</Typography>
              <Typography variant="h4" align="center" color="error.main">{rejected}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Analytics;
