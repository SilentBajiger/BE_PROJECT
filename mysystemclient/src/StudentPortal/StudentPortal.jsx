import React from 'react'
import StudentNavbar from './StudentNavbar';
import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp';
import StudentPage from './pages/StudentPage'
const StudentPortal = () => {
  return (
    <div>
      
      
   
      <StudentNavbar/>
      {/* <BrowserRouter> */}
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'90vh'}}>

      <Routes>
        <Route path={'/'}  element={<Login/>}  />
        <Route path={'/login'}  element={<Login/>}  />
        <Route path={'/signup'}  element={<SignUp/>} />
        <Route path={'/student-page'}  element={<StudentPage/>} />
      </Routes>
      </div>
      
      </div>
  )
}

export default StudentPortal;