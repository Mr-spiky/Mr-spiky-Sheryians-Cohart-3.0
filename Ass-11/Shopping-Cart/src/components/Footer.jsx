import React from "react";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="border-t border-gray-800 mt-16 py-8 text-center">
            <Link to="/">
                <img src="/logo.png" alt="ShopNow" className="h-16 w-auto object-contain mx-auto mb-3" />
            </Link>
            <p className="text-gray-600 text-xs">
                © 2025 ShopNow · Built with React + Redux Toolkit · FakeStore API
            </p>
        </footer>
    );
};

export default Footer;
