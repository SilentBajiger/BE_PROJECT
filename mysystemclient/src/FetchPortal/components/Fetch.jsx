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
  CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const Fetch = ({
  handleSendToCollege,
  readyToSend,
  setReadyToSend,
  user,
  checkedDocs,
  setCheckedDocs,
  handleSubmitToCollege,
  userDocs,
  setUserDocs,
  loading,
  failedDocs
}) => {

  const fecthDocNames = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/doc/get-docs-name/${user.userId}`);
      if (response.status !== 200) alert(response.data.msg);
      setUserDocs(response.data.docs);
    } catch (error) {
      alert('Error while fetching document names.');
      console.error(error);
    }
  };

  useEffect(() => {
    if (!user.userId) return;
    fecthDocNames();
  }, []);

  const handleToggle = (docId) => {
    if(readyToSend) return;
    setCheckedDocs((prev) =>
      prev.includes(docId) ? prev.filter((id) => id !== docId) : [...prev, docId]
    );
  };

  return (
    <Box
      component={Paper}
      elevation={6}
      sx={{
        maxWidth: 600,
        mx: 'auto',
        mt: { xs: 4, sm: 6 },
        p: { xs: 3, sm: 4 },
        borderRadius: 4,
        bgcolor: '#e3f2fd',
        boxShadow: '0px 6px 20px rgba(30, 136, 229, 0.2)',
      }}
    >
      <Typography
        variant="h5"
        textAlign="center"
        mb={3}
        fontWeight="bold"
        color="primary.main"
      >
        📁 Select Documents from MySystem
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <List dense>
        {userDocs.map((doc) => (
          <ListItem
            key={doc.did}
            onClick={() => handleToggle(doc.did)}
            sx={{
              borderRadius: 2,
              mb: 1,
              px: 2,
              bgcolor: checkedDocs.includes(doc.did) ? '#bbdefb' : '#ffffff',
              transition: '0.2s',
              cursor: 'pointer',
              '&:hover': { bgcolor: '#e3f2fd' },
              boxShadow: checkedDocs.includes(doc.did)
                ? '0 2px 8px rgba(30, 136, 229, 0.2)'
                : 'none',
            }}
          >
            <Checkbox checked={checkedDocs.includes(doc.did)} />
            <ListItemText
              primary={doc.fileName}
              secondary={`Doc ID: ${doc.did}`}
              sx={{ ml: 1 }}
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItem>
        ))}
      </List>

      { failedDocs.length > 0 && <>
      <Typography
        variant="h5"
        textAlign="center"
      
        fontWeight="bold"
        sx={{color:'red'}}
      >
        Failed to Retrieve
      </Typography>
        <List dense>
        {failedDocs.map((doc) => (
          <ListItem
          key={doc.did}
          onClick={() => handleToggle(doc.did)}
          sx={{
            borderRadius: 2,
            mb: 1,
            px: 2,
            border:"2px solid red",
            bgcolor:"#ffb3b3",
            transition: '0.2s',
            cursor: 'pointer',
            '&:hover': { bgcolor: '#ff6666' },
            boxShadow: checkedDocs.includes(doc.did)
            ? '0 2px 8px rgba(254, 68, 68, 0.2)'
            : 'none',
          }}
          >
            <ListItemText
              primary={doc.fileName}
              secondary={`msg: ${doc.msg}`}
              sx={{ ml: 1 }}
              primaryTypographyProps={{ fontWeight: 500 }}
              />
          </ListItem>
        ))}
      </List>
        </>
      }

      <Stack direction="column" spacing={2} mt={4}>
        {!readyToSend ? (
          <Button
            variant="contained"
            color="primary"
            endIcon={!loading && <SendIcon />}
            fullWidth
            onClick={handleSubmitToCollege}
            disabled={loading}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              position: 'relative',
              minHeight: 48,
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'blue' }} />
            ) : (
              'Fetch Selected Docs'
            )}
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="success"
            fullWidth
            onClick={handleSendToCollege}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              borderWidth: 2,
              '&:hover': {
                borderColor: 'success.main',
                bgcolor: '#e8f5e9',
              },
            }}
          >
            Submit to College
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default Fetch;















































