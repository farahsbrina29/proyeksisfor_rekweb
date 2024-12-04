"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/layout/heroSection";
import Footer from "@/components/layout/footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "@/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import FilterSection from "@/components/home/FilterSection";
import ScholarshipCard from "@/components/home/ScholarshipCard";
import HomeSkeletonLoader from "@/components/Loader/homeLoader";
import { getScholarshipStatus, formatCustomDate } from "@/utility/scholarshipdatautility";

export default function Home() {
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [isActiveDropdownOpen, setIsActiveDropdownOpen] = useState(true);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(true);
  const [selectedActiveFilters, setSelectedActiveFilters] = useState<string[]>([]);
  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Ambil data beasiswa dari Firestore
  useEffect(() => {
    const fetchScholarships = async () => {
      setIsLoading(true);
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
        setIsLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  // Simulasikan status login pengguna
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsLoggedIn(!!currentUser);
    });
    return () => unsubscribe();
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

  // Reset Filters
  const resetFilters = () => {
    setSelectedActiveFilters([]);
    setSelectedCategoryFilters([]);
  };

  // Fungsi untuk memfilter daftar beasiswa
  const filteredScholarships = scholarships.filter((scholarship) => {
    const status = getScholarshipStatus(
      scholarship.tanggal_mulai,
      scholarship.tanggal_akhir
    );

    const isActiveMatch =
      selectedActiveFilters.length === 0 ||
      (selectedActiveFilters.includes("Masih Berlangsung") && status === "Active") ||
      (selectedActiveFilters.includes("Akan Berakhir") && status === "Inactive");

    const isCategoryMatch =
      selectedCategoryFilters.length === 0 ||
      selectedCategoryFilters.includes(scholarship.kategori);

    return isActiveMatch && isCategoryMatch;
  });

  // Fungsi untuk handle klik pada card
  const handleCardClick = (id: string) => {
    if (isLoggedIn) {
      window.location.href = `/scholars/${id}`;
    } else {
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
      {isLoading ? (
        <HomeSkeletonLoader />
      ) : (
        <div className="bg-white py-16 px-16 mt-10">
          <h1 className="text-4xl font-bold text-blue-900 mb-12">Found Scholar</h1>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filter Section */}
            <FilterSection
              isActiveDropdownOpen={isActiveDropdownOpen}
              setIsActiveDropdownOpen={setIsActiveDropdownOpen}
              isCategoryDropdownOpen={isCategoryDropdownOpen}
              setIsCategoryDropdownOpen={setIsCategoryDropdownOpen}
              selectedActiveFilters={selectedActiveFilters}
              selectedCategoryFilters={selectedCategoryFilters}
              handleFilterChange={handleFilterChange}
              resetFilters={resetFilters}
            />

            {/* Cards Section */}
            <div className="flex-1">
              <div
                className={`grid ${
                  filteredScholarships.length === 1
                    ? "grid-cols-1"
                    : "grid-cols-1 md:grid-cols-2"
                } gap-8`}
              >
                {filteredScholarships.slice(0, 6).map((scholarship) => (
                  <ScholarshipCard
                    key={scholarship.id}
                    id={scholarship.id}
                    nama_beasiswa={scholarship.nama_beasiswa}
                    tanggal_mulai={scholarship.tanggal_mulai}
                    tanggal_akhir={scholarship.tanggal_akhir}
                    deskripsi={scholarship.deskripsi}
                    kategori={scholarship.kategori}
                    onClick={handleCardClick}
                  />
                ))}
              </div>

              {/* View More Button */}
              {!isLoading && (
                <div className="flex justify-end mt-8">
                  <button
                    className="text-blue-600 font-semibold hover:underline"
                    onClick={() => (window.location.href = "/scholars")}
                  >
                    View More &gt;
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
