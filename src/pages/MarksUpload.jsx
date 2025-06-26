import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { uploadMarks, fetchInitialData } from "../services/api";

const MarksUpload = () => {
  const [form, setForm] = useState({
    department: "",
    subject: "",
    paper: "",
    division: "",
    year: "",
    file: null,
  });
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [divisions] = useState(["A", "B", "C", "D", "E", "F"]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const { data } = await fetchInitialData();
        setDepartments(data.departments);
        setSubjects(data.subjects);
      } catch (error) {
        console.error("Failed to load initial data:", error);
      }
    };
    loadInitialData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    const formData = new FormData();
    formData.append("file", form.file);
    formData.append("subject", form.subject);
    formData.append("division", form.division);
    formData.append("department", form.department);
    formData.append("year", form.year);
    formData.append("paper", form.paper);

    try {
      const result = await uploadMarks(formData);
      if (result.success) {
        setSuccess(true);
        // Reset form after successful upload
        setForm({
          department: "",
          subject: "",
          paper: "",
          division: "",
          year: "",
          file: null,
        });
      } else {
        setError(result.message || "Failed to upload marks");
      }
    } catch (err) {
      setError(err.message || "An error occurred during upload");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto bg-blue-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            📄 Upload Student Marks
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-6 max-w-3xl mx-auto space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subject */}
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Division
              </label>
              <select
                name="division"
                value={form.division}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Division</option>
                {divisions.map((div) => (
                  <option key={div} value={div}>
                    Division {div}
                  </option>
                ))}
              </select>
            </div>

            {/* Department */}
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            {/* Year */}
            <select
              name="year"
              value={form.year}
              onChange={handleChange}
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Year</option>
              <option value="FE">First Year (FE)</option>
              <option value="SE">Second Year (SE)</option>
              <option value="TE">Third Year (TE)</option>
              <option value="BE">Final Year (BE)</option>
            </select>

            {/* Paper */}
            <select
              name="paper"
              value={form.paper}
              onChange={handleChange}
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Paper</option>
              <option value="FA1">FA1</option>
              <option value="FA2">FA2</option>
              <option value="SA">SA</option>
            </select>
          </div>

          {/* File Upload */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select File (.csv or .xlsx)
            </label>
            <label className="flex items-center justify-between w-full px-4 py-3 bg-blue-100 text-blue-900 rounded-lg border border-blue-300 cursor-pointer hover:bg-blue-200 transition">
              <span>{form.file ? form.file.name : "Choose file"}</span>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                className="hidden"
                accept=".csv,.xlsx,.xls"
                required
              />
            </label>
          </div>

          {error && (
            <div className="p-3 bg-red-100 text-red-800 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-100 text-green-800 rounded-lg">
              Marks uploaded successfully!
            </div>
          )}

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Uploading..." : "Upload Marks"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MarksUpload;
