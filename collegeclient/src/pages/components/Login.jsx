import React from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from '@mui/material';

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
        background: 'linear-gradient(to right, #f7f8fc, #dfe9f3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper elevation={6} sx={{ p: 4, width: 350, borderRadius: 4 }}>
        <Typography variant="h5" textAlign="center" fontWeight="bold" mb={3}>
          🔐 Admin Login
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="User ID"
            name="userId"
            value={user.userId}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
            Login
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;














// import React from 'react'
// import { useState } from 'react'
// import AdminDashBoard from './AdminDashBoard';
// import axios from 'axios'
// const Login = ({user,loggedIn,setLoggedIn,setUser}) => {

//     // const [user,setUser] = useState({userId:'',password:''});
//     // const [loggedIn,setLoggedIn] = useState(false);
//     const handleChange = (e) =>{
//         setUser({...user,[e.target.name]:e.target.value});
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // setLoggedIn(true);
//         // return;
//         try {
//           if (user.userId !== 'admin' || user.password !== 'admin') {
//             alert('Please fill all the fields');
//             return;
//           }
//           setLoggedIn(true);
//           setUser({ userId: '', password: '' });
//         } catch (error) {
//           console.log('Error: ' + error);
//         }
//       };


//   return (
//     <div>

       

//             <div>

//         Login

//         <input type="text"  placeholder={"Enter UserId"} onChange={handleChange} value={user.userId} name={'userId'} />
//         <input type="text"  placeholder={"Enter UserId"} onChange={handleChange} value={user.password} name={'password'} />
//         <button onClick={handleSubmit}>login</button>
//         </div>
        

//     </div>
//   )
// }

// export default Login