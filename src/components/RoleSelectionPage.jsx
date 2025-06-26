import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelectionPage = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/login?role=${role}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-white to-blue-300">
      <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Who are you logging in as today?</h2>
        <p className="text-center mb-6">Choose your role to continue</p>

        <button
          onClick={() => handleRoleSelect('Student')}
          className="w-full bg-gradient-to-r from-blue-300 to-blue-900 py-2 rounded-lg mb-4 font-semibold hover:opacity-90"
        >
          Student
        </button>

        <button
          onClick={() => handleRoleSelect('Teacher')}
          className="w-full bg-gradient-to-r from-green-300 to-green-700 py-2 rounded-lg font-semibold hover:opacity-90"
        >
          Teacher
        </button>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
