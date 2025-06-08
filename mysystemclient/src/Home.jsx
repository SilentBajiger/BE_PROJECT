import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Typography, Box } from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
      }}
    >
      <Stack spacing={3} alignItems="center">
        <Typography variant="h3" fontWeight="bold">
          Welcome
        </Typography>
        <Button
          component={Link}
          to="/student"
          variant="contained"
          size="large"
          color="primary"
        >
          Student Portal
        </Button>
        {/* <Button
          component={Link}
          to="/fetch"
          variant="outlined"
          size="large"
          color="secondary"
        >
          College Portal
        </Button> */}
      </Stack>
    </Box>
  );
};

export default Home;
