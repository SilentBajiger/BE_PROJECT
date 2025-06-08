import React from 'react'
import { Link } from 'react-router'

const Home = () => {
  return (
    <div style={{display:'flex',height:'100vh' ,width:'100vw' , alignItems:'center',justifyContent:'center'}}>

        <h1>
        <Link to={'/admission'}> Admission Form</Link>
        <br />
        <Link to={'/admin'}>AdminPage</Link>
        <br />
        <Link to={'/'}>Home</Link>
        </h1>
    </div>
  )
}

export default Home