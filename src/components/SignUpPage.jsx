import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    prn: "",
    department: "",
    division: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://pccoe-learningtool-registration-login.onrender.com/api/student/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Registered successfully!");
        navigate("/login?role=Student"); // Redirect to login page with role
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("❌ Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-blue-300 px-4">
      <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-2 text-center">Student Registration</h2>
        <p className="text-blue-400 text-center mb-6">Create your account</p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
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
            type="text"
            name="prn"
            placeholder="PRN"
            value={formData.prn}
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
            type="text"
            name="division"
            placeholder="Division"
            value={formData.division}
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
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-800 placeholder-gray-500"
          />
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-blue-300 to-blue-900 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login?role=Student")}
            className="text-blue-400 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
