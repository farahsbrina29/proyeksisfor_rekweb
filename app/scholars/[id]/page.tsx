"use client";

import { use } from "react"; // Import React Hook
import { useRouter } from "next/navigation"; // Import useRouter dari Next.js
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS untuk toast messages
import {
  scholarships,
  getScholarshipStatus,
  formatCustomDate,
} from "../../../data/scholarshipdata"; // Import data beasiswa

export default function ScholarDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // Use React.use() for reading params
  const router = useRouter(); // Initialize useRouter for navigation

  const scholarship = scholarships.find((s) => s.documentid === id);

  if (!scholarship) {
    return (
      <div className="text-center text-red-600 py-16">
        <h1 className="text-3xl font-bold">Scholarship not found.</h1>
      </div>
    );
  }

  const isScholarshipActive =
    getScholarshipStatus(
      scholarship.tanggal_mulai,
      scholarship.tanggal_akhir
    ) === "Active";

  const handleButtonClick = () => {
    if (!isScholarshipActive) {
      toast.error("The scholarship application is already closed.", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      // Navigate to register page with scholarship ID
      router.push(`/scholars/${id}/register`);
    }
  };

  return (
    <div className="bg-white py-8 px-8 max-w-7xl mx-auto shadow-lg rounded-lg border border-gray-200 mt-16"> {/* Added mt-16 */}
      {/* Toast Container */}
      <ToastContainer />

      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {scholarship.nama_beasiswa}
      </h1>
      <p className="text-lg text-gray-700 mb-4">
        <strong>Date:</strong> {formatCustomDate(scholarship.tanggal_mulai)}{" "}
        - {formatCustomDate(scholarship.tanggal_akhir)}.
      </p>

      <div className="flex items-center space-x-2 mb-8">
        <span
          className={`px-4 py-2 rounded-full text-lg ${
            isScholarshipActive
              ? "bg-green-200 text-green-700"
              : "bg-red-200 text-red-700"
          }`}
        >
          {getScholarshipStatus(scholarship.tanggal_mulai, scholarship.tanggal_akhir)}
        </span>
        <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-lg">
          {scholarship.kategori}
        </span>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
        <p className="text-gray-700">{scholarship.deskripsi}</p>
      </div>
      {/* Separator Line */}
      <div className="border-t border-gray-300 my-4"></div>

      {/* Requirements */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Requirements</h2>
        <ul className="list-none pl-6 text-gray-700">
          {Array.isArray(scholarship.persyaratan_beasiswa) ? (
            scholarship.persyaratan_beasiswa.map((req, index) => (
              <li key={index}>{req}</li>
            ))
          ) : (
            <p>{scholarship.persyaratan_beasiswa || "No requirements available."}</p>
          )}
        </ul>
      </div>

      {/* Separator Line */}
      <div className="border-t border-gray-300 my-4"></div>

      {/* Contact */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Contact</h2>
        <p className="text-gray-700">{scholarship.kontak}</p>
      </div>
      {/* Separator Line */}
      <div className="border-t border-gray-300 my-4"></div>

      {/* Register Button */}
      <button
        className={`w-full py-3 rounded-lg text-lg font-semibold transition duration-200 ${
          isScholarshipActive
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-400 text-gray-700 cursor-not-allowed"
        }`}
        onClick={handleButtonClick}
        disabled={!isScholarshipActive} 
      >
        {isScholarshipActive ? "Register Now" : "Closed"}
      </button>
    </div>
  );
}
