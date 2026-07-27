import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Profile from "../pages/Profile";

const AppRoutes = () => {
    let router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            children: [
                { path: "", element: <Home /> },
                { path: "product/:id", element: <ProductDetail /> },
                { path: "cart", element: <Cart /> },
                { path: "about", element: <About /> },
                { path: "contact", element: <Contact /> },
                { path: "profile", element: <Profile /> },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default AppRoutes;
