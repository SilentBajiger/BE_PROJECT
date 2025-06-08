import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
  Paper,
  Stack,
  TextField,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';

const Login = ({setVerified,user,setUser}) => {
  const [name, setName] = useState('');
  

    const handleLogin = async(e) =>{
      // e.preventDefault();
      // return;
      // console.log("called login AAALAY")
      
      try {
      if(user.userId === '' || user.password === ''){
        alert("Plz Fill all the fields");
        return;
      }
      if(user.userId !== 'admin' || user.password !== 'admin'){
        alert("Wrong Credentials")
        return;
      }

      
      setVerified(true);
      // navigate('/student/student-page');
      // setUser({userId:'',password:''});
      
    } catch (error) {
        console.log("Error" + error);
        
        console.log(error?.response?.data.msg)
        alert(error?.response?.data.msg)
    }
    }
  




  return (
    <div>

<Typography variant="h6" mb={2}>
            Login into Your Account
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Enter userId"
              value={user.userId}
              onChange={(e)=>setUser({...user,['userId']:e.target.value})}
              fullWidth
            />
            <TextField
              label="Enter Password"
              value={user.password}
              onChange={(e)=>setUser({...user,['password']:e.target.value})}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              // onClick={() => name === 'ok' && setVerified(true)}
              onClick={() => handleLogin()}
            >
              Login
            </Button>
          </Stack>
    </div>
  )
}

export default Login