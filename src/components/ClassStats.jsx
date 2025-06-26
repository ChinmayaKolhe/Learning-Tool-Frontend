import React from "react";

const ClassStats = () => {
  return (
    <div className="bg-white shadow-md p-6 rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">Overall Class Stats</h2>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-3xl font-bold text-green-600">85%</p>
          <p>Avg. Marks</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-purple-600">12</p>
          <p>Pending Queries</p>
        </div>
      </div>
    </div>
  );
};

export default ClassStats;
