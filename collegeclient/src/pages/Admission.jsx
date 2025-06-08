import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {CircularProgress} from '@mui/material';
import axios from 'axios';
import uploadToDrive from './UploadToDrive';

const Admission = () => {
  const [documents, setDocuments] = useState([]);
  const [docsLinksToCollege, setDocsLinksToCollege] = useState([]);
  const [gotDoc, setGotDoc] = useState("Not Yet");
  const [loading,setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userId: '',
    fullName: '',
    contact: '',
    email: '',
    documents: null,
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const fetchFromMySystem = () => {
    return new Promise((resolve) => {
      const popup = window.open("http://localhost:3001/fetch", "MySystem", "width=1900,height=1000");
      const listener = (event) => {
        if (event.data.sourceUrl !== "http://localhost:3001/fetch") return;
        if (event.data.type === "DOCS_SELECTED") {
          setDocuments(event.data.docs.downloadedDocs);
          setFormData((prev) => ({ ...prev, userId: event.data.docs.userId }));
          setGotDoc("GOT IT");
          window.removeEventListener("message", listener);
          popup.close();
          resolve();
        }
      };
      window.addEventListener("message", listener);
    });
  };

  const handleFileChange = (e) => setFormData({ ...formData, document: e.target.files[0] });

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
      alert("Error uploading documents (line 84)");
      console.error(err);
    }
  };

  const handleFormSubmit = async () => {
    try {
      await axios.post('http://localhost:5001/user/submit-form', {
        ...formData,
        documents: docsLinksToCollege
      });
      console.log("Form submitted successfully");
      setFormData({
        userId: '',
    fullName: '',
    contact: '',
    email: '',
    documents: null,
      });
      setDocuments([]);
      setDocsLinksToCollege([]);
      setLoading(false);
      alert("Form Submitted Successfully")
    } catch (err) {
      alert("Error submitting form (line 122)");
      console.error(err);
    }
  };

  useEffect(() => {
    if (docsLinksToCollege.length === documents.length && documents.length > 0) {
      handleFormSubmit();
    }
  }, [docsLinksToCollege]);

  const handleSubmit = async () => {
    if(formData.contact === '' || formData.fullName === '' || formData.email === ''){
      alert('Plz Fill All the Details');
      return;
    }
    if(documents.length === 0){
      alert("Plz Fetch Atleast one Document");
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
        maxWidth: 500,
        mx: 'auto',
        mt: 10,
        p: 5,
        borderRadius: 5,
        bgcolor: '#ffffff',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: 'primary.main' }}
      >
        🎓 Admission Form
      </Typography>
  
      <TextField
        fullWidth
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        sx={{ borderRadius: 2 }}
      />
      <TextField
        fullWidth
        label="Contact Number"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        sx={{ borderRadius: 2 }}
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        sx={{ borderRadius: 2 }}
      />
  
      <Button
        variant="outlined"
        component="label"
        fullWidth
        startIcon={<UploadFileIcon />}
        sx={{
          mt: 3,
          textTransform: 'none',
          borderRadius: 2,
          fontWeight: 500,
          borderColor: 'primary.main',
          color: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.main',
            color: '#fff',
          },
        }}
        onClick={fetchFromMySystem}
      >
        Fetch My Document
      </Button>
  
      <input type="file" hidden onChange={handleFileChange} />
  
      {documents.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle2" color="text.secondary">
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
        color="primary"
        fullWidth
        sx={{
          mt: 3,
          py: 1.5,
          borderRadius: 3,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          background:loading?'#B0C5F1':'#4E73DF',
        }}
        onClick={handleSubmit}
      >
        
        {loading ? <><CircularProgress size={28}/></>:"🚀 Submit"}
      </Button>
  
      <Typography
        variant="body2"
        align="center"
        mt={3}
        color={gotDoc === 'GOT IT' ? 'success.main' : 'text.secondary'}
        sx={{ fontStyle: 'italic' }}
      >
        {gotDoc && `Status: ${gotDoc}`}
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
