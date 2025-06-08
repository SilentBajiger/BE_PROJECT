import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Paper,
  Divider,
  Stack,
  CircularProgress,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useRef } from 'react';

const Admin = ({
  
  readyToSend,
  setReadyToSend,
  user,
  loading,
  }) => {

    const [file, setFile] = useState(null);
    const [refFile,setRefFile] = useState(null);
    const [response, setResponse] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [btnText, setBtnText] = useState('Upload');
    const [digilocker_user_id,set_digilocker_user_id] = useState('');
    const [digilocker_password,set_digilocker_password] = useState('');
    const [uploading,setUploading] = useState(false)
    const [btnDisabled,setBtnDisabled] = useState(false)
    const [text,setText] = useState('')
    const fileInputRef = useRef(null);
    const refFileInputRef = useRef(null);
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
      setBtnText('Upload');
      // setBtnDisabled(false);
    };
    const handleRefFileChange = (e) => {
      setRefFile(e.target.files[0]);
      setBtnText('Upload');
      // setBtnDisabled(false);
    };
    
    useEffect(()=>{
      // setBtnDisabled(false);
      // if(digilocker_user_id && digilocker_password && file) setBtnDisabled(false);
      // if(!digilocker_user_id || !digilocker_password) setBtnDisabled(true);
    },[digilocker_user_id,digilocker_password,file])
  
    const handleUpload = async () => {
      if (!file) return alert('Please select a file');
      if(!digilocker_password || !digilocker_user_id){
        alert("Fill All the Fields");
        return;
      }
      const formData = new FormData();
      formData.append('original', file);  // e.g., original document
      formData.append('reference', refFile);
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
  
      try {
        const res = await axios.post('http://localhost:5000/admin/upload', formData, {
          
        });
        console.log("Upload response .: " + (res));
        setResponse(res.data);
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setBtnText('Uploaded ✅');
        setFile(null);
        fileInputRef.current.value = '';
        refFileInputRef.current.value = '';
      } catch (err) {
        console.error(err);
        setSnackbarSeverity('error');
        setResponse({ msg: err?.response?.data?.msg });
        setOpenSnackbar(true);
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
              
              fullWidth
              sx={{ my: 2 }}
            >
              Choose Original File
            </Button>
          </label>
          <input
            type="file"
            ref={refFileInputRef}
            onChange={handleRefFileChange}
            style={{ display: 'none' }}
            id="ref-file-input"
          />
          <label htmlFor="ref-file-input">
            <Button
              variant="outlined"
              component="span"
              color="primary"
              
              fullWidth
              sx={{ my: 2 }}
            >
              Choose Ref File
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
              {refFile && (
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
                  Selected: {refFile.name}
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

export default Admin;















































