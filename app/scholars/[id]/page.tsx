"use client";

import { use } from "react"; // Import React Hook
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
  const { id } = use(params); // Gunakan React.use() untuk membaca params

  const scholarship = scholarships.find((s) => s.documentid === id);

  if (!scholarship) {
    return (
      <div className="text-center text-red-600 py-16">
        <h1 className="text-3xl font-bold">Scholarship not found.</h1>
      </div>
    );
  }

  return (
    <div className="bg-white py-8 px-8 max-w-4xl mx-auto shadow-lg rounded-lg border border-gray-200">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {scholarship.nama_beasiswa}
      </h1>
      <p className="text-lg text-gray-700 mb-4">
        <strong>Tanggal:</strong> {formatCustomDate(scholarship.tanggal_mulai)}{" "}
        - {formatCustomDate(scholarship.tanggal_akhir)},
      </p>

      <div className="flex items-center space-x-2 mb-4">
        <span
          className={`px-4 py-2 rounded-full text-lg ${
            getScholarshipStatus(
              scholarship.tanggal_mulai,
              scholarship.tanggal_akhir
            ) === "Active"
              ? "bg-green-200 text-green-700"
              : "bg-red-200 text-red-700"
          }`}
        >
          {getScholarshipStatus(
            scholarship.tanggal_mulai,
            scholarship.tanggal_akhir
          )}
        </span>
        <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-lg">
          {scholarship.kategori}
        </span>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Description
        </h2>
        <p className="text-gray-700">{scholarship.deskripsi}</p>
      </div>

      {/* Requirements */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Requirements
        </h2>
        <ul className="list-disc pl-6 text-gray-700">
          {Array.isArray(scholarship.persyaratan_beasiswa) ? (
            scholarship.persyaratan_beasiswa.map((req, index) => (
              <li key={index}>{req}</li>
            ))
          ) : (
            <p>
              {scholarship.persyaratan_beasiswa ||
                "Tidak ada persyaratan tersedia."}
            </p>
          )}
        </ul>
      </div>

      {/* Contact */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Contact</h2>
        <p className="text-gray-700">{scholarship.kontak}</p>
      </div>

      {/* Register Button */}
      <button
        className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-200"
        onClick={() => alert("Registration functionality not implemented yet!")}
      >
        Register Now
      </button>
    </div>
  );
}
