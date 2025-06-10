import React from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  InputAdornment,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';

const Login = ({ user, loggedIn, setLoggedIn, setUser }) => {
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user.userId !== 'admin' || user.password !== 'admin') {
        alert('Invalid credentials. Please try again.');
        return;
      }
      setLoggedIn(true);
      setUser({ userId: '', password: '' });
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        background: 'linear-gradient(to right,rgb(225, 193, 255),rgb(189, 235, 255))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 5,
          width: 380,
          borderRadius: 5,
          backgroundColor: '#ffffffdd',
          boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          mb={3}
          sx={{ color: '#2c3e50' }}
        >
          🔐 Admin Login
        </Typography>

        <Stack spacing={3}>
          <TextField
            label="User ID"
            name="userId"
            value={user.userId}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            sx={{
              py: 1.5,
              fontWeight: 'bold',
              fontSize: '16px',
              background: 'linear-gradient(to right,rgb(231, 187, 255),rgb(180, 233, 255))',
              '&:hover': {
                background: 'linear-gradient(to right,rgb(255, 196, 253),rgb(192, 235, 255))',
              },
            }}
          >
            Login
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
