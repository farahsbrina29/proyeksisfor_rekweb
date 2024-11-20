"use client";
import React from "react";
import styled from "styled-components";
import HeroSection from "../../components/heroSection";
import Footer from "../../components/footer";


const Button = styled.button`
  background-color: #D9D9D9;
  color: black;
  border: none;
  padding: 8px 16px;
  margin: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  cursor: pointer;
  border-radius: 15px;
  min-width: 180px;
  white-space: nowrap;
  transition: background-color 0.3s ease, transform 0.2s ease;


  &:hover {
    background-color: #143F6B;
    color: white;
    transform: scale(1.1);
  }


  &:active {
    background-color: #3e8e41;
  }
`;


const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-start; /* Mengatur tombol agar sedikit ke kanan */
  margin-top: 20px;
  margin-left: 50px; /* Menambahkan margin kiri untuk sedikit menjauh ke kanan */
`;


export default function Home() {
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
            <h2 className="text-2xl text-black font-bold mb-6">Filter by</h2>
            <ButtonContainer>
              <Button className="cursor-pointer hover:text-blue-600 text-black border-gray-300 pb-2">
                All
              </Button>
              <Button>Active</Button>
              <Button>Non Active</Button>
              <Button>Academic</Button>
              <Button>Non Academic</Button>
              <Button>Bursary</Button>
            </ButtonContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}


