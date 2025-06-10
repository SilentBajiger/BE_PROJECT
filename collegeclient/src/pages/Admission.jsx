import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Divider,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import axios from 'axios';
import uploadToDrive from './UploadToDrive';

const Admission = () => {
  const [documents, setDocuments] = useState([]);
  const [docsLinksToCollege, setDocsLinksToCollege] = useState([]);
  const [gotDoc, setGotDoc] = useState("Not Yet");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userId: '',
    fullName: '',
    contact: '',
    email: '',
    documents: null,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const fetchFromMySystem = () => {
    return new Promise((resolve) => {
      const popup = window.open("http://localhost:3001/fetch", "MySystem", "width=1900,height=1000");
      const listener = (event) => {
        if (event.data.sourceUrl !== "http://localhost:3001/fetch") return;
        if (event.data.type === "DOCS_SELECTED") {
          setDocuments(event.data.docs.downloadedDocs);
          setFormData((prev) => ({ ...prev, userId: event.data.docs.userId }));
          setGotDoc("GOT IT ✅");
          window.removeEventListener("message", listener);
          popup.close();
          resolve();
        }
      };
      window.addEventListener("message", listener);
    });
  };

  const handleFileChange = (e) =>
    setFormData({ ...formData, document: e.target.files[0] });

  const handleUrlGeneration = async () => {
    try {
      const uploaded = await Promise.all(
        documents.map(async (doc) => {
          const { url } = await uploadToDrive(doc);
          return { fileName: doc.fileName, url };
        })
      );
      setDocsLinksToCollege(uploaded);
    } catch (err) {
      alert("Error uploading documents.");
      console.error(err);
    }
  };

  const handleFormSubmit = async () => {
    try {
      await axios.post('http://localhost:5001/user/submit-form', {
        ...formData,
        documents: docsLinksToCollege,
      });
      console.log("Form submitted successfully");
      alert("✅ Form Submitted Successfully!");
      setFormData({
        userId: '',
        fullName: '',
        contact: '',
        email: '',
        documents: null,
      });
      setDocuments([]);
      setDocsLinksToCollege([]);
      setGotDoc("Not Yet");
      setLoading(false);
    } catch (err) {
      alert("Error submitting form.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (docsLinksToCollege.length === documents.length && documents.length > 0) {
      handleFormSubmit();
    }
  }, [docsLinksToCollege]);

  const handleSubmit = async () => {
    if (!formData.contact || !formData.fullName || !formData.email) {
      alert('⚠️ Please fill all the details');
      return;
    }
    if (documents.length === 0) {
      alert("⚠️ Please fetch at least one document");
      return;
    }
    setLoading(true);
    await handleUrlGeneration();
  };

  return (
    <Box
      component={Paper}
      elevation={10}
      sx={{
        Width: '100%',
        height: '100%',
        mx: 'auto',
        mt: 10,
        p: 5,
        borderRadius: 5,
        background: 'linear-gradient(to right,rgb(229, 203, 250),rgb(255, 199, 233))',
        boxShadow: '0 10px 35px rgba(0, 0, 0, 0.08)',
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 700, color: '#2c3e50' }}
      >
        🎓 Admission Form
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <TextField
        fullWidth
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Contact Number"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
      />

      <Button
        variant="outlined"
        component="label"
        fullWidth
        startIcon={<UploadFileIcon />}
        sx={{
          mt: 3,
          borderRadius: 2,
          fontWeight: 600,
          textTransform: 'none',
          color: '#2c3e50',
          borderColor: '#2c3e50',
          '&:hover': {
            backgroundColor: '#2c3e50',
            color: '#fff',
          },
        }}
        onClick={fetchFromMySystem}
      >
        📂 Fetch My Document
      </Button>

      <input type="file" hidden onChange={handleFileChange} />

      {documents.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle2" color="text.secondary" mb={1}>
            📄 Selected Documents:
          </Typography>
          {documents.map((doc, i) => (
            <Typography key={i} variant="body2" sx={{ pl: 1 }}>
              • {doc.fileName}
            </Typography>
          ))}
        </Box>
      )}

      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 4,
          py: 1.5,
          borderRadius: 3,
          fontWeight: 600,
          fontSize: '1rem',
          textTransform: 'none',
          background: loading ? '#a5b8e3' : '#4E73DF',
        }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? <CircularProgress size={26} color="inherit" /> : '🚀 Submit'}
      </Button>

      <Typography
        variant="body2"
        align="center"
        mt={3}
        sx={{
          fontStyle: 'italic',
          fontWeight: 'bold',
          color: gotDoc === 'GOT IT ✅' ? 'green' : 'gray',
        }}
      >
        Status: {gotDoc}
      </Typography>
    </Box>
  );



  

  // return (
  //   <Box component={Paper} elevation={4} sx={{ maxWidth: 500, mx: 'auto', mt: 6, p: 4, borderRadius: 3, bgcolor: '#f9f9f9' }}>
  //     <Typography variant="h5" align="center" gutterBottom>Admission Form</Typography>
  //     <TextField fullWidth label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} margin="normal" />
  //     <TextField fullWidth label="Contact Number" name="contact" value={formData.contact} onChange={handleChange} margin="normal" />
  //     <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="normal" />
  //     <Button variant="outlined" component="label" fullWidth startIcon={<UploadFileIcon />} sx={{ mt: 2, mb: 1 }} onClick={fetchFromMySystem}>
  //       Fetch My Document
  //     </Button>
  //     <input type="file" hidden onChange={handleFileChange} />
  //     {documents.length > 0 && (
  //       <Typography variant="body2" sx={{ mb: 2 }}>
  //         Selected: {documents.map((doc, i) => <div key={i}>name: {doc.fileName}</div>)}
  //       </Typography>
  //     )}
  //     <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} sx={{ mt: 2 }}>Submit</Button>
  //     <Typography variant="body2" align="center" mt={2}>{gotDoc}</Typography>
  //   </Box>
  // );
};

