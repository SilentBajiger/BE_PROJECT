import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Stack,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import Login from './components/Login';
import axios from 'axios';
import Admin from './components/Admin';

const AdminPortal = () => {
  
  const [readyToSend,setReadyToSend] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading,setLoading] = useState(false);
  const [user, setUser] = useState({
    userId: '',
    password: '',
  });
 
  
  

  
  return (
    <Box component={Paper} elevation={4} sx={{maxWidth: 500,mx: 'auto',mt: 6,p: 4,borderRadius: 3,bgcolor: '#f5f5f5',}}>
      {!verified ? (
        <>
          <Login setVerified={setVerified} user={user} setUser={setUser}/>
        </>
      ) : (
        <>
          <Admin loading={loading} readyToSend={readyToSend} setReadyToSend={setReadyToSend} user={user} />
        </>
      )}
    </Box>
  );
};

export default AdminPortal;
