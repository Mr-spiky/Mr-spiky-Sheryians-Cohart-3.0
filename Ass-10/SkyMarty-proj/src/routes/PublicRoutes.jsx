import React, { useContext } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router'
import { Auth } from '../context/AuthContext'

const PublicRoutes = () => {
  console.log("PublicRoutes page rendering...");

    let {loggedInUser} = useContext(Auth);

    if(loggedInUser){
        return <Navigate to="/main" />
    }

  return <Outlet />
}

export default PublicRoutes;