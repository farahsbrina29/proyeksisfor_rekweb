"use client";

import { useEffect, useState } from "react";
import HeroSection from "../components/heroSection";
import Footer from "../components/footer";
import {
  scholarships,
  getScholarshipStatus,
  formatCustomDate,
} from "../data/scholarshipdata";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "@/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All"); // State untuk menyimpan filter aktif
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // State untuk status login pengguna

  // Simulasikan status login pengguna
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsLoggedIn(!!currentUser); // Update status login berdasarkan autentikasi Firebase
    });
    return () => unsubscribe(); // Hapus listener saat komponen dilepas
  }, []);

  // Fungsi untuk memfilter daftar beasiswa berdasarkan kategori atau status
  const filteredScholarships = scholarships.filter((scholarship) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Active") {
      return (
        getScholarshipStatus(
          scholarship.tanggal_mulai,
          scholarship.tanggal_akhir
        ) === "Active"
      );
    }
    if (selectedFilter === "Inactive") {
      return (
        getScholarshipStatus(
          scholarship.tanggal_mulai,
          scholarship.tanggal_akhir
        ) === "Inactive"
      );
    }
    return scholarship.kategori === selectedFilter;
  });

  // Fungsi untuk handle klik pada card
  const handleCardClick = (id: string) => {
    if (isLoggedIn) {
      // Jika pengguna sudah login, arahkan ke halaman detail
      window.location.href = `/scholars/${id}`;
    } else {
      // Jika belum login, tampilkan toast pemberitahuan
      toast.error("Please sign in to view the scholarship details.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div>
      <HeroSection />
      <div className="bg-white py-16 px-16 mt-10">
        <h1 className="text-4xl font-bold text-blue-900 mb-12">
          Found Scholar
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Section */}
          <div className="w-full md:w-1/4 p-4 border-gray-300">
            <h2 className="text-2xl text-black border-b font-bold mb-6">
              Filter by
            </h2>
            <ul className="space-y-4 text-lg">
              <li
                className={`cursor-pointer hover:text-blue-600 text-black border-b border-gray-300 pb-2 ${
                  selectedFilter === "All" ? "font-bold text-blue-600" : ""
                }`}
                onClick={() => setSelectedFilter("All")}
              >
                All
              </li>
              <li
                className={`cursor-pointer hover:text-blue-600 text-black border-gray-300 pb-2 ${
                  selectedFilter === "Active" ? "font-bold text-blue-600" : ""
                }`}
                onClick={() => setSelectedFilter("Active")}
              >
                Active
              </li>
              <li
                className={`cursor-pointer hover:text-blue-600 text-black border-gray-300 pb-2 ${
                  selectedFilter === "Inactive" ? "font-bold text-blue-600" : ""
                }`}
                onClick={() => setSelectedFilter("Inactive")}
              >
                Inactive
              </li>
              <li
                className={`cursor-pointer hover:text-blue-600 text-black border-gray-300 pt-4 pb-2 ${
                  selectedFilter === "Akademik" ? "font-bold text-blue-600" : ""
                }`}
                onClick={() => setSelectedFilter("Akademik")}
              >
                Akademik
              </li>
              <li
                className={`cursor-pointer hover:text-blue-600 text-black border-gray-300 pb-2 ${
                  selectedFilter === "Non Akademik"
                    ? "font-bold text-blue-600"
                    : ""
                }`}
                onClick={() => setSelectedFilter("Non Akademik")}
              >
                Non Akademik
              </li>
              <li
                className={`cursor-pointer hover:text-blue-600 text-black border-b border-gray-300 pb-2 ${
                  selectedFilter === "Bantuan" ? "font-bold text-blue-600" : ""
                }`}
                onClick={() => setSelectedFilter("Bantuan")}
              >
                Bantuan
              </li>
            </ul>
          </div>

          {/* Cards Section */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredScholarships.slice(0, 6).map((scholarship) => (
              <div
                key={scholarship.documentid}
                className="border rounded-lg p-6 shadow-md hover:shadow-lg transition cursor-pointer"
                onClick={() => handleCardClick(scholarship.documentid)} // Panggil fungsi handleCardClick saat kartu diklik
              >
                <h3 className="text-xl font-bold mb-2 text-black">
                  {scholarship.nama_beasiswa}
                </h3>
                <p className="text-black text-sm mb-4">
                  {formatCustomDate(scholarship.tanggal_mulai)} -{" "}
                  {formatCustomDate(scholarship.tanggal_akhir)}
                </p>
                <p className="text-black text-sm mb-4">
                  {scholarship.deskripsi.split(".")[0]}.
                </p>
                <div className="flex items-center space-x-2 mb-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
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
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                    {scholarship.kategori}
                  </span>
                </div>
                <button className="text-blue-600 font-semibold hover:underline">
                  See Details
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* View More */}
        <div className="flex justify-end mt-8 mb-10 pr-16">
          <button
            className="text-blue-600 font-semibold hover:underline"
            onClick={() => (window.location.href = "/scholars")}
          >
            View More &gt;
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
