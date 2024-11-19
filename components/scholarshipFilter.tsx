import React from "react";

const ScholarshipFilter = () => {
  return (
    <div className="w-full md:w-1/4 p-4 border-gray-300">
      <h2 className="text-2xl text-black border-b font-bold mb-6">Filter by</h2>
      <ul className="space-y-4 text-lg">
        <li className="cursor-pointer hover:text-blue-600 text-black border-b border-gray-300 pb-2">
          All
        </li>
        <li className="cursor-pointer hover:text-blue-600 text-black border-gray-300 pb-2">
          Active
        </li>
        <li className="cursor-pointer hover:text-blue-600 text-black border-b border-gray-300 pb-2">
          Inactive
        </li>
        <li className="cursor-pointer hover:text-blue-600 text-black border-gray-300 pt-4 pb-2">
          Academic
        </li>
        <li className="cursor-pointer hover:text-blue-600 text-black border-gray-300 pb-2">
          Non Academic
        </li>
        <li className="cursor-pointer hover:text-blue-600 text-black border-b border-gray-300 pb-2">
          Bursary
        </li>
      </ul>
    </div>
  );
};

export default ScholarshipFilter;
