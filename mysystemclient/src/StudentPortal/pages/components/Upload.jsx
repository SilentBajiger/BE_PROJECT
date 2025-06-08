import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Typography,
  Paper,
  IconButton,
  Alert,
  TextField,
  LinearProgress
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { keyframes } from '@emotion/react';
import { useSocket } from '../../../Context/ContextProvider';

// Define gradient animation
const gradientAnimation = keyframes`
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
  
`;

const Upload = ({ btnDisabled, setBtnDisabled, text, setText, uploading, setUploading }) => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [btnText, setBtnText] = useState('Upload');
  const [digilocker_user_id,set_digilocker_user_id] = useState('');
  const [digilocker_password,set_digilocker_password] = useState('');
  const [progressVal,setProgressVal] = useState(0);
  const fileInputRef = useRef(null);
  const socket = useSocket();


  useEffect(() => {
    console.log("SOCKET CHECK")
    if (!socket) return;
    console.log("SOCKET PRESENTY")

    socket.on('progressUp', (data) => {
      console.log('Document Uploaded:', data);
      setProgressVal(data?.value)
      console.log("8888888888")
      // show toast or update UI
    });

    return () => {
      socket.off('documentUploaded');
    };
  }, [socket]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setBtnText('Upload');
    setText('');
    setUploading(false);
    setProgressVal(0);
    // setBtnDisabled(false);
  };
  useEffect(()=>{
    setText('');
  },[])
  useEffect(()=>{
    // setBtnDisabled(false);
    if(digilocker_user_id && digilocker_password && file) setBtnDisabled(false);
    if(!digilocker_user_id || !digilocker_password) setBtnDisabled(true);
  },[digilocker_user_id,digilocker_password,file])

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');
    if(!digilocker_password || !digilocker_user_id){
      alert("Fill All the Fields");
      return;
    }
    setBtnDisabled(true);
    const formData = new FormData();
    formData.append('file', file);
    const token = localStorage.getItem('system-token');
    const user = JSON.parse(token);
    if (!user) {
      alert('You are an unauthorized person');
      return;
    }
    

    formData.append('userId', user.userId);
    formData.append('password', user.password);
    formData.append('digilocker_password', digilocker_password);
    formData.append('digilocker_user_id', digilocker_user_id);
    setUploading(true);

    try {
      const res = await axios.post('http://localhost:5000/doc/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log("Upload response .: " + JSON.stringify(res));
      setResponse(res.data);
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setText('File Uploaded Successfully!');
      setBtnText('Uploaded ✅');
      setFile(null);
      setBtnDisabled(false);
      setUploading(false);
      fileInputRef.current.value = '';
    } catch (err) {
      console.error(err);
      setSnackbarSeverity('error');
      setResponse({ msg: err?.response?.data?.msg });
      setOpenSnackbar(true);
      setUploading(false);
      setBtnDisabled(false);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        backgroundColor: '#f5f5f5',
        padding: 4,
      }}
    >
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, width: 400, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Upload Your Document
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      label="Digilocker UserId"
                      variant="outlined"
                      fullWidth
                      required
                      value={digilocker_user_id}
                      onChange={(e) => set_digilocker_user_id(e.target.value)}
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      label="Digilocker Password"
                      variant="outlined"
                      type="password"
                      fullWidth
                      required
                      value={digilocker_password}
                      onChange={(e) => set_digilocker_password(e.target.value)}
                      sx={{ marginBottom: 3 }}
                    />
                   
                  </Box>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="file-input"
        />
        <label htmlFor="file-input">
          <Button
            variant="outlined"
            component="span"
            color="primary"
            startIcon={<UploadFileIcon />}
            fullWidth
            sx={{ my: 2 }}
          >
            Choose File
          </Button>
        </label>

            {file && (
                <Typography
                variant="body2"
                sx={{
                    mb: 2,
                    color: 'text.secondary',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                }}
                >
                Selected: {file.name}
                </Typography>
            )}

        <Button
          variant="contained"
          color="success"
          onClick={handleUpload}
          startIcon={!uploading && <CloudUploadIcon />}
          disabled={btnDisabled}
          fullWidth
          sx={{ mb: 2 }}
        >
          
          {uploading ? <CircularProgress size={24} color="inherit" /> : btnText}
        </Button>
        <Box sx={{ width: '100%' }}>
      <LinearProgress
        variant="determinate"
        value={progressVal}
        sx={{
          height: 7,
          borderRadius: 6,
          backgroundColor: '#e0e0e0',
          '& .MuiLinearProgress-bar': {
            borderRadius: 6,
            backgroundImage: 'linear-gradient(270deg, #ff6ec4, #7873f5, #4ADEDE, #C984FF, #ff6ec4)',
            backgroundSize: '600% 600%',
            animation: `${gradientAnimation} 4s linear infinite`,
          },
        }}
      />
    </Box>
        {/* <Typography>{progressVal}</Typography> */}

        {text?.length > 0 && (
          <Typography variant="body1" color="green" fontWeight={500}>
            {text}
          </Typography>
        )}
      </Paper>
      

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbarSeverity} onClose={handleSnackbarClose} sx={{ width: '100%' }}>
          {response ? response.msg : 'Something went wrong.'}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Upload;