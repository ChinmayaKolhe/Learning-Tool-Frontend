import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherSignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://pccoe-learningtool-registration-login.onrender.com/api/teacher/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("✅ Teacher registered successfully!");
        navigate("/login?role=Teacher");
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-blue-300 px-4">
      <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
        <h2 className="text-3xl font-bold mb-2 text-center">Teacher Registration</h2>
        <p className="text-blue-400 text-center mb-6">Create your account</p>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-800 placeholder-gray-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-800 placeholder-gray-500"
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-800 placeholder-gray-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-800 placeholder-gray-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-blue-300 to-blue-900 py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login?role=teacher" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default TeacherSignUpPage;