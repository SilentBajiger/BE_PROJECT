import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';

const SignUp = () => {
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

      const response = await axios.post('http://localhost:5000/user/signup', user);

      if (response.status !== 200) {
        alert(response.data.msg);
        return;
      }
      alert(response.data.msg);
      navigate('/student/login');
      setUser({ userId: '', password: '' });
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 3 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, color: '#4E73DF' }}>
          SignUp
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
              Sign Up
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;















































