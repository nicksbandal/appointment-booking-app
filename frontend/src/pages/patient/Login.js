import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, Typography, TextField, Button, Box, Stack } from '@mui/material';

const PatientLogin = () => {
  const [phone, setPhone] = useState('');
  const [mrd, setMrd] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ role: 'patient', phone, mrd });
    navigate('/patient/dashboard');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Card sx={{ minWidth: 350, p: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom align="center">
            Patient Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>
              <TextField
                label="Phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
                fullWidth
                autoFocus
              />
              <TextField
                label="MRD"
                value={mrd}
                onChange={e => setMrd(e.target.value)}
                required
                fullWidth
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PatientLogin;
