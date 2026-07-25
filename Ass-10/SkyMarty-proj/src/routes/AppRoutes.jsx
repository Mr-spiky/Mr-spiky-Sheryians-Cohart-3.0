import React from 'react'
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router';
import AuthLayout from '../layouts/AuthLayout';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';
import Products from '../pages/Products';
import About from '../pages/About';
import Home from '../pages/Home';
import Cart from '../components/Cart';
const AppRoutes = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoutes />,
      children: [
        {
          path: "/",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <LoginPage />
            },
            {
              path: "register",
              element: <RegisterPage />
            }
          ]
        }]
    },
    {
      path: "/main",
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/main",
          element: <MainLayout />,
          children: [
            {
              path: "",
              element: <Home />
            },
            {
              path: "products",
              element: <Products />
            },
            {
              path: "cart",
              element: <Cart />
            },
            {
              path: "about",
              element: <About />
            }
          ]
        }
      ]

    }

  ])
  return <RouterProvider router={router} />
}

export default AppRoutes;
