import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, styled, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: 'white',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
}));

const StudentNavbar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(to right, #4E73DF, #6C5CE7)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left Side - Logo or Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SchoolIcon sx={{ color: 'white' }} />
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
            Student Portal
          </Typography>
        </Box>

        {/* Right Side - Links */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <StyledLink to="/student/login">
            <NavButton>Login</NavButton>
          </StyledLink>
          <StyledLink to="/student/signup">
            <NavButton>Signup</NavButton>
          </StyledLink>
          <StyledLink to="/student/student-page">
            <NavButton>Dashboard</NavButton>
          </StyledLink>
          <StyledLink to="/">
            <NavButton>Home</NavButton>
          </StyledLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default StudentNavbar;
