"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Footer from "../../components/footer";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "@/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {
  scholarships,
  parseCustomDate,
  getScholarshipStatus,
  formatCustomDate,
} from "../data/scholarshipdata";

// Styled components
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 20px;
  margin-left: 50px;
`;

const Button = styled.button<{ $isSelected: boolean }>`
  background-color: ${(props) => (props.$isSelected ? "#143F6B" : "#D9D9D9")};
  color: ${(props) => (props.$isSelected ? "white" : "black")};
  border: none;
  padding: 8px 16px;
  margin: 5px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  border-radius: 15px;
  min-width: 180px;
  white-space: nowrap;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #143f6b;
    color: white;
    transform: scale(1.1);
  }

  &:active {
    background-color: #3e8e41;
  }
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
  width: 95%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State untuk status login pengguna

  // Cek status autentikasi pengguna menggunakan Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsLoggedIn(!!currentUser); // Update status login
    });
    return () => unsubscribe(); // Cleanup listener
  }, []);

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

  // Function to handle button click for filtering
  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
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

  // Filter scholarships based on selected filter
  const filteredScholarships =
    selectedFilter === "All"
      ? scholarships
      : selectedFilter === "Active"
      ? scholarships.filter((s) =>
          isActiveScholarship(s.tanggal_mulai, s.tanggal_akhir)
        )
      : selectedFilter === "Inactive"
      ? scholarships.filter(
          (s) => !isActiveScholarship(s.tanggal_mulai, s.tanggal_akhir)
        )
      : scholarships.filter((s) => s.kategori === selectedFilter);

  return (
    <div>
      <div className="bg-white py-16 px-6 sm:px-8 md:px-16 mt-10">
        <h1 className="text-4xl font-bold text-blue-900 mb-12">
          Found Scholar
        </h1>

        <Container>
          {/* Filter Section */}
          <ButtonContainer>
            {[
              "All",
              "Active",
              "Inactive",
              "Akademik",
              "Non Akademik",
              "Bantuan",
              "Penelitian",
            ].map((filter) => (
              <Button
                key={filter}
                $isSelected={selectedFilter === filter}
                onClick={() => handleFilterClick(filter)}
              >
                {filter}
              </Button>
            ))}
          </ButtonContainer>

          {/* Cards Section */}
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
        </Container>
      </div>
      <Footer />
    </div>
  );
}
