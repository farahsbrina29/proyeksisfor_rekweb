import React from "react";

const ScholarshipCard = () => {
  return (
    <div className="border rounded-lg p-6 shadow-md hover:shadow-lg transition">
      <h3 className="text-xl font-bold mb-2 text-black">
        Telkom University S1 Scholarship
      </h3>
      <p className="text-black text-sm mb-4">20 November 2024 - 12 Desember 2024</p>
      <div className="flex items-center space-x-2 mb-4">
        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
          Active
        </span>
        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
          Academic
        </span>
      </div>
      <button className="text-blue-600 font-semibold hover:underline">
        See Details
      </button>
    </div>
  );
};

export default ScholarshipCard;
