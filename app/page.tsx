"use client";

import { useEffect, useState } from "react";
import HeroSection from "../components/heroSection";
import Footer from "../components/footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "@/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import {
  getScholarshipStatus,
  formatCustomDate,
} from "../utility/scholarshipdatautility";

export default function Home() {
  const [scholarships, setScholarships] = useState<any[]>([]); // State untuk menyimpan data beasiswa
  const [isActiveDropdownOpen, setIsActiveDropdownOpen] = useState(false); // Dropdown status aktif
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false); // Dropdown kategori
  const [selectedActiveFilters, setSelectedActiveFilters] = useState<string[]>(
    []
  ); // Filter masa aktif
  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState<
    string[]
  >([]); // Filter kategori
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // State untuk status login pengguna
  const [isLoading, setIsLoading] = useState<boolean>(true); // State untuk loading data

  // Ambil data beasiswa dari Firestore
  useEffect(() => {
    const fetchScholarships = async () => {
      setIsLoading(true); // Set loading state
      try {
        const scholarshipRef = collection(db, "scholarship");
        const snapshot = await getDocs(scholarshipRef);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setScholarships(data);
      } catch (error) {
        console.error("Error fetching scholarships:", error);
        toast.error("Failed to fetch scholarships. Please try again later.");
      } finally {
        setIsLoading(false); // Set loading state selesai
      }
    };

    fetchScholarships();
  }, []);

  // Simulasikan status login pengguna
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsLoggedIn(!!currentUser); // Update status login berdasarkan autentikasi Firebase
    });
    return () => unsubscribe(); // Hapus listener saat komponen dilepas
  }, []);

  // Fungsi untuk menangani perubahan filter
  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === "active") {
      setSelectedActiveFilters((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    } else if (filterType === "category") {
      setSelectedCategoryFilters((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    }
  };

  // Fungsi untuk memfilter daftar beasiswa berdasarkan kategori atau status
  const filteredScholarships = scholarships.filter((scholarship) => {
    const status = getScholarshipStatus(
      scholarship.tanggal_mulai,
      scholarship.tanggal_akhir
    );

    // Filter berdasarkan status aktif
    const isActiveMatch =
      selectedActiveFilters.length === 0 ||
      (selectedActiveFilters.includes("Masih Berlangsung") &&
        status === "Active") ||
      (selectedActiveFilters.includes("Akan Berakhir") &&
        status === "Inactive");

    // Filter berdasarkan kategori
    const isCategoryMatch =
      selectedCategoryFilters.length === 0 ||
      selectedCategoryFilters.includes(scholarship.kategori);

    return isActiveMatch && isCategoryMatch;
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
        <h1 className="text-4xl font-bold text-blue-900 mb-12 pl-4">
          Found Scholar
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Section */}
          <div
            className="w-full md:w-1/4 p-4 bg-white rounded-lg shadow-lg"
            style={{
              height: "auto",
              minHeight: "300px", // Tinggi minimum agar konten selalu terlihat
              maxHeight: "450px", // Tinggi maksimum sesuai desain
              overflow: "hidden", // Agar konten tidak meluas
            }}
          >
            {/* Header Filter */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl text-black font-bold">Filter</h2>
              <button
                className="text-blue-600 font-semibold hover:underline"
                onClick={() => {
                  setSelectedActiveFilters([]);
                  setSelectedCategoryFilters([]);
                }}
              >
                Reset
              </button>
            </div>

            {/* Dropdown Masa Aktif */}
            <div className="mb-4">
              <button
                className="flex justify-between items-center w-full text-left text-lg font-medium text-black border-b border-gray-300 pb-2"
                onClick={() =>
                  setIsActiveDropdownOpen(!isActiveDropdownOpen)
                }
              >
                Masa Aktif
                <span>{isActiveDropdownOpen ? "▲" : "▼"}</span>
              </button>
              {isActiveDropdownOpen && (
                <div className="mt-2 space-y-2">
                  {["Masih Berlangsung", "Akan Berakhir"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center space-x-2 text-black"
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={selectedActiveFilters.includes(option)}
                        onChange={() =>
                          handleFilterChange("active", option)
                        }
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown Jenis Beasiswa */}
            <div className="mb-4">
              <button
                className="flex justify-between items-center w-full text-left text-lg font-medium text-black border-b border-gray-300 pb-2"
                onClick={() =>
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                }
              >
                Jenis Beasiswa
                <span>{isCategoryDropdownOpen ? "▲" : "▼"}</span>
              </button>
              {isCategoryDropdownOpen && (
                <div className="mt-2 space-y-2">
                  {["Akademik", "Non Akademik", "Bantuan", "Penelitian"].map(
                    (option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-2 text-black"
                      >
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          checked={selectedCategoryFilters.includes(option)}
                          onChange={() =>
                            handleFilterChange("category", option)
                          }
                        />
                        <span>{option}</span>
                      </label>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Cards Section */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
            {isLoading ? (
              <div className="text-center col-span-2">Loading...</div>
            ) : (
              filteredScholarships.slice(0, 6).map((scholarship) => (
                <div
                  key={scholarship.id}
                  className="border rounded-lg p-6 shadow-md hover:shadow-lg transition cursor-pointer"
                  onClick={() => handleCardClick(scholarship.id)}
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
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
