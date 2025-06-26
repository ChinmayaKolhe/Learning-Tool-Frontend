import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { 
  fetchInitialData,
  getClassStats
} from "../services/api";
import { useNavigate } from "react-router-dom";

const SubmissionStatus = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    department: "",
    year: "",
    division: "",
    subject: "",
    paper: "",
  });
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [divisions, setDivisions] = useState(["A", "B", "C", "D", "E", "F"]);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
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
    const loadSubjects = async () => {
      if (filters.department && filters.year) {
        try {
          // Using getClassStats to fetch subjects for the selected department and year
          const { data } = await getClassStats({
            department: filters.department,
            year: filters.year
          });
          setSubjects(data.subjects || []);
        } catch (error) {
          console.error("Failed to load subjects:", error);
        }
      }
    };

    loadSubjects();
  }, [filters.department, filters.year]);

  useEffect(() => {
    const loadSubmissions = async () => {
      if (
        filters.department &&
        filters.year &&
        filters.division &&
        filters.subject &&
        filters.paper
      ) {
        try {
          setLoading(true);
          // Using getClassStats to fetch submission data
          const { data } = await getClassStats(filters);
          setSubmissions(data.submissions || []);
        } catch (error) {
          console.error("Failed to load submissions:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadSubmissions();
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const allSelected = Object.values(filters).every((val) => val !== "");

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
      <div className="flex-1 p-8 overflow-y-auto bg-blue-100">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">📋 Check Student Submissions</h2>
        </div>

        <form className="bg-white shadow-xl rounded-2xl p-6 max-w-3xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Department */}
            <select
              name="department"
              value={filters.department}
              onChange={handleChange}
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              disabled={loading}
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
              value={filters.year}
              onChange={handleChange}
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              disabled={loading}
            >
              <option value="">Select Year</option>
              <option value="FE">First Year (FE)</option>
              <option value="SE">Second Year (SE)</option>
              <option value="TE">Third Year (TE)</option>
              <option value="BE">Final Year (BE)</option>
            </select>

            {/* Division */}
            <select
              name="division"
              value={filters.division}
              onChange={handleChange}
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              disabled={loading}
            >
              <option value="">Select Division</option>
              {divisions.map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>

            {/* Subject */}
            <select
              name="subject"
              value={filters.subject}
              onChange={handleChange}
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              disabled={loading || !filters.department || !filters.year}
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>

            {/* Paper */}
            <select
              name="paper"
              value={filters.paper}
              onChange={handleChange}
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              disabled={loading}
            >
              <option value="">Select Paper</option>
              <option value="FA1">FA1</option>
              <option value="FA2">FA2</option>
              <option value="SA">SA</option>
            </select>
          </div>
        </form>

        {loading && (
          <div className="mt-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2">Loading data...</p>
          </div>
        )}

        {allSelected && !loading && submissions.length > 0 && (
          <div className="bg-white shadow-xl rounded-2xl mt-8 max-w-4xl mx-auto p-6">
            <h3 className="text-xl font-bold mb-4">Submission Summary</h3>
            <table className="w-full text-left border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2">PRN</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((student, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">{student.prn}</td>
                    <td className="p-2">{student.name}</td>
                    <td className="p-2">
                      {student.submitted ? "✅ Yes" : "❌ No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {allSelected && !loading && submissions.length === 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">No submissions found for the selected criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionStatus;