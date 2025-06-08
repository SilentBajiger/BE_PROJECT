import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import {
  Typography,
  Box,
  Paper,
  Grid,
  Container,
  Divider,
} from '@mui/material';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';

const Uploaded = ({ userId, setUserId }) => {
  const navigate = useNavigate();
  const [userDocs, setUserDocs] = useState([]);

  const getUploadedDocsNames = async (uid) => {
    try {
      const response = await axios.get(`http://localhost:5000/doc/get-docs-name/${uid}`);
      if (response.status !== 200) alert(response.data.msg);
      setUserDocs(response.data.docs);
    } catch (error) {
      alert('Error while fetching document names.');
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('system-token');
    const user = JSON.parse(token);
    if (!user) {
      navigate('/student/login');
      return;
    }
    setUserId(user.userId);
    getUploadedDocsNames(user.userId);
  }, [navigate, setUserId]);

  return (
    <>
    
    <Container maxWidth="md">
      {/* <Paper  sx={{ p: 4, borderRadius: 3 }}> */}
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, textAlign: 'center' }}>
          Uploaded Documents
        </Typography>
        <Typography variant="subtitle2" align="center" sx={{ mb: 3 }}>
          User ID: <strong>{userId}</strong>
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
          {userDocs.length > 0 ? (
            userDocs.map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper
                  
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: '#fafafa',
                    '&:hover': { backgroundColor: '#f0f0f0' },
                  }}
                >
                  <FolderCopyIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body1" noWrap>
                    {item.fileName}
                  </Typography>
                </Paper>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body2" align="center" color="text.secondary">
                No documents uploaded yet.
              </Typography>
            </Grid>
          )}
        </Grid>
      {/* </Paper> */}
    </Container>
    
    
    
    
    </>
  );
};

export default Uploaded;



















































