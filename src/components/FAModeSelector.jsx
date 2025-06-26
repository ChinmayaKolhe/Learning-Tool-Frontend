import React from "react";

const FAModeSelector = () => {
  return (
    <div className="bg-white shadow-md p-6 rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">Choose FA Mode</h2>
      <div className="grid grid-cols-2 gap-4">
        {["Quiz", "Presentation", "Assignment", "Viva"].map((mode) => (
          <button
            key={mode}
            className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium py-2 rounded-xl"
          >
            {mode}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FAModeSelector;
