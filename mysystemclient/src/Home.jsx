import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e0f7fa, #e1bee7)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Stack spacing={4} alignItems="center">
          <Typography variant="h2" fontWeight="bold" color="primary">
            Welcome
          </Typography>

          <Button
            component={Link}
            to="/student"
            variant="contained"
            size="large"
            sx={{
              px: 5,
              py: 1.5,
              fontSize: '1.1rem',
              borderRadius: '12px',
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s ease-in-out',
            }}
          >
            Student Portal
          </Button>

          {/* Uncomment if needed */}
          {/* <Button
            component={Link}
            to="/fetch"
            variant="outlined"
            size="large"
            sx={{
              px: 5,
              py: 1.5,
              fontSize: '1.1rem',
              borderRadius: '12px',
              color: '#7b1fa2',
              borderColor: '#7b1fa2',
              '&:hover': {
                backgroundColor: '#f3e5f5',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s ease-in-out',
            }}
          >
            College Portal
          </Button> */}
        </Stack>
      </motion.div>
    </Box>
  );
};

export default Home;
