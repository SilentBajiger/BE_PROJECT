import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Stack,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import Fetch from './components/Fetch';
import Login from './components/Login';
import axios from 'axios';

const FetchPortal = () => {
  const [downloadedDocs, setDownloadedDocs] = useState([]);
  const [userDocs, setUserDocs] = useState([]);
  const [readyToSend,setReadyToSend] = useState(false);
  const [failedDocs,setFailedDocs] = useState([]);
  const [checkedDocs, setCheckedDocs] = useState([]);
  const [verified, setVerified] = useState(false);
  const [loading,setLoading] = useState(false);
  const [user, setUser] = useState({
    userId: '',
    password: '',
  });
  const handleSubmitToCollege = async(e) =>{
    e.preventDefault();
    console.log("CALLED SUBMIT to download docs ");
    // return;
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/doc/download',{checkedDocs},{
        headers:{
          "Content-Type":'application/json'
        }
      });
      console.log("res : ",response);
      if(response.status !== 200){
        alert(response.data.msg || response.data.msg);
        return;
      }
      setDownloadedDocs(response.data.docs);
      if(response?.data?.failedDocs && response?.data?.failedDocs?.length > 0){
        
        const newFailedDocs = response?.data?.failedDocs.map((item,key)=>{
          let did = item.did;
          const res = userDocs.find((item) => item.did === did);
          return {...item,...res};
        })
        console.log("NEW FAILED DOCS" + JSON.stringify(newFailedDocs));
        setFailedDocs(newFailedDocs);
      }
      setReadyToSend(true)
      setLoading(false);
    } catch (error) {
      console.log("some thing error " ,error);
      setLoading(false);
      alert(error?.response?.data?.msg);
    }
  }
  useEffect(()=>{
    // downloadedDocs.forEach(i => console.log(i))
    console.log("Downloaded Docs : " + downloadedDocs)
    downloadedDocs?.forEach(item => console.log(item));

    // downloadedDocs.map((item) => {
    //   let doc = userDocs.find(doc => doc.did === item.did);
    //   console.log("singel doc : ",doc);
    //   item.fileName = doc.fileName;
    //   return item;
    // })
    
    
    console.log("Modified Docs : " + downloadedDocs)
    downloadedDocs?.forEach(item => console.log(item));
    if(!downloadedDocs ||  downloadedDocs?.length === 0){
      // alert("File Not Found Either Server is Off or File is not UPloaded")
      return;
    }
    
    // handleSubmit();
    
  },[downloadedDocs]);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    const readFiles = await Promise.all(
      files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({ name: file.name, data: reader.result });
          };
          reader.readAsDataURL(file);
        });
      })
    );

    // setSelectedDocs(readFiles);
  };

  const handleSendToCollege = () => {
    if(downloadedDocs?.length !== 0 && downloadedDocs?.length !== checkedDocs?.length){
      alert("Some Files are missing kindly upload required docs again");
      return;
    }
    if (window.opener) {
      window.opener.postMessage(
        {
          type: 'DOCS_SELECTED',
          docs: {userId:user.userId,downloadedDocs:downloadedDocs},
          sourceUrl: window.location.href,
        },
        'http://localhost:3000'
      );
      console.log('MySystem: Sent selected documents to College');
    } else {
      console.error('No opener found!');
    }
    window.close();
  };

  return (
    <Box component={Paper} elevation={4} sx={{maxWidth: 500,mx: 'auto',mt: 6,p: 4,borderRadius: 3,bgcolor: '#f5f5f5',}}>
      {!verified ? (
        <>
          <Login setVerified={setVerified} user={user} setUser={setUser}/>
        </>
      ) : (
        <>
          <Fetch failedDocs={failedDocs} loading={loading} handleSendToCollege={handleSendToCollege} readyToSend={readyToSend} setReadyToSend={setReadyToSend} userDocs={userDocs} setUserDocs={setUserDocs} user={user} checkedDocs={checkedDocs} setCheckedDocs={setCheckedDocs} handleSubmitToCollege={handleSubmitToCollege}/>
        </>
      )}
    </Box>
  );
};

export default FetchPortal;
