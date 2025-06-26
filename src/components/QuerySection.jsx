import React from "react";

const QuerySection = () => {
  return (
    <div className="bg-white shadow-md p-6 rounded-2xl h-100 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-2">Queries / Notifications</h2>
      <ul className="space-y-2">
        <li className="bg-gray-100 p-2 rounded">Student A: When is FA due?</li>
        <li className="bg-gray-100 p-2 rounded">Reminder: Upload marks by Friday</li>
      </ul>
    </div>
  );
};

export default QuerySection;
