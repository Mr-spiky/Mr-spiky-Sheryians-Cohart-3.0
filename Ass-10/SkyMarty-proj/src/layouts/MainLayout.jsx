import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#f5f3f0] dark:bg-[#111113] transition-colors duration-300">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;