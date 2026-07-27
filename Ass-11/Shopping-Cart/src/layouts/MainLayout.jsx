import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
