import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="bg-blue-200 text-black flex justify-between items-center px-4 py-2">
      <div className="flex items-center gap-3">
        <img src={logo} alt="College Logo" className="w-20 h-20 object-contain" />
        <h1 className="text-xl font-bold">Pimpri Chinchwad College of Engineering</h1>
      </div>
      <div className="flex items-center space-x-4">
        <ul className="flex gap-6 font-bold">
          <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
        </ul>
        
      </div>
    </nav>
  );
};

export default Navbar;
