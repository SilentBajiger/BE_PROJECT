import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Link as MuiLink,
  Divider,
  Grid,
  Chip,
  Tooltip,
} from '@mui/material';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const AdminDashBoard = () => {
  const [docs, setDocs] = useState([]);

  const fetchDocs = async () => {
    try {
      const response = await axios.get('http://localhost:5001/admin/get-docs');
      setDocs(response.data.docs);
    } catch (error) {
      alert('Error fetching documents');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <Box
      sx={{
        p: 4,
        pt: 10,
        minHeight: '100vh',
        background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        gutterBottom
        align="center"
        sx={{ mb: 5, color: '#2c3e50' }}
      >
        <FolderSharedIcon sx={{ mr: 1, fontSize: 40, color: '#4E73DF' }} />
        Admin Dashboard
      </Typography>

      <Grid container spacing={4}>
        {docs?.map((user, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 6,
                backgroundColor: '#ffffff',
                transition: 'transform 0.3s ease-in-out',
                border: '1px solid #e0e0e0',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 10,
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', color: '#34495e' }}
                  >
                    👤 User
                  </Typography>
                  <Chip
                    label={`ID: ${user.userId}`}
                    sx={{
                      background: 'linear-gradient(to right, #4E73DF, #6A89CC)',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  />
                </Box>
                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle1" sx={{ color: '#7f8c8d' }}>
                  Uploaded Documents:
                </Typography>
                {user?.documents?.length === 0 ? (
                  <Typography sx={{ mt: 1, color: 'gray' }}>No documents found.</Typography>
                ) : (
                  user?.documents?.map((doc, idx) => (
                    <Tooltip key={idx} title="View Document" arrow>
                      <MuiLink
                        href={doc.url}
                        target="_blank"
                        rel="noopener"
                        underline="hover"
                        display="flex"
                        alignItems="center"
                        sx={{
                          mt: 1,
                          color: '#2980b9',
                          fontWeight: 500,
                          '&:hover': { color: '#1abc9c' },
                        }}
                      >
                        <InsertDriveFileIcon fontSize="small" sx={{ mr: 1 }} />
                        {doc.fileName}
                      </MuiLink>
                    </Tooltip>
                  ))
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminDashBoard;
