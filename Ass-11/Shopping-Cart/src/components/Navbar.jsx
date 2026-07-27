import React from "react";
import { Link, NavLink } from "react-router";
import { useSelector } from "react-redux";

const Navbar = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const totalItems = cartItems.reduce((total, item) => total + item.qty, 0);

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact" },
    ];

    return (
        <nav className="bg-gray-900 border-b border-gray-800 px-6 py-3 sticky top-0 z-50">
            <div className="flex items-center gap-6">

                {/* Logo */}
                <Link to="/" className="flex-shrink-0">
                    <img src="/logo.png" alt="ShopNow" className="h-16 w-auto object-contain" />
                </Link>

                {/* Search Bar */}
                <div className="flex flex-1 max-w-2xl">
                    <input
                        type="text"
                        placeholder="Search products, brands, categories..."
                        className="flex-1 bg-gray-800 border border-gray-700 border-r-0 rounded-l-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                    <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-lg transition-colors flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>

                {/* Nav Links */}
                <div className="hidden lg:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                {/* Right — Account + Cart */}
                <div className="flex items-center gap-5 ml-auto flex-shrink-0">
                    <NavLink to="/profile" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                        <img src="/ProfilePic.png" alt="Profile" className="w-8 h-8 rounded-full object-cover border border-gray-700 group-hover:border-indigo-500 transition-colors" />
                        <span className="text-sm hidden sm:block font-medium">Account</span>
                    </NavLink>

                    <NavLink to="/cart" className="relative flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="text-sm hidden sm:block">Cart</span>
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 sm:hidden bg-indigo-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                        {totalItems > 0 && (
                            <span className="hidden sm:flex bg-indigo-500 text-white text-xs font-semibold rounded-full w-5 h-5 items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </NavLink>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