export default Admission;












// import React, { useState } from 'react';
// import { Box, TextField, Button, Typography, Paper } from '@mui/material';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import { useEffect } from 'react';
// import uploadToCloudinary from './Cloudinary';
// import uploadToDrive from './UploadToDrive';
// import axios from 'axios'

// const Admission = () => {
//   const [documents,setDocuments] = useState([]);
//   const [docsLinksToCollege,setDocsLinksToCollege] = useState([]);
//   const [gotDoc,setGotDoc] = useState("Not Yet");
//   // const [userForm,setUserForm] = useState({userId:'',documents:null});
//   const [formData, setFormData] = useState({
//     userId:'',
//     fullName: '',
//     contact: '',
//     email: '',
//     documents: null,
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   useEffect(()=>{
//     console.log("documents fecthed from mysystem : ",documents);
//   },[documents])
//   useEffect(()=>{
//     console.log("FormDATA" ,formData);
//     console.log("docsLinksToCollege" ,docsLinksToCollege);
//   },[formData,formData?.documents,docsLinksToCollege])

//   const fetchFromMySystem = () => {
//     return new Promise((resolve) => {
//       const popup = window.open("http://localhost:3001/fetch", "MySystem", "width=1900,height=1000");
//       console.log("College: Popup opened");

//       const listener = (event) => {
//         console.log("College: Received message", event.data.sourceUrl);
//         // if (event.origin !== "http://localhost:3001") return;
//         if (event.data.sourceUrl !== "http://localhost:3001/fetch") return;

//         if (event.data.type === "DOCS_SELECTED") {
//           console.log("College: Docs received from MySystem");
//           resolve(event.data.docs.downloadedDocs);
//           setDocuments(event.data.docs.downloadedDocs);
//           setFormData((a)=>{
//             formData.userId = event.data.docs.userId;
//             return formData
//           });
//           setGotDoc("GOT IT");
//           console.log("docs received from Mysystem");
//           console.log(event.data.docs);
//           window.removeEventListener("message", listener);
//           popup.close();
//         }
//       };

//       window.addEventListener("message", listener);
//     });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, document: e.target.files[0] });
//   };
  
  
//   useEffect(()=>{
//     console.log("DOCS LINKS TO COLLEGE" , docsLinksToCollege);
//     console.log("GOT DOC" , documents)
//     console.log(docsLinksToCollege.length ,"===", documents.length)
//     if(docsLinksToCollege.length === documents.length && documents.length > 0){
//       console.log("CALLED FORM SUBMIT")
//       handleFormSubmit();
//     }
//   },[docsLinksToCollege]);

//   const handleUrlGeneration = async()=>{
//     console.log('Submitted:', formData);
//     // return;
//     // handle API submission or logic here
//     try {
//       const list = await Promise.all(
//         documents?.map(async (item) => {
//           const { msg, url } = await uploadToDrive(item);
//           console.log("URL:", url);
//           return { fileName: item.fileName, url };
//         })
//       );
  
//       console.log("LIST:", list);
//       setDocsLinksToCollege(list);
//       console.log("DONE WITH UPLOAD");


//       // let list = [];
//       // documents?.map(async(item)=>{
//       //   const {msg,url} = await uploadToDrive(item);
//       //   list.push({fileName:item.fileName,url:url});
//       //   setDocsLinksToCollege((prev => [...prev,{fileName:item.fileName,url:url}]));
//       //   console.log("URL : ",url);
//       //   return item;
//       // });
//       // console.log("LIST : " , list);
//       // setDocsLinksToCollege(list);
//       // setUserForm({userId:})
//       // setFormData((prev) =>{formData?.documents=[...docsLinksToCollege]});
//         // return {...prev,['documents']:docsLinksToCollege};

//       console.log("DONE WITH UPLOAD");
//     } catch (error) {
//       console.log(error);
//       alert("there is an error in adission.jsx line 84")
      
//     }
//   }

//   const handleFormSubmit = async()=>{
//     try {
//       const response = await axios.post('http://localhost:5001/user/submit-form',{
//         ...formData,
//         // documents:[{fileName:"staitc.url",url:'filenam.url'}]
//         documents:docsLinksToCollege
//       });
//       console.log("submitted");
//       console.log(response);
//     } catch (error) {
//       console.log("Error in line 122 Admission.jsx "+ error);
//       alert("there is an error")
//     }
//   }

//   const handleSubmit = async() => {
//     try {
//       await handleUrlGeneration();
//       console.log("URLS ARE GENERATED");

    
//         console.log(formData);
      
      

//     } catch (error) {
      
//     }
//   };
//   useEffect(()=>{
//     console.log("FormDATA" ,formData);
//     console.log("docsLinksToCollege" ,docsLinksToCollege);
//   },[formData,formData.documents,docsLinksToCollege])

//   return (
//     <Box component={Paper} elevation={4} sx={{maxWidth: 500,margin: 'auto',mt: 6,p: 4,borderRadius: 3,bgcolor: '#f9f9f9'}}>
//       <Typography variant="h5" align="center" gutterBottom>
//         Admission Form
//       </Typography>

//       <TextField
//         fullWidth
//         label="Full Name"
//         name="fullName"
//         value={formData.fullName}
//         onChange={handleChange}
//         margin="normal"
//       />

//       <TextField
//         fullWidth
//         label="Contact Number"
//         name="contact"
//         value={formData.contact}
//         onChange={handleChange}
//         margin="normal"
//       />

//       <TextField
//         fullWidth
//         label="Email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         margin="normal"
//       />

//       <Button
//         variant="outlined"
//         component="label"
//         fullWidth
//         startIcon={<UploadFileIcon />}
//         sx={{ mt: 2, mb: 1 }}
//         onClick={fetchFromMySystem}
//       >
//         Fetch My Document
//       </Button>
//         <input type="file" hidden onChange={handleFileChange} />

//       {documents && (
//         <Typography variant="body2" sx={{ mb: 2 }}>
//           Selected: {documents?.map((item,id)=><div key={id}> name : {item.fileName}</div>)}
//         </Typography>
//       )}

//       <Button
//         variant="contained"
//         color="primary"
//         fullWidth
//         onClick={handleSubmit}
//         sx={{ mt: 2 }}
//       >
//         Submit
//       </Button>
//       <p>{gotDoc}</p>
//     </Box>
//   );
// };

// export default Admission;
