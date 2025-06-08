import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Container, TextField, Button, Box, Typography, Grid, Paper } from '@mui/material';

const Login = () => {
  const [user, setUser] = useState({
    userId: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      if (user.userId === '' || user.password === '') {
        alert('Please fill all the fields');
        return;
      }
      const response = await axios.post('http://localhost:5000/user/login', user);
      if (response.status !== 200) {
        alert(response.data.msg);
        return;
      }
      alert(response.data.msg);
      const data = response.data;
      const token = data.user;
      localStorage.setItem('system-token', JSON.stringify(token));

      navigate('/student/student-page');
      setUser({ userId: '', password: '' });
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 3 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, color: '#4E73DF' }}>
          Login
        </Typography>

        <form onSubmit={handleSignup}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="User ID"
              variant="outlined"
              fullWidth
              required
              value={user.userId}
              onChange={(e) => setUser({ ...user, userId: e.target.value })}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              required
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              sx={{ marginBottom: 3 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSignup}
              fullWidth
              sx={{
                padding: '12px',
                textTransform: 'none',
                backgroundColor: '#4E73DF',
                '&:hover': {
                  backgroundColor: '#3e65c1',
                },
              }}
            >
              Log In
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;


































