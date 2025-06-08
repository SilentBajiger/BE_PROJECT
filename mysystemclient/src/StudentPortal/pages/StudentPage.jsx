import React, { useEffect, useState } from 'react';
import Upload from './components/Upload';
import Uploaded from './components/Uploaded';
import { useNavigate } from 'react-router';
import { Button, Container, Typography, Paper, Box, Snackbar } from '@mui/material';

const StudentPage = () => {
  const [upload, setUpload] = useState(true);
  const [text, setText] = useState('See Uploaded Documents');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [utext, setUText] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [userId,setUserId] = useState('');
  const [uploading,setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('system-token');
    const user = JSON.parse(token);
    if (!user) {
      navigate('/student/login');
    }
    setUserId(user?.userId);
  }, [navigate]);

  useEffect(() => {
    if (upload) {
      setText('See Uploaded Documents');
    } else {
      setText('Upload a Document');
    }
  }, [upload]);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 3 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, color: '#4E73DF' }}>
          Student Profile Page
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setUpload(!upload);
              // setClicked(true);
              // setBtnDisabled(true);
              setUText('');
            }}
            sx={{
              padding: '10px 20px',
              textTransform: 'none',
              backgroundColor: '#4E73DF',
              '&:hover': {
                backgroundColor: '#3e65c1',
              },
            }}
          >
            {text}
          </Button>

          {upload ? (
            <Upload uploading={uploading} setUploading={setUploading} btnDisabled={btnDisabled} setBtnDisabled={setBtnDisabled} text={utext} setText={setUText} />
          ) : (
            <Uploaded userId={userId} setUserId={setUserId} />
          )}
        </Box>
      </Paper>

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        onClose={handleSnackbarClose}
        message="Action completed successfully"
        autoHideDuration={3000}
      />
    </Container>
  );
};

export default StudentPage;






















