import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { setFAMode, getFAModeStatus, fetchInitialData } from "../services/api";

const FAMode = () => {
  const [form, setForm] = useState({
    department: "",
    subject: "",
    division: "",
    year: "",
    mode: "",
  });
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [faModes, setFAModes] = useState([]);
  const [divisions] = useState(['A', 'B', 'C', 'D', 'E', 'F']); // Added divisions array
  const [currentMode, setCurrentMode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const { data } = await fetchInitialData();
        setDepartments(data.departments);
        setSubjects(data.subjects);
        setFAModes(data.faModes);
      } catch (error) {
        console.error("Failed to load initial data:", error);
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    const checkCurrentMode = async () => {
      if (form.subject && form.division && form.department && form.year) {
        try {
          const { data } = await getFAModeStatus({
            subject: form.subject,
            division: form.division,
            department: form.department,
            year: form.year
          });
          setCurrentMode(data?.mode || null);
        } catch (error) {
          console.error("Failed to check current FA mode:", error);
        }
      }
    };
    checkCurrentMode();
  }, [form.subject, form.division, form.department, form.year]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      await setFAMode(form);
      setSuccess(true);
      setCurrentMode(form.mode);
    } catch (error) {
      console.error("Failed to set FA mode:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto bg-blue-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">🎯 Set FA Mode</h2>
          {currentMode && (
            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg inline-block">
              Current FA Mode: <strong>{currentMode}</strong>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-6 max-w-3xl mx-auto space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            {/* Division - Updated to dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Division</label>
              <select
                name="division"
                value={form.division}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Division</option>
                {divisions.map((div) => (
                  <option key={div} value={div}>Division {div}</option>
                ))}
              </select>
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <select
                name="year"
                value={form.year}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Year</option>
                <option value="FE">First Year (FE)</option>
                <option value="SE">Second Year (SE)</option>
                <option value="TE">Third Year (TE)</option>
                <option value="BE">Final Year (BE)</option>
              </select>
            </div>
            
            {/* FA Mode Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">FA Mode</label>
              <select
                name="mode"
                value={form.mode}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select FA Mode</option>
                {faModes.map((mode) => (
                  <option key={mode} value={mode}>{mode}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Setting...' : 'Set FA Mode'}
            </button>
          </div>

          {success && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-center">
              FA Mode set successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FAMode;