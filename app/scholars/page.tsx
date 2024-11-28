"use client";

import React, { useState, useEffect } from "react";
import Footer from "../../components/footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "../../styles/scholarpage.css";
import {
  parseCustomDate,
  getScholarshipStatus,
  formatCustomDate,
} from "../../data/scholarshipdatautility";



export default function Home() {
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [selectedAll, setSelectedAll] = useState("All");
  const [selectedMasaAktif, setSelectedMasaAktif] = useState("");
  const [selectedJenis, setSelectedJenis] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Cek status autentikasi pengguna menggunakan Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsLoggedIn(!!currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Ambil data beasiswa dari Firestore
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const scholarshipRef = collection(db, "scholarship");
        const querySnapshot = await getDocs(scholarshipRef);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setScholarships(data);
      } catch (error) {
        console.error("Error fetching scholarships:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScholarships();
  }, []);

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

  // Function to determine if the scholarship is active
  const isActiveScholarship = (
    tanggal_mulai: string,
    tanggal_akhir: string
  ): boolean => {
    const today = new Date();
    const start = parseCustomDate(tanggal_mulai);
    const end = parseCustomDate(tanggal_akhir);
    return today >= start && today <= end;
  };

  const willEndSoonScholarship = (tanggal_akhir: string): boolean => {
    const today = new Date();
    const end = parseCustomDate(tanggal_akhir);
    return (
      end > today &&
      (end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) <= 30
    );
  };

  // Filter scholarships based on dropdown selections
  const filteredScholarships =
    scholarships.length > 0
      ? scholarships.filter((scholarship) => {
          const isAll = selectedAll === "All";
          const isMasaAktifValid =
            selectedMasaAktif === "" ||
            (selectedMasaAktif === "Sedang Berlangsung" &&
              getScholarshipStatus(
                scholarship.tanggal_mulai,
                scholarship.tanggal_akhir
              ) === "Active") ||
            (selectedMasaAktif === "Akan Berakhir" &&
              willEndSoonScholarship(scholarship.tanggal_akhir));
          const isJenisValid =
            selectedJenis === "" || scholarship.kategori === selectedJenis;

          return isAll && isMasaAktifValid && isJenisValid;
        })
      : [];

  return (
    <div className="scholar-page">
      <div className="bg-white py-16 px-6 sm:px-8 md:px-16 mt-10">
        <h1 className="text-4xl font-bold text-blue-900 mb-12">
          Found Scholar
        </h1>

        <div className="container">
          {/* Filter Section */}
          <div className="dropdown-container">
            <div className="dropdown-wrapper">
              <select
                className="styled-dropdown"
                value={selectedMasaAktif}
                onChange={(e) => setSelectedMasaAktif(e.target.value)}
              >
                <option value="">Masa Aktif</option>
                <option value="Sedang Berlangsung">Sedang Berlangsung</option>
                <option value="Akan Berakhir">Akan Berakhir</option>
              </select>
              <div className="dropdown-icon">▼</div>
            </div>

            <div className="dropdown-wrapper">
              <select
                className="styled-dropdown"
                value={selectedJenis}
                onChange={(e) => setSelectedJenis(e.target.value)}
              >
                <option value="">Jenis Beasiswa</option>
                <option value="Akademik">Akademik</option>
                <option value="Non Akademik">Non Akademik</option>
                <option value="Bantuan">Bantuan</option>
                <option value="Penelitian">Penelitian</option>
              </select>
              <div className="dropdown-icon">▼</div>
            </div>
          </div>

          {/* Cards Section */}
          {isLoading ? (
            <div className="text-center mt-10">Loading scholarships...</div>
          ) : (
            <div className="cards-container">
              {filteredScholarships.map((scholarship) => (
                <div
                  key={scholarship.id}
                  onClick={() => handleCardClick(scholarship.id)}
                >
                  <div className="card cursor-pointer">
                    <h2 className="text-xl font-bold mb-2 text-black">
                      {scholarship.nama_beasiswa}
                    </h2>
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
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
