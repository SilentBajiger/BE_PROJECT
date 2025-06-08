import React from 'react';
import { Link } from 'react-router';
import { AppBar, Toolbar, Button, Box, styled } from '@mui/material';

// Styled Link component to work with MUI
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.common.white,
  margin: theme.spacing(0, 1),
  '&:hover': {
    color: theme.palette.secondary.main,
  },
}));

const StudentNavbar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.main', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'center', minHeight: '64px' }}>
        <Box sx={{ display: 'flex', width: '100%', maxWidth: '800px', justifyContent: 'space-evenly' }}>
          <StyledLink to={'/student/login'}>
            <Button color="inherit" sx={{ fontWeight: 'medium' }}>
              Login
            </Button>
          </StyledLink>
          
          <StyledLink to={'/student/signup'}>
            <Button color="inherit" sx={{ fontWeight: 'medium' }}>
              Signup
            </Button>
          </StyledLink>
          
          <StyledLink to={'/student/student-page'}>
            <Button color="inherit" sx={{ fontWeight: 'medium' }}>
              Dashboard
            </Button>
          </StyledLink>
          
          <StyledLink to={'/'}>
            <Button color="inherit" sx={{ fontWeight: 'medium' }}>
              Home
            </Button>
          </StyledLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default StudentNavbar;






