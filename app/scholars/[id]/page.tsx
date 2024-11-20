"use client";

import { use } from "react"; // Import use dari React
import { scholarships } from "../../data/scholarshipdata"; // Import data beasiswa

export default function ScholarDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // Gunakan React.use() untuk membaca params

  const scholarship = scholarships.find((s) => s.id === id);

  if (!scholarship) {
    return <p>Scholarship not found.</p>;
  }

  return (
    <div className="bg-white py-16 px-16">
      <h1 className="text-4xl font-bold text-blue-900 mb-8">
        {scholarship.nama_beasiswa}
      </h1>
      <p className="text-lg mb-4">
        <strong>Deskripsi:</strong> {scholarship.deskripsi}
      </p>
      <p className="text-lg mb-4">
        <strong>Persyaratan:</strong> {scholarship.persyaratan_beasiswa}
      </p>
      <p className="text-lg mb-4">
        <strong>Kategori:</strong> {scholarship.kategori}
      </p>
      <p className="text-lg mb-4">
        <strong>Tanggal Mulai:</strong> {scholarship.tanggal_mulai}
      </p>
      <p className="text-lg mb-4">
        <strong>Tanggal Akhir:</strong> {scholarship.tanggal_akhir}
      </p>
      <p className="text-lg mb-4">
        <strong>Kontak:</strong> {scholarship.kontak}
      </p>
      <button
        className="mt-6 text-blue-600 hover:underline"
        onClick={() => window.history.back()}
      >
        Back to List
      </button>
    </div>
  );
}
