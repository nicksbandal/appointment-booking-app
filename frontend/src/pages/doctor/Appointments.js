import React, { useEffect, useState } from 'react';
import { getDoctorAppointments, updateAppointment } from '../../services/api';
import { Container, Typography, Grid, Card, CardContent, Button, Box, Stack } from '@mui/material';

const Appointments = () => {
  // Replace with actual doctorId from auth/session
  const doctorId = 1;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const [success, setSuccess] = useState('');

  const fetchAppointments = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getDoctorAppointments(doctorId);
      setAppointments(res.data);
    } catch (err) {
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, []);

  const handleStatus = async (id, status) => {
    setActionLoading(id + status);
    setSuccess('');
    try {
      await updateAppointment(id, { status });
      setSuccess(`Appointment ${status.toLowerCase()}`);
      fetchAppointments();
    } catch (err) {
      setError('Action failed');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <Container sx={{ mt: 4 }}><Typography>Loading appointments...</Typography></Container>;
  if (error) return <Container sx={{ mt: 4 }}><Typography color="error">{error}</Typography></Container>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Doctor Appointments
      </Typography>
      {success && <Typography align="center" color="success.main" sx={{ mb: 2 }}>{success}</Typography>}
      <Grid container spacing={3}>
        {appointments.length === 0 ? (
          <Grid item xs={12}>
            <Typography align="center">No appointments found.</Typography>
          </Grid>
        ) : appointments.map(appt => (
          <Grid item xs={12} sm={6} md={4} key={appt.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" align="center">{appt.patientName}</Typography>
                <Typography variant="body2" align="center">Clinic: {appt.clinicName}</Typography>
                <Typography variant="body2" align="center">Date: {appt.date}</Typography>
                <Typography variant="body2" align="center">Time: {appt.time}</Typography>
                <Typography variant="body2" align="center">Type: {appt.type}</Typography>
                <Typography variant="body2" align="center">Status: {appt.status}</Typography>
                <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={actionLoading === appt.id + 'CONFIRMED' || appt.status !== 'PENDING'}
                    onClick={() => handleStatus(appt.id, 'CONFIRMED')}
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    disabled={actionLoading === appt.id + 'COMPLETED' || appt.status !== 'CONFIRMED'}
                    onClick={() => handleStatus(appt.id, 'COMPLETED')}
                  >
                    Complete
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    disabled={actionLoading === appt.id + 'REJECTED' || appt.status !== 'PENDING'}
                    onClick={() => handleStatus(appt.id, 'REJECTED')}
                  >
                    Reject
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Appointments;
