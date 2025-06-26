import React, { useState } from "react";

const MarksUploader = () => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      // TODO: upload or process file
      console.log("Selected file:", file);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Upload Student Marks</h2>
      <label className="block mb-2 text-gray-700 font-medium">
        Select File (.csv or .xlsx)
      </label>
      <input
        type="file"
        accept=".csv, .xlsx"
        onChange={handleFileChange}
        className="w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-100 file:text-blue-700
                   hover:file:bg-blue-200"
      />
      {fileName && <p className="mt-2 text-green-600">Selected: {fileName}</p>}
    </div>
  );
};

export default MarksUploader;
