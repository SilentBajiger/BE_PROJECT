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
  Paper,
} from '@mui/material';

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
        background: 'linear-gradient(to right, #f4f7f8, #eef2f3)',
      }}
    >
      <Typography variant="h3" fontWeight="bold" gutterBottom align="center" sx={{ mb: 4, color: '#2c3e50' }}>
        📁 Admin Dashboard
      </Typography>

      <Grid container spacing={4}>
        {docs?.map((user, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 5,
                backgroundColor: '#ffffffdd',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#34495e' }}>
                  👤 User ID: {user.userId}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle1" fontWeight="medium" sx={{ color: '#7f8c8d' }}>
                  Documents:
                </Typography>
                {user?.documents?.map((doc, idx) => (
                  <MuiLink
                    key={idx}
                    href={doc.url}
                    target="_blank"
                    rel="noopener"
                    underline="hover"
                    display="block"
                    sx={{
                      mt: 1,
                      color: '#2980b9',
                      '&:hover': { color: '#1abc9c' },
                    }}
                  >
                    📄 {doc.fileName}
                  </MuiLink>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminDashBoard;














































// import React from 'react'
// import { useState } from 'react'
// import axios from 'axios';
// import { useEffect } from 'react';

// const AdminDashBoard = () => {

//     const [docs,setDocs] = useState([]);


//     const fetchDocs = async()=>{
//         try {
//             const response = await axios.get('http://localhost:5001/admin/get-docs');
//             console.log(response);
//             setDocs(response.data.docs);
//         } catch (error) {
//             alert('errror');
//             console.log(error);
//         }
//     }
//     useEffect(()=>{
//         fetchDocs();
//     },[])

    
//   return (
//     <div>AdminDashBoardertet


//         {docs?.map((item,index)=><div key={index}>
//             <p>Name : {item.userId}</p>
//             <h1>Documents : </h1>
//             <br />
//             {
//                 item?.documents?.map((item,index)=>
//                     <div key={index}>
//                         {/* <h1>fileName : {item.fileName}</h1> */}
//                         <a href={item.url}>{item.fileName}</a>
//                     </div>
//                 )
//             }

//         </div>)}

//     </div>
//   )
// }

// export default AdminDashBoard
