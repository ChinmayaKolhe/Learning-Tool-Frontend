import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { respondToQuery, getQueries, fetchInitialData } from "../services/api";

const Queries = () => {
  const [form, setForm] = useState({
    department: "",
    subject: "",
    division: "",
    year: "",
    paper: "",
    query: "",
  });
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const { data } = await fetchInitialData();
        setDepartments(data.departments);
        setSubjects(data.subjects);
        loadQueries();
      } catch (error) {
        console.error("Failed to load initial data:", error);
      }
    };
    loadInitialData();
  }, []);

  const loadQueries = async () => {
    try {
      const { data } = await getQueries();
      setQueries(data.queries);
    } catch (error) {
      console.error("Failed to load queries:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      await respondToQuery(form.queryId, form.query);
      setSuccess(true);
      setForm({
        ...form,
        query: ""
      });
      loadQueries();
    } catch (error) {
      console.error("Failed to respond to query:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto bg-blue-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">📩 Submit Student Query Response</h2>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Query List */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Pending Queries</h3>
            {queries.length === 0 ? (
              <p className="text-gray-500">No pending queries</p>
            ) : (
              <div className="space-y-4">
                {queries.map((q) => (
                  <div key={q._id} className="border-b pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">
                          {q.studentName} ({q.studentId}) - {q.subject}
                        </p>
                        <p className="text-gray-600">{q.message}</p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(q.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2">
                      <textarea
                        name="query"
                        value={form.queryId === q._id ? form.query : ""}
                        onChange={(e) => {
                          setForm({
                            ...form,
                            queryId: q._id,
                            query: e.target.value
                          });
                        }}
                        placeholder="Type your response here..."
                        rows="3"
                        className="w-full p-2 border rounded"
                      />
                      <button
                        onClick={() => {
                          setForm({
                            ...form,
                            queryId: q._id,
                            subject: q.subject,
                            division: q.division,
                            department: q.department,
                            year: q.year
                          });
                        }}
                        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Respond
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Response Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-xl rounded-2xl p-6 space-y-6"
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
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>

              {/* Division */}
              <input
                type="text"
                name="division"
                value={form.division}
                onChange={handleChange}
                placeholder="Enter Division"
                className="p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

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
                  <option key={dept} value={dept}>{dept}</option>
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

            {/* Query Textarea */}
            <div>
              <textarea
                name="query"
                value={form.query}
                onChange={handleChange}
                placeholder="Type your query response here..."
                rows="5"
                className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                required
              />
            </div>

            {success && (
              <div className="p-3 bg-green-100 text-green-800 rounded-lg">
                Response submitted successfully!
              </div>
            )}

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className={`bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Submitting...' : 'Submit Query Response'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Queries;