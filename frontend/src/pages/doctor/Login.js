import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, Typography, TextField, Button, Box, Stack } from '@mui/material';

const DoctorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ role: 'doctor', email });
    navigate('/doctor/dashboard');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Card sx={{ minWidth: 350, p: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom align="center">
            Doctor Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>
              <TextField
                label="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                fullWidth
                autoFocus
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
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

export default DoctorLogin;
