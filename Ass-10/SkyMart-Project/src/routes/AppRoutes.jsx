import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import MainLayout from '../layouts/MainLayout'
import AuthLayout from '../layouts/AuthLayout'
import ProtectedRoutes from './ProtectedRoutes'




const AppRoutes = () => {

    let router = createBrowserRouter([
        {
            path: "/",
            element: <AuthLayout />,
            children:[
                {
                    path: "",
                    element: <LoginPage />,
                },
                {
                    path: "register",
                    element: <RegisterPage />,
                }
            ]
        },
        {
            path: "/",
            element: <ProtectedRoutes />,
            children:[
            {
                path: "/main",
                element: <MainLayout />
            }
            ]
            
        }
    ])




  return <RouterProvider router={router} />

}



export default AppRoutes
