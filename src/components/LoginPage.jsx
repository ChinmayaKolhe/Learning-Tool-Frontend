import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const role = params.get('role') || 'Student';
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: role
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignupRedirect = () => {
    if (role === 'Teacher') {
      navigate('/signup/teacher');
    } else {
      navigate('/signup/student');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'https://pccoe-learningtool-registration-login.onrender.com/api/login', 
        formData
      );
      
      if (response.data.success) {
        // Store user data without password
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // UI remains exactly the same as before
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-white to-blue-300">
      <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-2 text-center capitalize">{role} Login</h2>
        <p className="text-center mb-6">Welcome Back!</p>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-gray-800 placeholder-gray-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-gray-800 placeholder-gray-500"
              required
            />
          </div>

          <input type="hidden" name="role" value={formData.role} />

          <div className="text-right mb-4">
            <a href="/forgot-password" className="text-blue-400 hover:underline text-sm">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-300 to-blue-900 py-2 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <button onClick={handleSignupRedirect} className="text-blue-400 hover:underline">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;