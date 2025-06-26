import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Teacher Panel</h1>
      <nav className="space-y-4">
        <div className="flex items-center space-x-2">
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div className="flex items-center space-x-2">
          <Link to="/marks-upload">Marks Upload</Link>
        </div>
        <div className="flex items-center space-x-2">
          <Link to="/queries">Queries</Link>
        </div>
        <div className="flex items-center space-x-2">
          <Link to="/fa-mode">FA Mode</Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
