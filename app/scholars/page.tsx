"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Footer from "../../components/footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  parseCustomDate,
  getScholarshipStatus,
  formatCustomDate,
} from "../../data/scholarshipdatautility";

// Styled components
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const DropdownContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-left: 50px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column; /* Menumpuk dropdown di layar kecil */
    gap: 10px;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  width: 250px; /* Sesuaikan ukuran dropdown */
  display: flex;
  align-items: center;
`;

const StyledDropdown = styled.select`
  appearance: none; /* Menghilangkan default dropdown browser */
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    border-color: #0d6efd; /* Warna biru pada hover */
  }

  &:focus {
    outline: none;
    border-color: #0d6efd; /* Warna biru pada fokus */
    box-shadow: 0 0 8px rgba(13, 110, 253, 0.4); /* Glow biru */
  }
`;

const DropdownIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none; /* Ikon tidak mengganggu klik */
  font-size: 20px;
  color: #aaa;
`;

const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
  margin-left: 50px;
`;

const Card = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  max-width: 2000px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

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
    const daysLeft = (end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    // Tampilkan hanya beasiswa yang akan berakhir dalam waktu 3 hari ke depan
    return daysLeft > 0 && daysLeft <= 3;
  };

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
    <div>
      <div className="bg-white py-16 px-6 sm:px-8 md:px-16 mt-10">
        <h1 className="text-4xl font-bold text-blue-900 mb-12">
          Found Scholar
        </h1>

        <Container>
          {/* Filter Section */}
          <DropdownContainer>
            <DropdownWrapper>
              <StyledDropdown
                value={selectedMasaAktif}
                onChange={(e) => setSelectedMasaAktif(e.target.value)}
              >
                <option value="">Masa Aktif</option>
                <option value="Sedang Berlangsung">Sedang Berlangsung</option>
                <option value="Akan Berakhir">Akan Berakhir</option>
              </StyledDropdown>
              <DropdownIcon>▼</DropdownIcon> {/* Tambahkan ikon panah */}
            </DropdownWrapper>

            <DropdownWrapper>
              <StyledDropdown
                value={selectedJenis}
                onChange={(e) => setSelectedJenis(e.target.value)}
              >
                <option value="">Jenis Beasiswa</option>
                <option value="Akademik">Akademik</option>
                <option value="Non Akademik">Non Akademik</option>
                <option value="Bantuan">Bantuan</option>
                <option value="Penelitian">Penelitian</option>
              </StyledDropdown>
              <DropdownIcon>▼</DropdownIcon> {/* Tambahkan ikon panah */}
            </DropdownWrapper>
          </DropdownContainer>

          {/* Cards Section */}
          {isLoading ? (
            <div className="text-center mt-10">Loading scholarships...</div>
          ) : (
            <CardsContainer>
              {filteredScholarships.map((scholarship) => (
                <div
                  key={scholarship.id}
                  onClick={() => handleCardClick(scholarship.id)}
                >
                  <Card className="cursor-pointer">
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
                  </Card>
                </div>
              ))}
            </CardsContainer>
          )}
        </Container>
      </div>
      <Footer />
    </div>
  );
}
