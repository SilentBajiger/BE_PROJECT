import React from 'react';
import { Link } from 'react-router';
import { Box, Button, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right,rgb(254, 255, 220),rgb(255, 223, 220))',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 'bold', color: '#2c3e50' }}>
        🏠 Welcome Home
      </Typography>

      <Button
        component={Link}
        to="/admission"
        variant="contained"
        sx={{
          textTransform: 'none',
          backgroundColor: '#FF8C42',
          '&:hover': { backgroundColor: '#FF6F00' },
          px: 5,
          py: 1.5,
          fontSize: '1rem',
          borderRadius: 3,
        }}
      >
        🎓 Admission Form
      </Button>

      <Button
        component={Link}
        to="/admin"
        variant="contained"
        sx={{
          textTransform: 'none',
          backgroundColor: '#FF8C42',
          '&:hover': { backgroundColor: '#FF6F00' },
          px: 5,
          py: 1.5,
          fontSize: '1rem',
          borderRadius: 3,
        }}
      >
        🔐 Admin Page
      </Button>

      <Button
        component={Link}
        to="/"
        variant="outlined"
        sx={{
          textTransform: 'none',
          backgroundColor: '#FF8C42',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#FF6F00',
            color: '#fff',
          },
          px: 5,
          py: 1.5,
          fontSize: '1rem',
          borderRadius: 3,
        }}
      >
        🏡 Home
      </Button>
    </Box>
  );
};

export default Home;
