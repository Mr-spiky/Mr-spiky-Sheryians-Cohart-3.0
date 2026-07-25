import React, { useContext } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router'
import { Auth } from '../context/AuthContext'

const ProtectedRoutes = () => {
  console.log("ProtectedRoutes page rendering...");

    let {loggedInUser} = useContext(Auth);

    if(!loggedInUser){
        return <Navigate to="/" />
    }

  return <Outlet />
}

export default ProtectedRoutes;