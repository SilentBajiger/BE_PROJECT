import React, { useEffect, useState } from 'react';
import Upload from './components/Upload';
import Uploaded from './components/Uploaded';
import { useNavigate } from 'react-router';
import {
  Button,
  Container,
  Typography,
  Paper,
  Box,
  Snackbar,
} from '@mui/material';
import { motion } from 'framer-motion';

const StudentPage = () => {
  const [upload, setUpload] = useState(true);
  const [text, setText] = useState('See Uploaded Documents');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [utext, setUText] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [userId, setUserId] = useState('');
  const [uploading, setUploading] = useState(false);

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
    setText(upload ? 'See Uploaded Documents' : 'Upload a Document');
  }, [upload]);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        height: '85vh',
        width: '100%',
        background: 'linear-gradient(to right,rgb(220, 254, 255),rgb(248, 255, 216))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 4,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '800px' }}
      >
        <Paper
          elevation={4}
          sx={{
            padding: 4,
            borderRadius: 4,
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600, color: '#4E73DF' }}
          >
            Student Profile
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 3,
              mb: 4,
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                setUpload(!upload);
                setUText('');
              }}
              sx={{
                padding: '10px 25px',
                textTransform: 'none',
                fontWeight: 'bold',
                backgroundColor: '#4E73DF',
                '&:hover': {
                  backgroundColor: '#3e65c1',
                },
              }}
            >
              {text}
            </Button>
          </Box>

          <Box sx={{ px: 1 }}>
            {upload ? (
              <Upload
                uploading={uploading}
                setUploading={setUploading}
                btnDisabled={btnDisabled}
                setBtnDisabled={setBtnDisabled}
                text={utext}
                setText={setUText}
              />
            ) : (
              <Uploaded userId={userId} setUserId={setUserId} />
            )}
          </Box>
        </Paper>

        <Snackbar
          open={openSnackbar}
          onClose={handleSnackbarClose}
          message="Action completed successfully"
          autoHideDuration={3000}
        />
      </motion.div>
    </Box>
  );
};

export default StudentPage;
