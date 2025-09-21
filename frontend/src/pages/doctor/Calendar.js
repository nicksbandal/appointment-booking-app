import React, { useEffect, useState } from 'react';
import { getDoctorAppointments } from '../../services/api';
import { Container, Typography, Table, TableHead, TableBody, TableRow, TableCell, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
];

function getDateRange(days) {
  const today = new Date();
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d.toISOString().slice(0, 10); // YYYY-MM-DD
  });
}

const Calendar = () => {
  // Replace with actual doctorId from auth/session
  const doctorId = 1;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [days, setDays] = useState(7); // Default to 7 days

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getDoctorAppointments(doctorId);
        if (Array.isArray(res.data)) {
          setAppointments(res.data);
        } else {
          setAppointments([]);
          setError(res.data?.message || 'Failed to load appointments');
        }
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load appointments');
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
    // eslint-disable-next-line
  }, []);

  // Group appointments by date and time (normalize time to HH:mm)
  const grouped = {};
  appointments.forEach(appt => {
    if (!grouped[appt.date]) grouped[appt.date] = {};
    const apptTime = typeof appt.time === 'string' ? appt.time.substring(0,5) : appt.time;
    grouped[appt.date][apptTime] = appt;
  });

  const dateRange = getDateRange(days);

  if (loading) return <Container sx={{ mt: 4 }}><Typography>Loading calendar...</Typography></Container>;
  if (error) return <Container sx={{ mt: 4 }}><Typography color="error">{error}</Typography></Container>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Appointment Calendar
      </Typography>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="days-select-label">Days</InputLabel>
          <Select
            labelId="days-select-label"
            value={days}
            label="Days"
            onChange={e => setDays(Number(e.target.value))}
          >
            <MenuItem value={1}>1 Day</MenuItem>
            <MenuItem value={7}>7 Days</MenuItem>
            <MenuItem value={30}>30 Days</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ overflowX: 'auto', mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              {TIME_SLOTS.map(slot => (
                <TableCell key={slot} align="center">{slot}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dateRange.map(date => (
              <TableRow key={date}>
                <TableCell>{date}</TableCell>
                {TIME_SLOTS.map(slot => {
                  const appt = grouped[date]?.[slot];
                  return (
                    <TableCell
                      key={slot}
                      align="center"
                      sx={{
                        bgcolor: appt ? '#FFA726' : '#66BB6A',
                        color: '#fff',
                        fontWeight: 500,
                        borderRadius: 1,
                        px: 0.5,
                        py: 1
                      }}
                    >
                      {appt ? 'Booked' : 'Free'}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};

export default Calendar;
