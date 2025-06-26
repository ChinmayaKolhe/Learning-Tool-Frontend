import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import QuerySection from "../components/QuerySection";
import { fetchInitialData, getClassStats } from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    department: "",
    subject: "",
    division: "",
    year: "",
  });
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        setUser(userData);
      }
      setAuthChecked(true);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (authChecked && !user) {
      navigate("/");
    }
  }, [authChecked, user, navigate]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const { data } = await fetchInitialData();
        setDepartments(data.departments || []);
        setSubjects(data.subjects || []);
        setInitialLoad(false);
      } catch (error) {
        console.error("Failed to load initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadInitialData();
    }
  }, [user]);

  useEffect(() => {
    const loadStats = async () => {
      if (
        filters.department &&
        filters.subject &&
        filters.division &&
        filters.year
      ) {
        setLoading(true);
        try {
          const { data } = await getClassStats(filters);
          setStats(data);
        } catch (error) {
          console.error("Failed to load class stats:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadStats();
  }, [filters]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const allSelected =
    filters.department && filters.subject && filters.division && filters.year;

  if (!authChecked) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto p-6 space-y-6 bg-blue-100">
        {/* User Info and Logout Button */}
        <div className="flex justify-between items-center bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500 capitalize">{user.role.toLowerCase()}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        {/* Filter Form */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">Select Class Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <select
                value={filters.subject}
                onChange={(e) =>
                  setFilters({ ...filters, subject: e.target.value })
                }
                className="w-full p-3 border rounded-lg bg-gray-100"
                disabled={loading}
              >
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Division */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Division
              </label>
              <select
                value={filters.division}
                onChange={(e) =>
                  setFilters({ ...filters, division: e.target.value })
                }
                className="w-full p-3 border rounded-lg bg-gray-100"
                disabled={loading}
              >
                <option value="">Select Division</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
              </select>
            </div>
            
            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                value={filters.department}
                onChange={(e) =>
                  setFilters({ ...filters, department: e.target.value })
                }
                className="w-full p-3 border rounded-lg bg-gray-100"
                disabled={loading}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <select
                value={filters.year}
                onChange={(e) =>
                  setFilters({ ...filters, year: e.target.value })
                }
                className="w-full p-3 border rounded-lg bg-gray-100"
                disabled={loading}
              >
                <option value="">Select Year</option>
                <option value="FE">First Year (FE)</option>
                <option value="SE">Second Year (SE)</option>
                <option value="TE">Third Year (TE)</option>
                <option value="BE">Final Year (BE)</option>
              </select>
            </div>
          </div>

          {initialLoad ? (
            <p className="text-center text-gray-500 mt-4">
              Loading initial data...
            </p>
          ) : (
            !allSelected && (
              <p className="text-center text-gray-500 mt-4">
                Please select subject, division, department and year to view
                class stats.
              </p>
            )
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2">Loading statistics...</p>
          </div>
        )}

        {/* Class Stats */}
        {allSelected && stats && !loading && (
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">📊 Overall Class Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-100 rounded-lg p-4 text-center shadow-sm">
                <p className="text-2xl font-bold text-green-600">
                  {stats.avgMarks}%
                </p>
                <p className="text-gray-700 mt-1">Avg. Marks</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 text-center shadow-sm">
                <p className="text-2xl font-bold text-purple-600">
                  {stats.pendingQueries}
                </p>
                <p className="text-gray-700 mt-1">Pending Queries</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 text-center shadow-sm">
                <p className="text-2xl font-bold text-blue-600">
                  {stats.totalStudents}
                </p>
                <p className="text-gray-700 mt-1">Total Students</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 text-center shadow-sm">
                <p className="text-2xl font-bold text-indigo-600">
                  {stats.submissionsReceived}
                </p>
                <p className="text-gray-700 mt-1">Submissions Received</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 text-center shadow-sm">
                <p className="text-2xl font-bold text-teal-600">
                  {stats.faModeSet ? "✅ Yes" : "❌ No"}
                </p>
                <p className="text-gray-700 mt-1">FA Mode Set</p>
              </div>
            </div>
          </div>
        )}

        {/* Query Section */}
        <div className="bg-white rounded-2xl p-6 shadow-md min-h-[400px]">
          <QuerySection />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;