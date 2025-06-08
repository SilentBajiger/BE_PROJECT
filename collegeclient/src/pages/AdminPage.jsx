import React, { useState } from 'react'
import Login from './components/Login'
import AdminDashBoard from './components/AdminDashBoard';

const AdminPage = () => {

    const [user,setUser] = useState({userId:'',password:''});
    const [loggedIn,setLoggedIn] = useState(false);
  return (
    <div>
        {
            loggedIn ?
            <div>
                <AdminDashBoard/>
            </div>
            :
            <div>
                <Login user={user} setUser={setUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

            </div>
        }
    </div>
  )
}

export default AdminPage