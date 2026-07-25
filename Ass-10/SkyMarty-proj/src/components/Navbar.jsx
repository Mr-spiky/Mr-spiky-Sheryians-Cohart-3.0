// src/components/Navbar.jsx
import React, { useContext } from "react";
import { NavLink } from "react-router";
import { Auth } from "../context/AuthContext";
import { LogOut, Package, Home, ShoppingBag, Info, ShoppingCart, Moon, Sun } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { setLoggedInUser } = useContext(Auth);
  const { totalItems } = useCart();
  const { isDark, toggleTheme } = useTheme();

  const getLinkClasses = ({ isActive }) =>
    `px-4 py-1.5 text-sm font-medium transition-colors ${
      isActive
        ? "text-[#6b8f71]"
        : "text-[#4a4642] dark:text-[#b5b0aa] hover:text-[#6b8f71]"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <nav className="w-full bg-white dark:bg-[#1c1c1e] border-b border-[#e8e5e0] dark:border-[#2c2c2e] transition-colors duration-300">
      <div className="max-w-7xl mx-auto h-14 px-6 flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-1.5">
            <Package size={18} className="text-[#6b8f71]" />
            <span className="text-lg font-medium text-[#1a1a1a] dark:text-white tracking-tight">
              SkyMart
            </span>
          </div>

          <div className="flex items-center gap-1">
            <NavLink to="/main" end className={getLinkClasses}>
              Home
            </NavLink>
            <NavLink to="/main/products" className={getLinkClasses}>
              Shop
            </NavLink>
            <NavLink to="/main/about" className={getLinkClasses}>
              About
            </NavLink>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Cart Link with Badge */}
          <NavLink 
            to="/main/cart" 
            className={({ isActive }) =>
              `relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#6b8f71] text-white"
                  : "text-[#4a4642] dark:text-[#b5b0aa] hover:bg-[#f0f3ee] dark:hover:bg-[#2c2c2e]"
              }`
            }
          >
            <ShoppingCart size={18} />
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#c45a5a] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </NavLink>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-[#4a4642] dark:text-[#b5b0aa] hover:bg-[#f0f3ee] dark:hover:bg-[#2c2c2e] transition-colors"
          >
            {isDark ? <Sun size={18} className="text-[#f5a623]" /> : <Moon size={18} />}
          </button>

          <button
            onClick={handleLogout}
            className="text-sm text-[#c45a5a] hover:text-[#a84a4a] font-medium transition-colors flex items-center gap-1.5"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;