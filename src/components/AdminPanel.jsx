import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { addSubjects, addDepartments } from "../services/api";

const AdminPanel = () => {
  const [newSubjects, setNewSubjects] = useState("");
  const [newDepartments, setNewDepartments] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({
    subjects: false,
    departments: false,
  });
  const [error, setError] = useState(null);

  const handleAddSubjects = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const subjectsArray = newSubjects
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s);

      if (subjectsArray.length === 0) {
        throw new Error("Please enter at least one subject");
      }

      const response = await addSubjects(subjectsArray);

      if (response.success) {
        setSuccess({ ...success, subjects: true });
        setNewSubjects("");
        setTimeout(() => setSuccess({ ...success, subjects: false }), 3000);
      } else {
        setError(response.message || "Failed to add subjects");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleAddDepartments = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const departmentsArray = newDepartments
        .split(",")
        .map((d) => d.trim())
        .filter((d) => d);

      if (departmentsArray.length === 0) {
        throw new Error("Please enter at least one department");
      }

      const response = await addDepartments(departmentsArray);

      if (response.success) {
        setSuccess({ ...success, departments: true });
        setNewDepartments("");
        setTimeout(() => setSuccess({ ...success, departments: false }), 3000);
      } else {
        setError(response.message || "Failed to add departments");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto bg-blue-100">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
          {/* Add Subjects Form */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Subjects</h2>
            <form onSubmit={handleAddSubjects} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter subjects (comma separated)
                </label>
                <textarea
                  value={newSubjects}
                  onChange={(e) => setNewSubjects(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  rows="3"
                  placeholder="DBMS, Data Structures, Operating Systems"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Example: "DBMS, Data Structures, Operating Systems"
                </p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Subjects"}
              </button>
              {success.subjects && (
                <p className="text-green-600">Subjects added successfully!</p>
              )}
            </form>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Available Divisions</h2>
            <div className="grid grid-cols-6 gap-2">
              {["A", "B", "C", "D", "E", "F"].map((div) => (
                <div key={div} className="bg-blue-100 p-2 rounded text-center">
                  {div}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              System supports divisions A through F
            </p>
          </div>
          {/* Add Departments Form */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Departments</h2>
            <form onSubmit={handleAddDepartments} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter departments (comma separated)
                </label>
                <textarea
                  value={newDepartments}
                  onChange={(e) => setNewDepartments(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  rows="3"
                  placeholder="Computer Engineering, IT, Mechanical"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Example: "Computer Engineering, IT, Mechanical"
                </p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Departments"}
              </button>
              {success.departments && (
                <p className="text-green-600">
                  Departments added successfully!
                </p>
              )}
            </form>
          </div>
          {error && (
            <div className="p-3 bg-red-100 text-red-800 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
